// components/Footer.tsx
export default function Footer() {
  const redes = [
    { nombre: 'Instagram', url: '#', icon: '📸' },
    { nombre: 'Facebook', url: '#', icon: '👤' },
    { nombre: 'TikTok', url: '#', icon: '🎵' },
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          
          {/* Columna 1: Branding */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic tracking-tighter">DISTRITO 1</h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Elevando el concepto de hamburguesa gourmet en Alhaurín de la Torre. Ingredientes locales, pasión artesanal.
            </p>
            <div className="flex gap-4">
              {redes.map((red) => (
                <a key={red.nombre} href={red.url} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors border border-white/10">
                  <span className="text-sm">{red.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Horario (Vital para el dueño) */}
          <div className="space-y-6">
            <h3 className="text-red-500 font-bold uppercase tracking-widest text-xs">Horario de Cocina</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Lunes - Jueves</span>
                <span className="font-bold font-mono">20:00 - 23:30</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2 text-red-500">
                <span className="">Viernes - Domingo</span>
                <span className="font-bold font-mono">13:30 - 16:30 | 20:00 - 00:00</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Acción Rápida */}
          <div className="space-y-6">
            <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-xs">¿Vienes hoy?</h3>
            <p className="text-2xl font-black tracking-tighter italic italic">RESERVA TU MESA</p>
            <a 
              href="tel:+34600000000" 
              className="inline-block bg-white text-black font-black px-8 py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all text-sm uppercase tracking-widest"
            >
              +34 600 000 000
            </a>
          </div>

        </div>

        {/* Copyright y Créditos (Aquí es donde pones tu marca para que te salgan más clientes) */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4 text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
          <p>© 2024 DISTRITO 1 - TODOS LOS DERECHOS RESERVADOS</p>
          <p>
            Diseñado con pasión por <span className="text-white font-bold hover:text-red-500 cursor-pointer transition-colors">TU NOMBRE / AGENCIA</span>
          </p>
        </div>
      </div>
    </footer>
  );
}