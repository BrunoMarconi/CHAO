export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 px-8 py-4">
      <div className="max-w-7xl md:translate-x-36 flex items-center justify-between">
        
        {/* Logo con un toque más estilizado */}
        <h1 className="text-3xl font-black tracking-tighter text-white">
          DISTRITO <span className="text-red-900">1</span>
        </h1>

        {/* Navegación Centrada */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <a href="#services" className="text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                Menú
              </a>
            </li>
            <li>
              <a href="#about" className="text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                Horario
              </a>
            </li>
            <li>
              <a href="#contact" className="text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                Dónde estamos
              </a>
            </li>
          </ul>
        </nav>

        {/* Botón de Acción (Call to Action) */}
        <div className="hidden md:block">
          <a href="https://booksy.com/es-es/4250_haro-di-barber_barberia_29664_alqueria/staffer/28542#ba_s=seo" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-black px-5 py-2 text-sm font-bold uppercase hover:bg-red-800 transition-colors">
            Reservar Cita
          </a>
        </div>

        {/* Menú móvil (solo icono para ejemplo) */}
        <div className="md:hidden text-white cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>

      </div>
    </header>
  );
}