// components/Menu.tsx
import Boton from "./components/boton"
import CardMenu from "./components/cardMenu"


export default function Menu() {
  const burgers = [
    { id: 1, nombre: "Burger Czarnuszek", precio: "26.90€", desc: "Carne de vaca madurada, pan brioche, bacon ahumado y salsa secreta.", img: "/hamburguesa1.webp" },
    { id: 2, nombre: "Burger Clásica", precio: "24.50€", desc: "La de siempre, pero mejor que nunca. Ingredientes locales de Alhaurín.", img: "/hamburguesa1.webp" },
    { id: 3, nombre: "D1 Especial", precio: "28.00€", desc: "Doble carne, doble queso y nuestra salsa ahumada artesanal.", img: "/hamburguesa1.webp" },
    { id: 4, nombre: "Veggie Delight", precio: "22.00€", desc: "Hamburguesa vegetariana con ingredientes frescos y sabrosos.", img: "/hamburguesa1.webp" },
    { id: 5, nombre: "Spicy Inferno", precio: "27.50€", desc: "Para los amantes del picante, con jalapeños y salsa picante casera.", img: "/hamburguesa1.webp" },
    { id: 6, nombre: "Blue Cheese Burger", precio: "29.00€", desc: "Con queso azul artesanal y cebolla caramelizada.", img: "/hamburguesa1.webp" },
    { id: 7, nombre: "Mushroom Swiss", precio: "26.00€", desc: "Champiñones salteados y queso suizo derretido.", img: "/hamburguesa1.webp" },
    { id: 8, nombre: "BBQ Bacon Burger", precio: "28.50€", desc: "Tocino crujiente y salsa BBQ casera.", img: "/hamburguesa1.webp" },
  ];

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] text-white py-20">
      {/* Decoración: Tomate o Chile flotando (Opcional) */}
      <div className="absolute top-20 right-10 opacity-20 animate-bounce pointer-events-none">
          <img src="./tomate.png" alt="decor" className="w-24" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Título */}
        <div className="mb-16">
          <h2 className="text-red-500 font-bold uppercase tracking-tighter mb-2">Carta Selecta</h2>
          <h1 className="text-7xl font-serif font-black">MENU</h1>
        </div>

        {/* Categorías (Scrollable en móvil) */}
        <div className="flex gap-4 overflow-x-auto pb-10 no-scrollbar items-center">
          <Boton texto="Starters" />
          <Boton texto="Burgers" active /> {/* Este llevará el fondo rojo */}
          <Boton texto="Salads" />
          <Boton texto="Drinks" />
          <Boton texto="Desserts" />
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {burgers.map((burger) => (
            <CardMenu 
              key={burger.id}
              nombre={burger.nombre}
              precio={burger.precio}
              descripcion={burger.desc}
              imagen={burger.img}
            />
          ))}
        </div>

        {/* Botón Ver Más */}
        <div className="mt-16 text-center">
          <button className="border border-white/20 px-10 py-3 rounded-full hover:bg-white hover:text-black transition-all font-bold">
            VER CARTA COMPLETA
          </button>
        </div>
      </div>
    </section>
  )
}