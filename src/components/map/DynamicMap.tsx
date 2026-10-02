import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-card bg-stone-light animate-pulse flex items-center justify-center">
      <span className="text-body-sm text-ink-400">Laster kart...</span>
    </div>
  ),
});

export default DynamicMap;
