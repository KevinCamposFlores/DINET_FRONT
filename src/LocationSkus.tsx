import { useEffect, useState, useRef } from 'react';
import  {data, useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function LocationSkus() {
 

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
const [mensaje, setMensaje] = useState<string>("")
const [error, setError] = useState<string | null>(null)

useEffect(()=> {
  if(datarecibida?.sku) {
    console.log("aqui esta la data recibida" + datarecibida.sku)
    
    setId(datarecibida.id)
    setSku(datarecibida.sku)
    setPerfil(datarecibida.perfil)
    setEncargado(datarecibida.encargado)
    setCantidad(datarecibida.cantidad)
    setFamilia(datarecibida.familia)
    setPosicion(datarecibida.posicion)
    setProcess(datarecibida.process_id)
    setEstado(datarecibida.estado)
  }
}, [datarecibida])

const botonconfirmar = ()  => {

  if(estado === 'ALMACENADO'){
   setMensaje("El SKU YA SE ENCUENTRA ALMACENADO")

  }
  else{
   // if(posicion === code){
     almacenarsku();
 /*   }
    else {
      setMensaje("La ubicación es incorrecta para este SKU")
    } */
  }

}

 let url : string = '';
 const token = localStorage.getItem('token');

const almacenarsku = async() => {


  setMensaje("EL SKU SE ALMACENO CORRECTAMENTE")        
    url = `http://localhost:8090/skuposicion/actualizarestadoSKUALMACEN/${encodeURIComponent(sku)}`
    try {

        const response  =  await fetch(url,{
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if(!response.ok){
         throw new Error("SKU no encontrado")
        }

        setEstado('ALMACENADO');
       //  const data : skuposicion  =  response.json();
      //   navigate('/LocationSkus', {state: data})
      console.log(response.json.toString)
        
      }
      catch (err){
      setError((err as Error).message)
      } 
      finally {
      }
}

const volverhome = () => {
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

  return (
   
<div className="dark:bg-background-dark bg-background-light font-display flex justify-center items-center min-h-screen">
<div className="flex items-center justify-center min-h-screen">
<main className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-w-6xl w-full">
<div className="flex flex-col items-center justify-center bg-background-dark/50 dark:bg-background-light/5 p-6 rounded-lg">
<div className="w-full aspect-video bg-cover bg-center rounded-lg flex items-center justify-center">
</div>
<div className="text-center mt-4">
<h2 className="text-xl font-bold text-black dark:text-white">Previsualización del Producto</h2>
<p className="text-black/60 dark:text-white/60">Datos del producto o previsualización aquí.</p>
</div>
</div>
<div className="flex flex-col justify-center space-y-6">
<div className="space-y-4">
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary">SKU: {sku}</p>
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary">PERFIL: {perfil}</p>
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary" >ENCARGADO: {encargado}</p>
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary">CANTIDAD: {cantidad.toString()} </p>
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary">FAMILIA: {familia}</p>
<p className="w-full bg-background-light dark:bg-background-dark border border-black/20 dark:border-white/20 rounded-lg h-12 px-4 flex items-center text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary">POSICION: {posicion} </p>
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
 {mensaje && (
      <p className="text-center text-sm text-gray-700 bg-gray-100 rounded-md py-2">
        {mensaje}
      </p>
    )}
</div>
</main>
</div>
</div>
);
}

export default LocationSkus;