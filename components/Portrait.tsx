"use client";

import { useEffect, useState } from "react";

// Slot de retrato do Marcel. Preenche o container do pai (a largura é
// controlada no hero). Tenta carregar /public/marcel.jpg silenciosamente e
// só troca o placeholder pela foto quando ela carrega — sem flash quebrado.
export function Portrait() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setOk(true);
    img.src = "/marcel.jpg";
  }, []);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card">
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/marcel.jpg"
          alt="Marcel Serrano"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 border border-white/10 bg-surface px-3 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-lima/70">
            sua foto
          </span>
          <span className="font-mono text-[10px] text-cream/30">
            /public/marcel.jpg
          </span>
        </div>
      )}
    </div>
  );
}
