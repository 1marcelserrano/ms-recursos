"use client";

import { useState } from "react";
import { Freebie, LANE_STYLES } from "@/lib/freebies";
import { OptInForm } from "./OptInForm";

export function FreebieCard({ freebie }: { freebie: Freebie }) {
  const [open, setOpen] = useState(false);
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);
  const lane = LANE_STYLES[freebie.lane];

  return (
    <div className="flex flex-col rounded-card border border-white/10 bg-surface p-6 transition-colors hover:border-lima/30">
      <span
        className={`mb-3 inline-flex w-fit rounded-ctl px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] ${lane.badge} ${lane.text}`}
      >
        {freebie.lane}
      </span>
      <h3 className="font-display text-xl font-semibold text-cream">
        {freebie.title}
      </h3>
      <p className="mt-2 flex-1 text-cream/55">{freebie.subtitle}</p>

      <div className="mt-5">
        {unlockedUrl ? (
          <a
            href={unlockedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-lima hover:underline"
          >
            Abrir o recurso →
          </a>
        ) : freebie.ctaDestination === "DIRECT" ? (
          <a
            href={freebie.assetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-lima hover:underline"
          >
            Abrir →
          </a>
        ) : open ? (
          <div className="space-y-2">
            <p className="text-sm text-cream/55">
              Deixa seu email que eu te mando:
            </p>
            <OptInForm
              source="card"
              keyword={freebie.keyword}
              buttonLabel="Quero"
              compact
              onSuccess={(url) => setUnlockedUrl(url || freebie.assetUrl)}
            />
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="font-medium text-lima hover:underline"
          >
            Abrir →
          </button>
        )}
      </div>
    </div>
  );
}
