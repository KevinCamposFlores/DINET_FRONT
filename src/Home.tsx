import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS, useState } from "react";
import { data, useNavigate } from "react-router-dom";

function Home(){
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
      
    console.log("TOKEN PARA EL BUSCAR SKU: "+token); 

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
      navigate("/uploadFile")
    }
    
    const navigatestorereport = () => {
      navigate("/StoreReport")
    }
   
    const navigatestoreproducts = () => {
      navigate("/StoreProducts")
    }

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