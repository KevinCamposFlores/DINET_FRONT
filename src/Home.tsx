import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS, useState } from "react";
import { data, useNavigate } from "react-router-dom";

function Home(){

  //METODO PARA MENSAJES
   type TipoMensaje = "success" | "error" | "warning";
   const errorauth = "Autenticación no válida. Vuelve a iniciar sesión para continuar."
   const [visible, setVisible] = useState(false)
   const [tipo, setTipo] = useState<TipoMensaje>("success");
   const [mensaje, setMensaje] = useState<string | null>(null);

   const mostrarMensaje  = (texto :string, tipo: TipoMensaje = "success") => {
    setMensaje(texto);
    setTipo(tipo);
    setVisible(true);

      // Ocultar después de 3 segundos
    setTimeout(() => {
      setVisible(false);
      // limpiar el mensaje luego de la animación
      setTimeout(() => setMensaje(null), 500);
    }, 3000);
  }

      interface skuposicion {
     id: number,
     sku: string,
     perfil : string,
     encargado : string,
     cantidad : number,
     familia : string,
     posicion : string,
     process_id : number,
     estado : string
      }
 
    let url : string = '';
     const token = localStorage.getItem('token');
  

    const [sku, setSku] = useState<string>('');
    const navigate = useNavigate();
   // const [resultado, setResultado] = useState<skuposicion | null>(null)
    const [error, setError] = useState<string | null>(null)

    const navigatelocationskus = async() => {
    //url =  `http://localhost:8090/skuposicion/almacenarSku${encodeURIComponent(sku)}`
      url =  `http://localhost:8090/skuposicion/almacenarSku/${encodeURIComponent(sku)}`
      
       
     if(!token){
      mostrarMensaje(errorauth, 'error')
      return
     }

      if(!sku.trim()){
        setError("Por favor ingrese un SKU para almacenar")
        return;
      }

      setError(null);
   

      try {
        const response  =  await fetch(url,{
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if(!response.ok){
         throw new Error("SKU no encontrado")
        }
         const data : skuposicion  = await response.json();
         navigate('/LocationSkus', {state: data})
         
      }
      catch (err){
      setError((err as Error).message)
      } 
      finally {

      }

     
    }


    const navigateUploadFile = () => {
        
    if(!token){
      mostrarMensaje(errorauth, 'error')
      return
    }
      navigate("/uploadFile")
    }
    
    const navigatestorereport = () => {
    if(!token){
      mostrarMensaje(errorauth, 'error')
      return
    }
      navigate("/StoreReport")
    }
   
    const navigatestoreproducts = () => {
    if(!token){
      mostrarMensaje(errorauth, 'error')
      return
    }
      navigate("/StoreProducts")
    }

    return  (
  

     <div className="dark:bg-background-dark bg-background-light font-display text-white flex flex-col h-screen justify-center items-center p-6">  
     
           {/* Mensaje tipo toast */}
           {mensaje && (
            <div
              className={`fixed top-5 right-5 px-6 py-3 rounded-lg border shadow-md transition-all duration-500 ease-in-out
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
              ${
              tipo === "success"
               ? "bg-green-100 border-green-400 text-green-800"
              : tipo === "error"
              ? "bg-red-100 border-red-400 text-red-800"
              : "bg-yellow-100 border-yellow-400 text-yellow-800"
              }`}
                >
               {mensaje}
              </div>
                )}
     
     
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
          <button onClick={navigatelocationskus}  className="btn btn-primary col-span-1 sm:col-span-1">
            ALMACENAR
          </button>
          <button onClick={navigatestorereport} className="btn btn-secondary col-span-1 sm:col-span-2">
            REPORTE DE ALMACENAJE
          </button>
        </div>

        <button onClick={navigateUploadFile} className="w-full btn btn-secondary">CARGAR ARCHIVOS</button>

        <div className="flex justify-end pt-8">
          <button className="btn btn-outline">SALIR</button>
        </div>
         {error && (
      <p className="text-center text-sm text-gray-700 bg-gray-100 rounded-md py-2">
        {error}
      </p>
    )}
      </div>
    </div> )
}

export default Home;