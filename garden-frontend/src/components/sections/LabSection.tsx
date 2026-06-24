import { useRef, useState } from "react";

type ParticleCoord = { x: number; y: number };

export function LabSection() {
  const [speed, setSpeed] = useState(15);
  const [scale, setScale] = useState(10);
  const [gravity, setGravity] = useState(2);
  const [coords, setCoords] = useState<ParticleCoord[]>([
    { x: 100, y: 100 },
    { x: 300, y: 200 },
    { x: 500, y: 150 },
  ]);
  const areaRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 100;
    const y = e.clientY - rect.top - 100;
    const g = gravity * 20;
    setCoords([
      { x: x + g, y: y - g },
      { x: x - g * 1.5, y: y + g * 0.5 },
      { x: x + g * 0.5, y: y + g * 1.5 },
    ]);
  };

  const particles = [
    { className: "from-accent to-purple-400", sizeMultiplier: 4, speedMultiplier: 1, opacity: "opacity-50" },
    { className: "from-cyan-400 to-indigo-500", sizeMultiplier: 6, speedMultiplier: 1.3, opacity: "opacity-40" },
    { className: "from-pink-500 to-accent", sizeMultiplier: 3, speedMultiplier: 0.8, opacity: "opacity-50" },
  ];

  const gravityLabel = gravity === 1 ? "Suave" : gravity === 2 ? "Média" : "Intensa";

  return (
    <section className="space-y-10 page-transition">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          O Laboratório
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xl">
          Experimentos interativos rodando direto no DOM. Mova o cursor pela
          viewport e observe a resposta mecânica das partículas.
        </p>
      </div>

      <div className="p-6 rounded-3xl border border-lightBorder dark:border-darkBorder bg-lightCard dark:bg-darkCard space-y-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Playground de Vetores
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Interaja com a viewport para arrastar as órbitas.
            </p>
          </div>

          <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            60 FPS
          </div>
        </div>

        <div
          ref={areaRef}
          onMouseMove={handleMouseMove}
          className="h-56 w-full rounded-2xl bg-neutral-100 dark:bg-neutral-900/50 border border-lightBorder dark:border-darkBorder relative overflow-hidden flex items-center justify-center cursor-crosshair"
        >
          <p className="text-xs font-mono text-neutral-400 select-none pointer-events-none">
            Mova o cursor aqui
          </p>

          {particles.map((p, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-gradient-to-tr ${p.className} ${p.opacity} blur-sm pointer-events-none`}
              style={{
                width: `${scale * p.sizeMultiplier}px`,
                height: `${scale * p.sizeMultiplier}px`,
                transform: `translate(${coords[i].x}px, ${coords[i].y}px)`,
                transition: `transform ${((35 - speed) * p.speedMultiplier) / 10}s cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Slider
            label="Elasticidade"
            value={speed}
            min={5}
            max={30}
            display={`${((35 - speed) / 10).toFixed(1)}s`}
            onChange={setSpeed}
          />
          <Slider
            label="Escala"
            value={scale}
            min={5}
            max={25}
            display={`${(scale / 10).toFixed(1)}x`}
            onChange={setScale}
          />
          <Slider
            label="Gravidade"
            value={gravity}
            min={1}
            max={3}
            display={gravityLabel}
            onChange={setGravity}
          />
        </div>
      </div>
    </section>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  display: string;
  onChange: (value: number) => void;
}

function Slider({ label, value, min, max, display, onChange }: SliderProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-mono text-neutral-400 flex justify-between">
        <span>{label}</span>
        <span>{display}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-accent"
      />
    </div>
  );
}
