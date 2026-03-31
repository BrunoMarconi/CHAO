import { Star, Utensils } from 'lucide-react'; // Cambiamos Quote por Utensils para el toque foody

export default function Resenas() {
  const testimonios = [
    {
      nombre: "Marcos Ruiz",
      rol: "Local Guide Alhaurín",
      comentario: "La carne tiene un sabor a brasa espectacular y el pan brioche se nota que es artesano. Hacía falta un sitio de este nivel en el pueblo. La D1 Especial es obligatoria.",
      estrellas: 5,
      foto: "https://i.pravatar.cc/150?u=marcos"
    },
    {
      nombre: "Elena Garrido",
      rol: "Burger Lover",
      comentario: "No solo la comida está increíble, el local tiene un rollazo brutal. La atención es súper rápida y las hamburguesas llegan calientes y en su punto exacto. Repetiremos seguro.",
      estrellas: 5,
      foto: "https://i.pravatar.cc/150?u=elena"
    },
    {
      nombre: "Pablo Sánchez",
      rol: "Cliente Habitual",
      comentario: "He probado muchas hamburgueserías en Málaga y esta entra directamente en mi top 3. Relación calidad-precio de 10. No te vayas sin probar los entrantes.",
      estrellas: 5,
      foto: "https://i.pravatar.cc/150?u=pablo"
    }
  ];

  return (
    <section className="bg-[#050505] py-24 px-6 relative overflow-hidden">
      {/* Cubierto gigante decorativo de fondo */}
      <Utensils className="absolute -top-10 -right-10 size-64 text-red-600/[0.03] -rotate-12" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Encabezado con tu estilo tipográfico */}
        <div className="mb-16">
          <h2 className="text-white text-5xl md:text-6xl font-serif font-black italic uppercase tracking-tighter mb-4">
            Vuestra <span className="text-red-600">Experiencia</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex text-red-600">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase">
              4.9/5 basado en 350+ valoraciones de Google
            </span>
          </div>
        </div>

        {/* Grid de Reseñas - Usando el color rojo de Distrito 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonios.map((resena, idx) => (
            <div 
              key={idx} 
              className="bg-[#0f0f0f] p-8 rounded-[2.5rem] border border-white/5 hover:border-red-600/30 transition-all duration-500 group"
            >
              {/* Estrellas rojas */}
              <div className="flex text-red-600/30 mb-6 group-hover:text-red-600 transition-colors">
                {[...Array(resena.estrellas)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              {/* Texto de la reseña */}
              <p className="text-white/80 text-lg leading-relaxed font-medium mb-8">
                "{resena.comentario}"
              </p>

              {/* Info del Cliente */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={resena.foto} 
                    alt={resena.nombre} 
                    className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-full border border-red-600/20 group-hover:border-red-600 transition-colors" />
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-tighter">{resena.nombre}</h4>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">{resena.rol}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action a Google Maps */}
        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="group inline-flex items-center gap-3 text-white/50 hover:text-red-500 text-xs font-black tracking-[0.2em] uppercase transition-all"
          >
            <span>Ver todas las reseñas en Google</span>
            <div className="w-10 h-[1px] bg-white/10 group-hover:bg-red-600 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}