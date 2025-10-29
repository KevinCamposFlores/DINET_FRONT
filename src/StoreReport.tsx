import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"



function StoreReport (){

  const navigate = useNavigate();
 const errorauth = "Autenticación no válida. Vuelve a iniciar sesión para continuar."
   const token = localStorage.getItem('token');
 type TipoMensaje = "success" | "error" | "warning";

const [skus, setSkus] = useState([]);
const [page, setPage] = useState(0);
const [size, setSize] = useState(10);
const [totalPages, setTotalPages] = useState(0);
const [filters, setFilters] = useState({ sku: "", estado: "", zona: "" });


useEffect(() => {
  const params = new URLSearchParams({
  /*  page,
    size,
    sku: filters.sku || "",
    estado: filters.estado || "",
    zona: filters.zona || "" */
  }); 

  fetch(`/api/listarskuposicion?${params}`)
    .then(res => res.json())
    .then(data => {
      setSkus(data.content);
      setTotalPages(data.totalPages);
    });
}, [page, size, filters]);



   const mostrarMensaje  = (texto :string, tipo: TipoMensaje = "success") => {
   // setMensaje(texto);
   // setTipo(tipo);
   // setVisible(true);

      // Ocultar después de 3 segundos
    setTimeout(() => {
     // setVisible(false);
      // limpiar el mensaje luego de la animación
    //  setTimeout(() => setMensaje(null), 500);
    }, 3000);
  }





 if(!token){
      mostrarMensaje(errorauth, 'error')
      return
    }


  const volverhome = () => {
  navigate('/Home')
}

 /*const  

  const response  =  await fetch(url,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
    */

    return(
        <div className="dark:bg-background-dark bg-background-light font-display">
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl bg-background-dark/50 dark:bg-background-dark/80 rounded-lg border border-white/20 dark:border-white/10 shadow-lg">
        <div className="px-6 py-4 border-b border-white/20 dark:border-white/10">
          <h1 className="text-xl font-bold text-white  text-center">REPORTE DE ALMACENAJE</h1>
          <h1 className="text-xl font-bold text-white">FECHA: 30/10</h1>
        </div>

<div className="flex gap-4 mb-4">
  <input
    type="text"
    placeholder="Buscar SKU"
    value={filters.sku}
    onChange={(e) => setFilters({ ...filters, sku: e.target.value })}
    className="border rounded px-2 py-1"
  />

  <select
    value={filters.estado}
    onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
    className="border rounded px-2 py-1"
  >
    <option value="">Todos los estados</option>
    <option value="ALMACENADO">ALMACENADO</option>
    <option value="PENDIENTE">PENDIENTE</option>
  </select>

  <input
    type="text"
    placeholder="Zona"
    value={filters.zona}
    onChange={(e) => setFilters({ ...filters, zona: e.target.value })}
    className="border rounded px-2 py-1"
  />
</div>

      <table className="min-w-full divide-y divide-white/20 text-white">
  <thead>
    <tr className="bg-gray-800">
      <th className="px-4 py-2 text-left">SKU</th>
      <th className="px-4 py-2 text-left">Estado</th>
      <th className="px-4 py-2 text-left">Zona</th>
      <th className="px-4 py-2 text-left">Categoría</th>
    </tr>
  </thead>
  <tbody>
   {/* {skus.map((item, index) => (
      <tr key={index}>
        <td className="px-4 py-2">{item.sku}</td>
        <td className="px-4 py-2">{item.estado}</td>
        <td className="px-4 py-2">{item.zona}</td>
        <td className="px-4 py-2">{item.categoria}</td> 
      </tr>
    ))} */}
  </tbody>
</table>
         <button onClick={volverhome} className="w-full bg-transparent border border-black/20 dark:border-white/20 text-black dark:text-white rounded-lg h-12 text-center font-bold hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
            Salir
          </button>
      </div>
    </div>
    </div>)
}


export default StoreReport