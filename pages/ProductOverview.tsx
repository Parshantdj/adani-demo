import React from 'react';

export const ProductOverview: React.FC = () => {
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 bg-black">
      <div className="flex-1 overflow-hidden relative group">
        <video
          src="https://vision-module-bsl.s3.amazonaws.com/videos/ppe_kit_detection/bbd81933-e1f7-4278-bbcd-44b5dfd18cea.mp4"
          className="w-full h-full object-contain"
          controls
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Cinematic HUD Overlay */}
        <div className="absolute top-8 left-8 z-10 pointer-events-none">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
              <span className="text-white text-sm font-black tracking-[0.3em] uppercase opacity-80">AI VISION ACTIVE</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
              <span className="text-[10px] font-mono text-primary-400 font-semibold tracking-widest uppercase">Stream: PRODUCT_DEMO_01</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-10 pointer-events-none text-right">
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-1">Processing Layer: V3.12</p>
          <p className="text-white/60 font-mono text-xs uppercase font-semibold">Binary Semantics iSafetyRobo</p>
        </div>

        {/* Subtle Gradient Overlay for cinematic feel */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
      </div>
    </div>
  );
};