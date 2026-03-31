// components/CardMenu.tsx
import Image from 'next/image'

interface Props {
  nombre: string;
  precio: string;
  descripcion: string;
  imagen: string;
}

export default function CardMenu({ nombre, precio, descripcion, imagen }: Props) {
  return (
    <div className="group relative bg-[#121212] border border-white/5 p-6 rounded-[2.5rem] transition-all duration-500 hover:border-red-600/30 overflow-hidden">
      
      {/* Luz de fondo sutil */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/5 blur-[50px] group-hover:bg-red-600/15 transition-all duration-500" />

      <div className="flex justify-between items-start">
        <span className="bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-black tracking-tighter text-red-500 border border-white/5">
          {precio}
        </span>
      </div>
      
      {/* Imagen con Elevación Pro */}
      <div className="relative w-full h-48 mt-2 mb-4 group-hover:-translate-y-4 transition-transform duration-500 ease-out">
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/80 blur-2xl rounded-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <Image 
          src={imagen} 
          alt={nombre} 
          fill 
          className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-black text-white leading-none tracking-tighter uppercase italic group-hover:text-red-500 transition-colors">
          {nombre}
        </h3>
        
        <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3 font-medium px-2">
          {descripcion}
        </p>
        
        {/* Botón de Acción Informativa */}
        <div className="pt-4">
            <button className="w-full bg-zinc-900 hover:bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-3 rounded-xl border border-white/5 transition-all active:scale-95">
                ¡Lo quiero ya!
            </button>
        </div>
      </div>
    </div>
  )
}