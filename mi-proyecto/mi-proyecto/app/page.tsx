"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Calendly?: any;
  }
}

export default function HomePage() {
  

  const baseUrl = "https://calendly.com/bmarconi2009/30min";
  const calendlyUrl = `${baseUrl}?background_color=1a1a1a&text_color=ffffff&primary_color=dc2626&hide_landing_page_details=1&hide_gdpr_banner=1`;

  useEffect(() => {
    if (!document.getElementById("calendly-style")) {
      const l = document.createElement("link");
      l.id = "calendly-style";
      l.rel = "stylesheet";
      l.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(l);
    }
  }, []);

  const openCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (window.Calendly && window.Calendly.initPopupWidget) {
      window.Calendly.initPopupWidget({ 
        url: calendlyUrl 
      });
    } else {
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://assets.calendly.com" />
      
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="afterInteractive" 
      />

      <section 
        className="relative flex min-h-screen items-center justify-center overflow-hidden text-white"
        style={{
          backgroundImage: "url('/image1(1).webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay degradado mejorado */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
        
        {/* Efecto de luz sutil */}
        <div className="absolute inset-0 opacity-20" style={{
          background: 'radial-gradient(circle at bottom right, rgba(220, 38, 38, 0.1), transparent)',
        }} />

        {/* Contenido principal */}
        <div className="md:translate-x-30 relative z-10 w-full px-6 md:px-8 lg:px-12 py-20 md:py-32 flex justify-start ">
          <div className="flex flex-col items-start max-w-2xl">
            {/* Etiqueta decorativa */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-1 w-12 bg-red-500 rounded-full" />
              <span className="text-xs md:text-sm font-semibold tracking-widest text-red-500 uppercase">
                Hecho con pasión
              </span>
            </div>

            {/* Título principal */}
            <h1 className=" text-4xl md:text-8xl  font-serif font-extrabold leading-tight mb-2 tracking-tight "> 
              DISTRITO <span className="text-red-500">1</span>
            </h1>

            {/* Subtítulo elegante */}
            <p className="text-lg md:text-4xl text-white/70 font-light mb-8 leading-relaxed">
              Hamburguesería Gourmet
            </p>

            {/* Descripción */}
            <p className="text-base md:text-lg text-white/80 max-w-lg leading-relaxed mb-10">
              Hamburguesas artesanales premium, preparadas con ingredientes seleccionados. Cada bocado es una experiencia única de sabor y calidad.
            </p>

            {/* Botones mejorados */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={openCalendly} 
                onMouseEnter={() => {
                  const link = document.createElement('link');
                  link.rel = 'prefetch';
                  link.href = calendlyUrl;
                  document.head.appendChild(link);
                }}
                className="cursor-pointer group relative px-8 md:px-10 py-4 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-red-600/20 transform hover:scale-105 transition-all duration-300 ease-out overflow-hidden"
              >
                <div className="absolute inset-0 bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Reserva tu mesa
                </span>
              </button>

              <button className="cursor-pointer group px-8 md:px-10 py-4 border-2 border-white/40 text-white rounded-lg hover:border-red-500 hover:bg-red-500/5 transition-all duration-300 font-semibold flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Ver menú
              </button>
            </div>

            {/* Indicador visual */}
            <div className="mt-16 flex items-center gap-2 text-white/60 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>Abierto: Lunes a Domingo • 11:00 AM - 11:00 PM</span>
            </div>
          </div>
        </div>

        {/* Decoración de esquina */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-600/5 to-transparent pointer-events-none" />
      </section>
    </>
  );
}