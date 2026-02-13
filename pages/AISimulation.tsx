
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Video, Play, AlertCircle, HardHat, Flame, ShieldAlert, Key, Clock, Download } from 'lucide-react';

const SCENARIOS = [
  {
    id: 'ppe-compliance',
    title: 'PPE Compliance Check',
    description: '30s manufacturing plant footage with AI bounding boxes highlighting workers in helmets and safety vests.',
    prompt: 'High quality CCTV footage of a busy automobile manufacturing plant floor. Workers are operating machinery. AI bounding boxes in neon green highlight workers wearing yellow helmets and high-visibility safety vests. The text "PPE COMPLIANT" appears next to the boxes. Industrial lighting, realistic shadows, 30 seconds long, stable camera.',
    icon: <HardHat size={20} className="text-green-500" />
  },
  {
    id: 'smoke-detection',
    title: 'Fire/Smoke Alert Test',
    description: '30s warehouse footage showing thermal smoke detection with a red alert bounding box.',
    prompt: 'Security camera view of a large dark warehouse at night. Thick white smoke begins to billow from behind a stack of shipping crates. A pulsating red AI bounding box instantly surrounds the smoke source with the text "SMOKE DETECTED" flashing. High contrast, realistic smoke physics, 30 seconds long, industrial surveillance style.',
    icon: <Flame size={20} className="text-red-500" />
  }
];

const LOADING_MESSAGES = [
  "Initializing Veo 3 Simulation Engine...",
  "Rendering high-fidelity industrial environment...",
  "Synthesizing AI bounding box overlays...",
  "Analyzing temporal safety coherence...",
  "Finalizing neural video stream...",
  "Almost there, checking safety compliance..."
];

export const AISimulation: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleSelectKey = async () => {
    // @ts-ignore
    await window.aistudio.openSelectKey();
  };

  const generateVideo = async () => {
    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      setError("Please select a paid API key to use video generation.");
      return;
    }

    setIsGenerating(true);
    setGeneratedVideoUrl(null);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: selectedScenario.prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const fetchUrl = `${downloadLink}&key=${process.env.API_KEY}`;
        const response = await fetch(fetchUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setGeneratedVideoUrl(url);
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key error. Please re-select your key.");
        // @ts-ignore
        await window.aistudio.openSelectKey();
      } else {
        setError("Generation failed: " + err.message);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-white shadow-lg shadow-primary-100">
            <Sparkles size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">AI Simulation Lab</h2>
            <p className="text-slate-500 text-sm">Generate high-fidelity safety scenarios using Veo 3 for training and testing.</p>
          </div>
        </div>
        <button
          onClick={handleSelectKey}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"
        >
          <Key size={16} />
          Update API Key
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Select Simulation Scenario</h3>
            <div className="space-y-3">
              {SCENARIOS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedScenario(s)}
                  disabled={isGenerating}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${selectedScenario.id === s.id
                      ? 'border-primary bg-primary-50/50 ring-2 ring-primary/20'
                      : 'border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-300'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {s.icon}
                    <span className="font-semibold text-slate-900">{s.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={generateVideo}
                disabled={isGenerating}
                className="w-full py-4 bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed shadow-lg shadow-primary-200"
              >
                {isGenerating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Sparkles size={18} />
                )}
                {isGenerating ? 'Generating Scenario...' : 'Generate 30s Simulation'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-xs font-medium">
                <AlertCircle size={14} />
                {error}
              </div>
            )}
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl text-white">
            <h4 className="font-semibold mb-4 flex items-center gap-2 text-primary-400">
              <ShieldAlert size={18} />
              Veo 3 Simulation Specs
            </h4>
            <ul className="space-y-3 text-[11px] font-medium text-slate-400">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>MODEL</span>
                <span className="text-slate-200">veo-3.1-fast-generate-preview</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>DURATION</span>
                <span className="text-slate-200">30 Seconds (Cinematic)</span>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>RESOLUTION</span>
                <span className="text-slate-200">720p / 24fps</span>
              </li>
              <li className="flex justify-between">
                <span>ASPECT RATIO</span>
                <span className="text-slate-200">16:9 Landscape</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2">
          {isGenerating ? (
            <div className="bg-white border border-slate-200 rounded-2xl aspect-video flex flex-col items-center justify-center p-12 text-center animate-pulse">
              <div className="w-16 h-16 bg-primary-100 text-primary rounded-full flex items-center justify-center mb-6">
                <Video size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Generating Synthetic Safety Footage</h3>
              <p className="text-slate-500 max-w-sm mb-6">{LOADING_MESSAGES[loadingMsgIdx]}</p>
              <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-[loading_10s_ease-in-out_infinite]"></div>
              </div>
              <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes loading {
                  0% { width: 0%; }
                  50% { width: 70%; }
                  100% { width: 100%; }
                }
              `}} />
            </div>
          ) : generatedVideoUrl ? (
            <div className="bg-black rounded-2xl aspect-video overflow-hidden shadow-2xl relative group ring-4 ring-primary/10">
              <video
                src={generatedVideoUrl}
                className="w-full h-full object-contain"
                controls
                autoPlay
                loop
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-semibold text-white uppercase tracking-widest">Digital Twin Replay</span>
              </div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href={generatedVideoUrl}
                  download="iSafetyRobo-Sim.mp4"
                  className="p-2 bg-white/20 hover:bg-white/40 rounded-lg backdrop-blur-md text-white transition-all inline-flex items-center gap-2 font-semibold text-xs"
                >
                  <Download size={16} /> Save Simulation
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl aspect-video flex flex-col items-center justify-center p-12 text-center text-slate-400 group hover:border-primary-300 hover:bg-white transition-all cursor-pointer" onClick={generateVideo}>
              <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Play size={40} className="text-slate-300 group-hover:text-primary" fill="currentColor" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">Ready to Generate</h3>
              <p className="text-sm max-w-xs">Select a scenario and click generate to create a high-fidelity AI safety simulation.</p>
            </div>
          )}

          <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <Clock size={18} className="text-primary" />
              <h4 className="font-semibold">Generation Workflow</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Select Scenario", desc: "Choose from pre-defined EHS compliance tests." },
                { step: "02", title: "Neural Synthesis", desc: "Veo 3 generates realistic 30s manufacturing footage." },
                { step: "03", title: "Review & Train", desc: "Use high-fidelity video for operator training drills." }
              ].map((s, idx) => (
                <div key={idx} className="relative">
                  <span className="text-4xl font-black text-slate-50 absolute -top-4 -left-2 z-0">{s.step}</span>
                  <div className="relative z-10">
                    <h5 className="font-semibold text-slate-900 text-sm mb-1">{s.title}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
