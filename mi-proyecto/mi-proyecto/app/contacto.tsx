// components/Contacto.tsx
export default function Contacto() {
  return (
    <section className="bg-[#0a0a0a] text-white py-24 px-6 relative overflow-hidden">
      {/* Decoración: Un chile o chispa en la esquina */}
      <div className="absolute bottom-10 left-10 opacity-10 rotate-12">
        <img src="/chili.png" alt="" className="w-20" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Lado Izquierdo: Info de Contacto */}
        <div className="space-y-8">
          <div>
            <h2 className="text-red-600 font-black uppercase tracking-widest text-sm mb-2">Encuéntranos</h2>
            <h1 className="text-5xl md:text-6xl font-serif font-extrabold tracking-tighter italic">
              ¿HAMBRE DE <br /> DISTRITO 1?
            </h1>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 group-hover:border-red-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Dirección</p>
                <p className="text-xl font-bold">Alhaurín de la Torre, Málaga</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 group-hover:border-red-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Email</p>
                <p className="text-xl font-bold">info@distrito1.com</p>
              </div>
            </div>
          </div>

          <button className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest px-10 py-5 rounded-2xl transition-all shadow-[0_10px_30px_rgba(220,38,38,0.3)] active:scale-95 w-full md:w-auto">
            Llamar para Reservar
          </button>
        </div>

        {/* Lado Derecho: Mapa (Simulado con estilo Dark) */}
        <div className="relative h-[450px] w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=YOUR_EMBED_LINK_HERE" 
            className="absolute inset-0 w-full h-full grayscale invert opacity-80 contrast-125"
            loading="lazy"
          ></iframe>
          {/* Capa de diseño encima del mapa para que no se pueda mover sin querer */}
          <div className="absolute inset-0 pointer-events-none border-[15px] border-[#0a0a0a] rounded-[3rem]"></div>
        </div>

      </div>
    </section>
  );
}