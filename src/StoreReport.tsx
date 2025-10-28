import { useNavigate } from "react-router-dom"


function StoreReport (){

  const navigate = useNavigate();
 const errorauth = "Autenticación no válida. Vuelve a iniciar sesión para continuar."
   const token = localStorage.getItem('token');
 type TipoMensaje = "success" | "error" | "warning";

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
        <ul className="divide-y divide-white/20 dark:divide-white/10">
          <li className="p-4">
            <p className="text-white">SKU : 10234   ESTADO: ALAMACENADO   ZONA:MZ1POS4 CATEGORI:##</p>
          </li>
          <li className="p-4">
            <p className="text-white">SKU : 10234 ESTADO: ALAMACENADO ZONA:MZ1POS4 CATEGORI:##</p>
          </li>
          <li className="p-4">
            <p className="text-white">SKU : 10234 ESTADO: ALAMACENADO ZONA:MZ1POS4 CATEGORI:##</p>
          </li>
           <li className="p-4">
            <p className="text-white">SKU : 10234 ESTADO: ALAMACENADO ZONA:MZ1POS4 CATEGORI:##</p>
          </li>
           <li className="p-4">
            <p className="text-white">SKU : 10234 ESTADO: ALAMACENADO ZONA:MZ1POS4 CATEGORI:##</p>
          </li>
        </ul>
     
         <button onClick={volverhome} className="w-full bg-transparent border border-black/20 dark:border-white/20 text-black dark:text-white rounded-lg h-12 text-center font-bold hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
            Salir
          </button>
      </div>
    </div>
    </div>)
}


export default StoreReport