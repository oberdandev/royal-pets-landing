import { useState, useRef, useCallback } from 'react';
import { Upload, Crown, Loader2, Download, RefreshCw, Dog, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface GenerationResult {
  image: string;
  text: string;
}

export function PortraitGenerator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [petName, setPetName] = useState('');
  const [petSex, setPetSex] = useState<'macho' | 'femea'>('macho');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, envie apenas arquivos de imagem (JPG, PNG)');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 10MB');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setResult(null);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, envie apenas arquivos de imagem (JPG, PNG)');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 10MB');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setResult(null);
    }
  }, []);

  const handleGenerate = async () => {
    if (!selectedFile) {
      setError('Selecione uma foto do seu cachorro');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('petName', petName || 'Seu Pet');
      formData.append('petSex', petSex);

      const response = await fetch('/api/generate-portrait', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Erro ao gerar retrato');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Erro inesperado ao gerar o retrato');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!result?.image) return;
    const link = document.createElement('a');
    link.href = result.image;
    link.download = `retrato-real-${petName || 'meu-pet'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setPetName('');
    setPetSex('macho');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="gerar-retrato" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Crie o Retrato do Seu Cachorro
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Envie uma foto e nossa IA transformará seu pet em uma verdadeira obra de arte real
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Área de Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-6 border-2 border-amber-100"
          >
            <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Envie a Foto
            </h3>

            {!selectedFile ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-amber-300 rounded-xl p-8 text-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors"
              >
                <Dog className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <p className="text-amber-800 font-medium mb-1">
                  Clique ou arraste a foto aqui
                </p>
                <p className="text-amber-600 text-sm">
                  JPG, PNG até 10MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={previewUrl!}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50"
                >
                  <RefreshCw className="w-4 h-4 text-red-500" />
                </button>
              </div>
            )}

            {selectedFile && (
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">
                    Nome do cachorro
                  </label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Ex: Thor"
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">
                    Sexo do cachorro
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setPetSex('macho')}
                      className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                        petSex === 'macho'
                          ? 'border-amber-500 bg-amber-100 text-amber-900'
                          : 'border-amber-200 text-amber-700 hover:border-amber-300'
                      }`}
                    >
                      <Crown className="w-4 h-4 inline mr-1" />
                      Macho (Rei)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPetSex('femea')}
                      className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
                        petSex === 'femea'
                          ? 'border-amber-500 bg-amber-100 text-amber-900'
                          : 'border-amber-200 text-amber-700 hover:border-amber-300'
                      }`}
                    >
                      <Crown className="w-4 h-4 inline mr-1" />
                      Fêmea (Rainha)
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full mt-4"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Criando obra de arte...
                    </>
                  ) : (
                    <>
                      <Crown className="w-5 h-5 mr-2" />
                      Gerar Retrato Real
                    </>
                  )}
                </Button>
              </div>
            )}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Área de Resultado */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-6 border-2 border-amber-100"
          >
            <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5" />
              Retrato Gerado
            </h3>

            <div className="min-h-[400px] flex items-center justify-center">
              {!result && !isGenerating && (
                <div className="text-center text-amber-400">
                  <Crown className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p className="text-amber-600">
                    O retrato aparecerá aqui
                  </p>
                </div>
              )}

              {isGenerating && (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
                  <p className="text-amber-800 font-medium">
                    A IA está pintando seu retrato...
                  </p>
                  <p className="text-amber-600 text-sm mt-1">
                    Isso pode levar até 30 segundos
                  </p>
                </div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full"
                >
                  <div className="relative">
                    <img
                      src={result.image}
                      alt="Retrato gerado"
                      className="w-full rounded-xl shadow-lg"
                    />
                    <div className="absolute top-2 right-2 bg-amber-900 text-amber-100 text-xs px-2 py-1 rounded-full">
                      Preview
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button
                      onClick={handleDownload}
                      variant="secondary"
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Baixar Imagem
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="flex-1"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Novo Retrato
                    </Button>
                  </div>

                  <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>Gostou?</strong> Faça seu pedido do quadro físico 
                      e receba essa obra de arte na sua casa!
                    </p>
                    <Button className="w-full mt-3" size="sm">
                      Quero Meu Quadro →
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
