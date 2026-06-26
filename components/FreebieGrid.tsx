import { FREEBIES_SORTED } from "@/lib/freebies";
import { FreebieCard } from "./FreebieCard";

export function FreebieGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {FREEBIES_SORTED.map((f) => (
        <FreebieCard key={f.skillId} freebie={f} />
      ))}
    </div>
  );
}
