import { useEffect, useState, useRef } from 'react';
import  {data, useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function LocationSkus() {
  

  //https://app.netlify.com/projects/classy-beignet-9f1633/deploys/6904df90524ee881b398405e
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


 const location = useLocation();
 const navigate = useNavigate();
const datarecibida: skuposicion =  location.state
const [id, setId] = useState<Number>(0)
const [sku, setSku] = useState<string>("")
const [perfil, setPerfil] = useState<string>("")
const [encargado, setEncargado] = useState<string>("")
const [cantidad, setCantidad] = useState<Number>(0)
const [familia, setFamilia] = useState<string>("")
const [posicion, setPosicion] = useState<string>("")
const [process_id, setProcess] = useState<Number>(0)
const [estado, setEstado] = useState<string>("")
const [nombreencargado, setNombreencargado] = useState<string>("")
const[codigobarra, setcodigobarra] = useState<string>("")
const [error, setError] = useState<string | null>(null)

useEffect(()=> {
  if(datarecibida?.sku) {
    
    setId(datarecibida.id)
    setSku(datarecibida.sku)
    setPerfil(datarecibida.perfil)
    setEncargado(datarecibida.encargado)
    setCantidad(datarecibida.cantidad)
    setFamilia(datarecibida.familia)
    setPosicion(datarecibida.posicion)
    setProcess(datarecibida.process_id)
    setEstado(datarecibida.estado)
    setNombreencargado(datarecibida.nombreencargado)
  }
}, [datarecibida])

const botonconfirmar = ()  => {

   if(!token){
      mostrarMensaje(errorauth, 'error')
      return
     }
  
   if(posicion.trim() !== codigobarra.trim()){
       
        mostrarMensaje('Este sku NO pertenece a esta posición', 'warning')
        code == null
        return

    }
    else {
   
  if(estado === 'ALMACENADO'){
    mostrarMensaje('El SKU YA SE ENCUENTRA ALMACENADO', 'warning')
  }
  else{
   // if(posicion === code){
     setEstado("ALMACENADO")
     almacenarsku();
 /*   }
    else {
      setMensaje("La ubicación es incorrecta para este SKU")
    } */
  }
}

}

 let url : string = '';
 const token = localStorage.getItem('token');

const almacenarsku = async() => {

   if(!token){
      mostrarMensaje(errorauth, 'error')
      return
     }
    
    url = `http://localhost:8090/skuposicion/actualizarestadoSKUALMACEN/${encodeURIComponent(sku)}`
    try {
        
        const response  =  await fetch(url,{
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          }
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


//INPUT PARA EL SCANEO DEL QR

const inputRef = useRef<HTMLInputElement>(null)
const code : string = ('')

useEffect(() => {
const input = inputRef.current;
if(!input) return;

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const code = target.value.trim()
  setcodigobarra(code)
  

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

  const leftNumbers = Array.from({ length: 21 }, (_, i) => 41 - i * 2).reverse();
  const rightNumbers = Array.from({ length: 21 }, (_, i) => 42 - i * 2).reverse();
  

const renderCheckboxRow = (num: number, align: "left" | "right") => {
  const parte = posicion.split(".")
  const fila = Number(parte[parte.length -2]); // fila de la posición
  let indiceCheckbox = Number(parte[parte.length -1]) -1; // checkbox correcto
  let par = Number(parte[parte.length-2]);

  if (parte.length >= 4 && parte[parte.length - 4].length >= 3) {
  let piso = Number(parte[parte.length - 4].substring(2, 3));
  console.log(piso);
} else {
  console.warn('El formato de "parte" no es válido:', parte);
}
 
  
  if(par % 2 !== 0){
  switch(indiceCheckbox ){
    case 2: 
    indiceCheckbox = 0;
    break
    case 1:
     indiceCheckbox = 1;
     break
    case 0:
     indiceCheckbox = 2;
     break
     default:
     console.warn("Indice fuera de rango ", indiceCheckbox)
  }
  }

  return (
    <div key={num} className={`flex justify-${align === "left" ? "end" : "start"} py-1`}>
      {align === "left" ? (
        <div className="flex gap-x-2">
          {[...Array(3)].map((_, i) => {
          const isChecked = i === indiceCheckbox && num === fila;
            return (
               <div
              key={i}
              className={`w-5 h-5 rounded flex items-center justify-center border-2
                ${isChecked ? "bg-green-500 border-green-500" : "bg-transparent border-zinc-400"}`}
            >
              {isChecked && <div className="w-3 h-3 bg-green rounded-sm"></div>}
            </div>
            );
          })}
          <p className={`w-6  text-sm font-normal text-zinc-900 dark:text-white`}>
        {num}
      </p>
        </div>
        
      ) : (
        <div className="flex gap-x-2" >
          <p className={`w-6 text-sm font-normal text-zinc-900 dark:text-white`}>
        {num}
      </p>
          {[...Array(3)].map((_, i) => {
            const isChecked = i === indiceCheckbox && num === fila;
            return (
                <div
              key={i}
              className={`w-5 h-5 rounded flex items-center justify-center border-2
                ${isChecked ? "bg-green-500 border-green-500" : "bg-transparent border-zinc-400"}`}
            >
              {isChecked && <div className="w-3 h-3 bg-green rounded-sm"></div>}
            </div>

            );
          })}
        </div>
      )}
    </div>
  );
};


  return (
   
<div className="dark:bg-background-dark bg-background-light font-display flex justify-center items-center min-h-screen">
<div className="flex items-center justify-center min-h-screen">
<main className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 pt-2 max-w-6xl w-full">


<div className="flex flex-col items-center justify-center bg-background-dark/50 dark:bg-background-light/5 p-6 rounded-lg">
<div className="w-full max-h-32 bg-cover bg-center rounded-lg flex items-center justify-center overflow-hidden">

</div>
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
<div>
  
        <div className="relative grid grid-cols-[1fr_min-content_1fr] items-center justify-center gap-x-1">

          {/* Texto vertical central */}
          <div className="col-start-2 row-start-1 flex h-full items-center">
            <h2 className="writing-mode-v-rl -rotate-90 transform select-none text-2xl font-extrabold tracking-[0.2em] text-zinc-300 dark:text-zinc-700">
            PISO{posicion.substring(6,7)}  CALLE{posicion.substring(10,11)}
            </h2>
          </div>

          {/* Columna izquierda */}
          <div className="col-start-1 row-start-1 flex flex-col-reverse ">
            {leftNumbers.map((n) => renderCheckboxRow(n, "left"))}
          </div>

          {/* Columna derecha */}
          <div className="col-start-3 row-start-1 flex flex-col-reverse">
            {rightNumbers.map((n) => renderCheckboxRow(n, "right"))}
          </div>
        </div>
      
</div>
</div>
<div className="flex flex-col justify-center space-y-6">
<div className="space-y-4">
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary">SKU: {sku}</p>
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary">PERFIL: {perfil}</p>
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary" >ENCARGADO: {nombreencargado}</p>
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary">CANTIDAD: {cantidad.toString()} </p>
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary">FAMILIA: {familia}</p>
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary">UBICACIÓN: {posicion} </p>
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary">ESTADO: {estado} </p>
 <input ref={inputRef} type="text" placeholder="Escanee el código aquí" autoFocus />
</div>
<div className="flex flex-col space-y-3">
<button onClick={botonconfirmar} className="w-full bg-primary text-white rounded-lg h-12 text-center font-bold hover:bg-primary/90 transition-colors">
            Confirmar
          </button>
<button onClick={volverhome} className="w-full bg-transparent border border-black/20 dark:border-white/20 text-black dark:text-white rounded-lg h-12 text-center font-bold hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors">
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