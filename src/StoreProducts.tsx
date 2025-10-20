function StoreProducts(){

    return (
 <div className="dark:bg-background-dark bg-background-light font-display">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-xl p-6 space-y-6 bg-background-light dark:bg-background-dark border border-white/20 dark:border-white/10 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
            Confirmación de SKU
          </h1>
          <div className="overflow-x-auto">
            <div className="border border-white/20 dark:border-white/10 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-white/20 dark:divide-white/10">
                <thead className="bg-white/5 dark:bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20 dark:divide-white/10">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                      SKU1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      Valor 1
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                      SKU2
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      Valor 2
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                      SKU3
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      Valor 3
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="responsable">
                Responsable
              </label>
              <input
                className="w-full bg-white/5 dark:bg-white/5 border border-white/20 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:ring-primary focus:border-primary"
                id="responsable"
                name="responsable"
                placeholder="Responsable"
                type="text"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="fecha">
                Fecha
              </label>
              <input
                className="w-full bg-white/5 dark:bg-white/5 border border-white/20 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:ring-primary focus:border-primary"
                id="fecha"
                name="fecha"
                placeholder="Fecha"
                type="text"
              />
            </div>
            <div className="flex justify-center pt-4">
              <button
                className="w-full max-w-xs px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:ring-primary"
                type="button"
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
      
    )
}

export default StoreProducts