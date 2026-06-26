"use client";

import { useEffect, useState } from "react";

// Slot de retrato do Marcel. Tenta carregar /public/marcel.jpg de forma
// silenciosa (pré-load via Image()) e só troca o placeholder pela foto
// quando ela carrega de fato — sem flash de imagem quebrada.
export function Portrait() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setOk(true);
    img.src = "/marcel.jpg";
  }, []);

  return (
    <div className="relative aspect-[4/5] w-40 shrink-0 overflow-hidden rounded-card border border-white/10 bg-surface sm:w-48">
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/marcel.jpg"
          alt="Marcel Serrano"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-3 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-lima/70">
            sua foto
          </span>
          <span className="font-mono text-[10px] text-cream/30">
            /public/marcel.jpg
          </span>
        </div>
      )}
      {/* Cantos lima — vocabulário arquitetônico do DS */}
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-lima/60" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-lima/60" />
    </div>
  );
}
