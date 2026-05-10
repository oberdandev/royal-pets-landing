import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY || '';
const HF_API_URL = 'https://api-inference.huggingface.co/models';

// Modelos para tentar (image-to-image)
const IMAGE_TO_IMAGE_MODELS = [
  'timbrooks/instruct-pix2pix',
  'lllyasviel/sd-controlnet-canny',
  'lllyasviel/sd-controlnet-depth',
];

// Modelos para tentar (text-to-image fallback)
const TEXT_TO_IMAGE_MODELS = [
  'stabilityai/stable-diffusion-2-1',
  'prompthero/openjourney-v4',
  'CompVis/stable-diffusion-v1-4',
  'runwayml/stable-diffusion-v1-5',
];

function buildPrompt(petName: string, petSex: string): string {
  const title = petSex === 'macho' ? 'Rei' : 'Rainha';
  const article = petSex === 'macho' ? 'o' : 'a';

  return `A majestic Renaissance royal ${title} portrait of a dog.

STRICT RULES:
- Keep EXACTLY the dog's facial features: snout shape, eyes, nose, ears, markings and expression
- The fur color must be identical to the original
- The dog must be clearly recognizable as the same from the photo

ARTISTIC STYLE:
- Classic 17th century oil painting, visible canvas texture
- Style: Velázquez and Rembrandt, official court portrait
- Lighting: soft light from the left, dramatic shadows (chiaroscuro)
- Palette: warm tones, golds, deep reds, royal blue

ROYAL ATTIRE:
- ${petSex === 'macho'
    ? 'Royal cloak of blood-red velvet with white fur lining, elaborate gold shoulder pads, masculine crown adorned with rubies and emeralds, royal medallion on chest'
    : 'Royal gala dress in royal blue or deep purple velvet, high white lace collar, feminine tiara with diamonds and pearls, sapphire necklace, gold bracelets'}
- Richly embroidered royal clothes with gold threads

SCENE:
- Majestic pose sitting ${article} on ornate golden throne with ${petSex === 'macho' ? 'red' : 'purple'} velvet
- Background: palace chamber with heavy velvet curtains, marble columns and ornate arches
- In background: luxurious tapestry with royal coat of arms

FRAME:
- Ornate baroque golden frame visible around the painting
- Gold carved details with floral and heraldic motifs

QUALITY:
- High resolution for large format printing
- Sharp details in fur, jewels and fabric textures
- Professional museum finish`;
}

async function tryImageToImage(imageBuffer: Buffer, prompt: string): Promise<Buffer | null> {
  for (const model of IMAGE_TO_IMAGE_MODELS) {
    try {
      console.log(`[HF] Tentando image-to-image com ${model}...`);

      const formData = new FormData();
      const blob = new Blob([imageBuffer]);
      formData.append('image', blob);
      formData.append('prompt', prompt);

      const response = await fetch(`${HF_API_URL}/${model}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.arrayBuffer();
        console.log(`[HF] Sucesso com ${model}`);
        return Buffer.from(result);
      } else {
        const error = await response.text();
        console.log(`[HF] Falha com ${model}: ${error.substring(0, 200)}`);
      }
    } catch (e: any) {
      console.log(`[HF] Erro com ${model}: ${e.message}`);
    }
  }
  return null;
}

async function tryTextToImage(prompt: string): Promise<Buffer | null> {
  for (const model of TEXT_TO_IMAGE_MODELS) {
    try {
      console.log(`[HF] Tentando text-to-image com ${model}...`);

      const response = await fetch(`${HF_API_URL}/${model}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt }),
      });

      if (response.ok) {
        const result = await response.arrayBuffer();
        console.log(`[HF] Sucesso com ${model}`);
        return Buffer.from(result);
      } else {
        const error = await response.text();
        console.log(`[HF] Falha com ${model}: ${error.substring(0, 200)}`);
      }
    } catch (e: any) {
      console.log(`[HF] Erro com ${model}: ${e.message}`);
    }
  }
  return null;
}

app.post('/api/generate-portrait', upload.single('photo'), async (req, res) => {
  try {
    const file = req.file;
    const petName = req.body.petName || 'Seu Pet';
    const petSex = req.body.petSex || 'macho';

    if (!file) {
      return res.status(400).json({ error: 'Nenhuma foto enviada' });
    }

    console.log(`[API] Gerando retrato para ${petName} (${petSex}) via Hugging Face`);

    const prompt = buildPrompt(petName, petSex);

    // Tenta image-to-image primeiro
    let imageBuffer = await tryImageToImage(file.buffer, prompt);

    // Se falhar, tenta text-to-image
    if (!imageBuffer) {
      console.log('[API] Image-to-image falhou, tentando text-to-image...');
      imageBuffer = await tryTextToImage(prompt);
    }

    if (!imageBuffer) {
      return res.status(500).json({
        error: 'Nenhum modelo disponível no momento. Tente novamente em alguns minutos.',
        details: 'Todos os modelos do Hugging Face estão indisponíveis ou em fila.',
      });
    }

    const base64 = imageBuffer.toString('base64');

    console.log('[API] Retrato gerado com sucesso via Hugging Face');

    res.json({
      success: true,
      image: `data:image/png;base64,${base64}`,
      text: `Retrato real gerado com sucesso para ${petName}`,
    });
  } catch (error: any) {
    console.error('[API] Erro na geração:', error);
    res.status(500).json({
      error: 'Erro ao gerar retrato',
      details: error.message,
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Servir arquivos estáticos do build
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${PORT}`);
});
