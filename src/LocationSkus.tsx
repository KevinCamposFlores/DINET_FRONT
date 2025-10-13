
function LocationSkus() {
return (
<div>
<div className="flex items-center justify-center min-h-screen">
<main className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-w-6xl w-full">
<div className="flex flex-col items-center justify-center bg-background-dark/50 dark:bg-background-light/5 p-6 rounded-lg">
<div className="w-full aspect-video bg-cover bg-center rounded-lg flex items-center justify-center">
</div>
<div className="text-center mt-4">
<h2 className="text-xl font-bold text-black dark:text-white">Previsualización del Producto</h2>
<p className="text-black/60 dark:text-white/60">Datos del producto o previsualización aquí.</p>
</div>
</div>
<div className="flex flex-col justify-center space-y-6">
<div className="space-y-4">
<input className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="SKU" type="text"/>
<input className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="CATEGORÍA" type="text"/>
<input className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="ZONA" type="text"/>
<input className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="UBICACIÓN" type="text"/>
</div>
<div className="flex flex-col space-y-3">
<button className="w-full bg-primary text-white rounded-lg h-12 text-center font-bold hover:bg-primary/90 transition-colors">
            Confirmar
          </button>
<button className="w-full bg-transparent border border-black/20 dark:border-white/20 text-black dark:text-white rounded-lg h-12 text-center font-bold hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
            Salir
          </button>
</div>
</div>
</main>
</div>
</div>
);
}

export default LocationSkus;