import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function PWAUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW registered:', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  if (!needRefresh) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-xl bg-[#1e3a5f] text-white px-5 py-3 shadow-lg text-sm">
      <span>A new version is available.</span>
      <button
        onClick={() => updateServiceWorker(true)}
        className="rounded-lg bg-[#c9a84c] px-3 py-1 font-semibold text-[#1e3a5f] hover:bg-yellow-400 transition-colors"
      >
        Update
      </button>
      <button
        onClick={() => setNeedRefresh(false)}
        className="text-white/60 hover:text-white transition-colors"
        aria-label="Dismiss update notification"
      >
        ✕
      </button>
    </div>
  );
}
