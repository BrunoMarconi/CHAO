export default function Boton({ texto, active }: { texto: string, active?: boolean }) {
  return (
    <button className={`
      px-8 py-2 rounded-full font-bold transition-all whitespace-nowrap
      ${active 
        ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] scale-110" 
        : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/5"}
    `}>
      {texto}
    </button>
  );
}