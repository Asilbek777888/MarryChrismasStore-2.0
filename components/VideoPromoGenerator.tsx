
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface VideoPromoGeneratorProps {
  productName: string;
  onClose: () => void;
}

const VideoPromoGenerator: React.FC<VideoPromoGeneratorProps> = ({ productName, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'checking-key' | 'generating' | 'completed' | 'error'>('idle');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const messages = [
    "Santa's digital elves are setting up the studio...",
    "Capturing the festive spirit in cinematic 720p...",
    "Lighting the virtual fireplace for warmth...",
    "Applying holiday stardust to every frame...",
    "Finalizing the magic for your viewing pleasure...",
    "Almost there! Wrapping up the video..."
  ];

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (status === 'generating') {
        setLoadingMessage(messages[messageIndex % messages.length]);
        messageIndex++;
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [status]);

  const handleStartGeneration = async () => {
    setStatus('checking-key');
    try {
      // Check for API key
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
        // Proceeding as if key selection was successful as per instructions
      }

      setStatus('generating');
      setLoadingMessage(messages[0]);

      // Create AI instance right before call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `A luxury cinematic vertical product commercial for "${productName}". The scene is a cozy, high-end Christmas boutique with soft warm lighting, a decorated tree with golden ornaments in the background, and gentle snow falling outside the window. High quality, festive atmosphere, professional cinematography.`;

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '9:16'
        }
      });

      // Polling
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        try {
          operation = await ai.operations.getVideosOperation({ operation: operation });
        } catch (pollErr: any) {
          if (pollErr.message?.includes("Requested entity was not found")) {
            // @ts-ignore
            await window.aistudio.openSelectKey();
            throw new Error("API key expired or invalid. Please try again.");
          }
          throw pollErr;
        }
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setStatus('completed');
      } else {
        throw new Error("No video was generated.");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during generation.");
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={status !== 'generating' ? onClose : undefined}></div>
      
      <div className="bg-white w-full max-w-[380px] rounded-2xl overflow-hidden relative shadow-2xl border border-white/20 flex flex-col">
        {status !== 'generating' && (
          <button onClick={onClose} className="absolute top-4 right-4 z-[510] bg-black/10 hover:bg-black/20 w-8 h-8 rounded-full flex items-center justify-center text-black transition-colors">
            ✕
          </button>
        )}

        <div className="p-8">
          <div className="text-center mb-6">
            <span className="text-4xl">🎬</span>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-2 italic">Magic Promo</h2>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">AI Video Generation</p>
          </div>

          {status === 'idle' && (
            <div className="space-y-6">
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                Experience the magic! We'll use AI to create a short, festive cinematic video for <span className="font-bold text-black">"{productName}"</span>.
              </p>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-[10px] text-blue-700 font-medium">
                  Note: This feature requires a paid API key. 
                  <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline ml-1 font-bold">Billing Docs</a>
                </p>
              </div>
              <button 
                onClick={handleStartGeneration}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Generate Video</span>
                <span className="text-lg">✨</span>
              </button>
            </div>
          )}

          {status === 'generating' && (
            <div className="py-12 flex flex-col items-center">
              <div className="w-16 h-16 relative mb-8">
                <div className="absolute inset-0 border-4 border-red-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-sm font-serif italic text-gray-800 text-center px-4 min-h-[40px]">
                {loadingMessage}
              </p>
              <p className="text-[9px] text-gray-400 mt-8 uppercase tracking-tighter">Please do not close this window</p>
            </div>
          )}

          {status === 'completed' && videoUrl && (
            <div className="space-y-6">
              <div className="aspect-[9/16] w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={onClose}
                className="w-full bg-black text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all"
              >
                Close & Return
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">❄️</div>
              <p className="text-sm text-red-600 font-bold mb-6">{error}</p>
              <button 
                onClick={handleStartGeneration}
                className="w-full bg-black text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPromoGenerator;
