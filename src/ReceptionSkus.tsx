import { useEffect, useState, useRef } from 'react';
import  {data, useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



function ReceptionSkus (){
   type TipoMensaje = "success" | "error" | "warning";
   const errorauth = "Autenticación no válida. Vuelve a iniciar sesión para continuar."
   const [visible, setVisible] = useState(false)
   const [tipo, setTipo] = useState<TipoMensaje>("success");
   const[posicion, setPosicion] = useState<string>("")
   const[sku, setSku] = useState<string>("")
   const navigate = useNavigate();
   const [descripcion, setDescripcion] = useState<string>("")
 const [mensaje, setMensaje] = useState<string | null>(null);

  
    interface recepcionsku  {
       sku: String,
       descripcion: String,
       posicion : String
    }

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


 let url : string = '';
 const token = localStorage.getItem('token'); 

//INPUT PARA EL SCANEO DEL QR

  const inputSkuRef = useRef<HTMLInputElement>(null);
  const inputPosRef = useRef<HTMLInputElement>(null);
  
  const handleSkuScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.trim();
    setSku(code);

    console.log("SKU escaneado:", code);

    // Limpiar input
    // e.target.value = "";
    inputSkuRef.current?.focus();
  };

  const handlePosScan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.trim();
    setPosicion(code);
    console.log("Posición escaneada:", code);

    // Limpiar input
    //e.target.value = "";
    inputPosRef.current?.focus();
  };

   const almacenarsku = async() => {

   if(!token){
      mostrarMensaje(errorauth, 'error')
      return
     } 
    
   const url = `http://172.16.140.16:8090/recpcionskus/guardarRecepcion` //`http://localhost:8090/recpcionskus/guardarRecepcion`
    try {

        const recepcion : recepcionsku = {
          sku,
          descripcion,
          posicion
        }
        
        const response  =  await fetch(url,{
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
           body: JSON.stringify(recepcion),
        });

        if(!response.ok){
           const error = await response.json()
            mostrarMensaje(error.error, 'error')
            return
        }
         
        const data = await response.json()
         mostrarMensaje(data.message, 'success')
         
     
       //  const data : skuposicion  =  response.json();
      //   navigate('/LocationSkus', {state: data})
      
      }
      catch (err){
      
      mostrarMensaje((err as Error).message, 'error')
      } 

}

const volverhome = () => {
   if(!token){
      mostrarMensaje(errorauth, 'error')
      return
     }
  navigate('/Home')
}

const limpiar = () => {
   if (inputSkuRef.current) inputSkuRef.current.value = "";
  if (inputPosRef.current) inputPosRef.current.value = "";
  inputSkuRef.current?.focus();
}

 
  return (
   
<div className="dark:bg-background-dark bg-background-light font-display min-h-screen flex justify-center items-center px-4">

  <main className="w-full max-w-xl mx-auto space-y-6">

    {/* TOAST */}
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
        <span>{mensaje}</span>
      </div>
    )}

    {/* CONTENIDO */}
    <div className="flex flex-col space-y-6">

      <h1 className="text-center text-2xl md:text-3xl font-extrabold tracking-widest text-zinc-900 dark:text-zinc-100">
        MODULO DE RECEPCION
      </h1>

      {/* INPUTS */}
      <div className="flex flex-col space-y-4">

        <label className="text-black dark:text-white font-medium">LPN:</label>
        <input
          ref={inputSkuRef}
          onChange={handleSkuScan}
          type="text"
          placeholder="Escanee el LPN aquí"
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 white:bg-background-white"
          autoFocus
        />

        <label className="text-black dark:text-white font-medium">POSICIÓN:</label>
        <input
          ref={inputPosRef}
          onChange={handlePosScan}
          type="text"
          placeholder="Escanee la Posición aquí"
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-3 white:bg-background-white "
        />

      </div>

      {/* BOTONES */}
      <div className="flex flex-col space-y-3">
        <button
          onClick={almacenarsku}
          className="w-full bg-primary text-white rounded-lg h-12 font-bold hover:bg-primary/90"
        >
          Confirmar
        </button>
        
         <button
          onClick={limpiar}
          className="w-full bg-primary text-white rounded-lg h-12 font-bold hover:bg-primary/90"
        >
          Limpiar
        </button>
        <button
          onClick={volverhome}
          className="w-full border border-black/20 dark:border-white/20 text-black dark:text-white rounded-lg h-12 font-bold hover:bg-primary/10"
        >
          Salir
        </button>
      </div>
    
    </div>

  </main>

</div>
);
}

export default ReceptionSkus
