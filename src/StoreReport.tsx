function StoreReport (){

    return(
        <div className="dark:bg-background-dark bg-background-light font-display">
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl bg-background-dark/50 dark:bg-background-dark/80 rounded-lg border border-white/20 dark:border-white/10 shadow-lg">
        <div className="px-6 py-4 border-b border-white/20 dark:border-white/10">
          <h1 className="text-xl font-bold text-white">REPORTE DE ALMACENAJE</h1>
        </div>
        <ul className="divide-y divide-white/20 dark:divide-white/10">
          <li className="p-4">
            <p className="text-white">Item 1</p>
          </li>
          <li className="p-4">
            <p className="text-white">Item 2</p>
          </li>
          <li className="p-4">
            <p className="text-white">Item 3</p>
          </li>
        </ul>
      </div>
    </div>
    </div>)
}


export default StoreReport