import { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS, useState, useRef, useEffect } from "react";
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
     estado : string,
     nombreencargado : string
      }
     
     
      

    let url : string = '';
     const token = localStorage.getItem('token');
     const rol = localStorage.getItem('rol');
     const usename = localStorage.getItem('username');

    const [sku, setSku] = useState<string>('');
    const navigate = useNavigate();
   // const [resultado, setResultado] = useState<skuposicion | null>(null)
    const [error, setError] = useState<string | null>(null)

    const navigatelocationskus = async() => {
   
     const params = new URLSearchParams({
  sku: sku,
  username: usename ?? ''
});


    //url =  `http://localhost:8090/skuposicion/almacenarSku${encodeURIComponent(sku)}`
      url =  `http://localhost:8090/skuposicion/almacenarSku?${params}`
      
       
     if(!token){
      mostrarMensaje(errorauth, 'error')
      return
     }

      if(!sku.trim()){
        mostrarMensaje('Por favor ingrese un SKU para almacenar', 'warning')
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
        const data2 = await response.json();
          mostrarMensaje(data2.error, 'warning')
          return
        }
         const data : skuposicion  = await response.json();
         navigate('/LocationSkus', {state: data})
         
      }
      catch (err){
      mostrarMensaje((err as Error).message, 'error')
      } 
    
    }


    const navigateUploadFile = () => {
        
    if(!token){
      mostrarMensaje(errorauth, 'error')
      return
    }

    if(rol === 'USER'){
      mostrarMensaje('Esta opción solo es para un usuario Administrador','warning')
      return
    }
    else {
       navigate("/uploadFile")
    }
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

    //INPUT PARA EL SCANEO DEL QR
    
    const inputRef = useRef<HTMLInputElement>(null)
    const code : string = ('')
    
    useEffect(() => {
    const input = inputRef.current;
    if(!input) return;
    
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const code = target.value.trim()
      console.log("codigo escaneado:", code);
    
      // Aquí puedes enviar el código a tu backend
          // fetch("/api/codigo", { method: "POST", body: JSON.stringify({ code }) });
    
          // Limpiar el input y mantener el foco
    
           target.value = "";
          input.focus();
    }
    
       input.addEventListener("change", handleChange);
    
        // Mantener el foco inicial
        input.focus();
    
        return () => {
          input.removeEventListener("change", handleChange);
        };
      }, []);

    return  (
  

     <div className="dark:bg-background-dark bg-background-light font-display text-white flex flex-col h-screen justify-center items-center p-6">  
     
           {/* Mensaje tipo toast */}
          {mensaje && (
  <div
    className={`fixed top-5 right-5 flex items-center gap-3 px-5 py-4 rounded-lg shadow-lg text-white font-medium transition-all duration-500 ease-in-out
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
      ${
        tipo === "success"
          ? "bg-green-500"
          : tipo === "error"
          ? "bg-red-500"
          : "bg-yellow-500"
      }`}
  >
    {/* Ícono */}
    {tipo === "success" && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="white"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 8l8 6 8-6M4 8v8a2 2 0 002 2h12a2 2 0 002-2V8m-16 0l8 6 8-6"
        />
      </svg>
    )}
    {tipo === "error" && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="white"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    )}
    {tipo === "warning" && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="white"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M12 19a7 7 0 100-14 7 7 0 000 14z"
        />
      </svg>
    )}

    {/* Mensaje */}
    <span>{mensaje}</span>
  </div>
)}
     
      <div className="w-full max-w-lg space-y-8">
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80" htmlFor="sku">
            SKU:
          </label>
          <input ref={inputRef} 
           type="text"
           id="sku"
           onChange={(e) => setSku(e.target.value)}
           placeholder="Enter SKU"
           className="w-full bg-background-dark border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
           autoFocus />
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

         {error && (
      <p className="text-center text-sm text-gray-700 bg-gray-100 rounded-md py-2">
        {error}
      </p>
    )}
      </div>
    </div> )
}

export default Home;