import type { LayerState, LayerStatus } from "@/hooks/health";

const DOT: Record<LayerState, string> = {
  ok: "bg-brand-500 shadow-glow",
  down: "bg-red-500",
  checking: "bg-gray-300 animate-pulse",
};

interface LayerStatusRowProps {
  layer: LayerStatus;
}

export function LayerStatusRow({ layer }: LayerStatusRowProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-soft">
      <span className={`h-3 w-3 rounded-full ${DOT[layer.state]}`} />
      <span className="flex-1 font-semibold">{layer.label}</span>
      <span className="text-sm text-gray-500">{layer.state === "checking" ? "Checking…" : layer.note}</span>
    </div>
  );
}
