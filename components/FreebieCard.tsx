"use client";

import { useState } from "react";
import { Freebie, LANE_STYLES } from "@/lib/freebies";
import { OptInForm } from "./OptInForm";

export function FreebieCard({ freebie }: { freebie: Freebie }) {
  const [open, setOpen] = useState(false);
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);
  const lane = LANE_STYLES[freebie.lane];

  return (
    <div className="flex flex-col rounded-2xl border border-forest/10 bg-cream-card p-6 shadow-sm">
      <span
        className={`mb-3 inline-flex w-fit rounded-pill px-3 py-1 text-xs font-semibold ${lane.badge} ${lane.text}`}
      >
        {freebie.lane}
      </span>
      <h3 className="font-display text-xl font-semibold text-forest-deep">
        {freebie.title}
      </h3>
      <p className="mt-2 flex-1 text-muted">{freebie.subtitle}</p>

      <div className="mt-5">
        {unlockedUrl ? (
          <a
            href={unlockedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-clay hover:underline"
          >
            Abrir o recurso →
          </a>
        ) : freebie.ctaDestination === "DIRECT" ? (
          <a
            href={freebie.assetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-clay hover:underline"
          >
            Abrir →
          </a>
        ) : open ? (
          <div className="space-y-2">
            <p className="text-sm text-muted">
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
            className="font-semibold text-clay hover:underline"
          >
            Abrir →
          </button>
        )}
      </div>
    </div>
  );
}
