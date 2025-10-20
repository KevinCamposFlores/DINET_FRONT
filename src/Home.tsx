import { useState } from "react";

function Home(){
   
    const [sku, setSku] = useState("");

    return  (
     <div className="dark:bg-background-dark bg-background-light font-display text-white flex flex-col h-screen justify-center items-center p-6">
      <div className="w-full max-w-lg space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80" htmlFor="sku">
            SKU:
          </label>
          <input
            id="sku"
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="Enter SKU"
            className="w-full bg-background-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="btn btn-primary col-span-1 sm:col-span-1">
            ALMACENAR
          </button>
          <button className="btn btn-secondary col-span-1 sm:col-span-2">
            REPORTE DE ALMACENAJE
          </button>
        </div>

        <button className="w-full btn btn-secondary">CARGAR ARCHIVOS</button>

        <div className="flex justify-end pt-8">
          <button className="btn btn-outline">SALIR</button>
        </div>
      </div>
    </div> )
}

export default Home;