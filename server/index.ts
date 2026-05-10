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

const STABILITY_API_KEY = process.env.STABILITY_API_KEY || '';
const STABILITY_URL = 'https://api.stability.ai/v2beta/stable-image/generate/core';

function buildPrompt(petName: string, petSex: string): string {
  const title = petSex === 'macho' ? 'King' : 'Queen';

  return `A majestic Renaissance royal ${title} portrait of a dog. 

The dog wears elaborate royal attire: ${petSex === 'macho'
    ? 'a blood-red velvet royal cloak with white fur lining, elaborate gold shoulder pads, a masculine crown adorned with rubies and emeralds, a royal medallion on the chest'
    : 'a royal gala dress in royal blue or deep purple velvet, a high white lace collar, a feminine tiara with diamonds and pearls, a sapphire necklace, gold bracelets'}.

Richly embroidered royal clothes with gold threads. 

The dog sits majestically on an ornate golden throne. 

Background: palace chamber with heavy velvet curtains, marble columns and ornate arches, luxurious tapestry with royal coat of arms. 

Ornate baroque golden frame visible around the painting. 

Classic 17th century oil painting style, visible canvas texture, Velázquez and Rembrandt style, soft light from the left, dramatic chiaroscuro shadows, warm tones with golds, deep reds, royal blue. 

High resolution, sharp details in fur, jewels and fabric textures, professional museum finish.`;
}

app.post('/api/generate-portrait', upload.single('photo'), async (req, res) => {
  try {
    const file = req.file;
    const petName = req.body.petName || 'Seu Pet';
    const petSex = req.body.petSex || 'macho';

    if (!file) {
      return res.status(400).json({ error: 'Nenhuma foto enviada' });
    }

    if (!STABILITY_API_KEY || STABILITY_API_KEY === 'sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') {
      return res.status(500).json({
        error: 'API key da Stability AI não configurada.',
        details: 'Adicione sua STABILITY_API_KEY no arquivo .env',
      });
    }

    console.log(`[API] Gerando retrato para ${petName} (${petSex}) via Stability AI`);

    const prompt = buildPrompt(petName, petSex);

    // Monta o FormData para a Stability AI
    const formData = new FormData();
    formData.append('image', new Blob([file.buffer], { type: file.mimetype }), file.originalname || 'input.jpg');
    formData.append('prompt', prompt);
    formData.append('mode', 'image-to-image');
    formData.append('strength', '0.5');
    formData.append('output_format', 'png');
    formData.append('aspect_ratio', '1:1');

    const response = await fetch(STABILITY_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STABILITY_API_KEY}`,
        Accept: 'image/*',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API] Stability AI erro ${response.status}:`, errorText);
      return res.status(response.status).json({
        error: 'Erro na API da Stability AI',
        details: errorText,
      });
    }

    // A resposta vem como imagem binária diretamente
    const imageBuffer = Buffer.from(await response.arrayBuffer());
    const base64 = imageBuffer.toString('base64');

    console.log('[API] Retrato gerado com sucesso via Stability AI');

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
