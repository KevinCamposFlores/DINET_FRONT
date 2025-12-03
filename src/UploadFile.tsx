import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';



function UploadFiles() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);
  const [file4, setFile4] = useState<File | null>(null);
  const [file5, setFile5] = useState<File | null>(null);
  const [tipoarchivo, setTipoarchivo] = useState<string>('');
  const [visible, setVisible] = useState(false)
  const [tipo, setTipo] = useState<TipoMensaje>("success");

  const [enabledInputs, setEnabledInputs] = useState<boolean[]>([true, false, false]);
  
  const [mensaje, setMensaje] = useState<string | null>(null);

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const errorauth = "Autenticación no válida. Vuelve a iniciar sesión para continuar."

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (index === 0) setFile1(file);
    if (index === 1) setFile2(file);
    if (index === 2) setFile3(file);
    if (index === 3) setFile4(file);
    if (index === 4) setFile5(file);
  };
   
   const volverhome = () => {
     if(!token){
      mostrarMensaje(errorauth, 'error')
      return
    }
  navigate('/Home')
}

  
   const procesar = async() => {
  //  navigate('/locationskus');
 if(!token){
      mostrarMensaje(errorauth, 'error')
      return
    }

    try{   
  setMensaje(`Procesando Ubicaciones...`);
  mostrarMensaje(`Procesando Ubicaciones...`, 'success')


     let url: string = '';
         url = 'http://localhost:8090/mdirectiva/ordenarskus';
     
     console.log("Verificar si hay token")
     console.log(token)

     const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }); 

      const data = await response.json();
      setMensaje(`✅ Ubicaciones Procesadas correctamente`);
      console.log('Token',token)
      console.log('Respuesta', data)
      mostrarMensaje(`✅ Proceso Finalizado: ${data.message}`, 'success')

   } 
   catch(err){
     const error = err as Error;
     
     // setMensaje(`❌ Error al Procesar Ubicaciones: ${error.message}`);
      mostrarMensaje(`❌ Error al Procesar Ubicaciones: ${error.message}`, 'error')
   }};


   //METODO PARA MENSAJES
   type TipoMensaje = "success" | "error" | "warning";

   const mostrarMensaje  = (texto :string, tipo: TipoMensaje = "success") => {
    setMensaje(texto);
    setTipo(tipo);
    setVisible(true);

      // Ocultar después de 3 segundos
    setTimeout(() => {
      setVisible(false);
      // limpiar el mensaje luego de la animación
      setTimeout(() => setMensaje(null), 500);
    }, 5000);
  }

 
//METODO PARA EL BOTON CARGAR ARCHIVOS
  const uploadFile = async (file: File | null, index: number) => {
    
    if(!token){
      mostrarMensaje(errorauth, 'error')
      return
    }
    
    if (!file) {
      mostrarMensaje('No hay archivo para subir', 'warning')
     // setMensaje('No hay archivo para subir');
      return;
    }
    try {

      mostrarMensaje(`Subiendo archivo ${index + 1}...`, 'success')
    
      const formData = new FormData();
      formData.append('file', file);

    
      let url: string = '';

      if (index === 0) {
        url = 'http://localhost:8090/ubicaciones/upload';
      } else if (index === 1) {
        url = 'http://localhost:8090/productoObservado/upload';
      } else if (index === 2) {
        url =  'http://localhost:8090/users/upload';
      } else if (index === 3){
        url =  'http://localhost:8090/mproducto/upload'; 
      } else if (index === 4) {
        url = 'http://localhost:8090/mdirectiva/upload'; 
       }

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        //const responseText: string = await response.text();
        
        const data = await response.json();

        if (!response.ok) {
          console.error('Error en la subida', data.error || data.message)
          mostrarMensaje(`❌ Error al subir el archivo ${index + 1}: ${data.error || data.message} `, 'error')
        return
        } 
       
        mostrarMensaje(`✅ Archivo subido con éxito: ${data.message}`, 'success')
        setMensaje(`✅ Archivo  subido con éxito!`);

      // Habilitar siguiente input si no es el último
      if (index < 4) {
        const newEnabled = [...enabledInputs];
        newEnabled[index + 1] = true;
        setEnabledInputs(newEnabled);
      }
    } catch (err) {
      const error = err as Error;
      mostrarMensaje(`❌ Error al subir archivo: ${error.message}`, 'error')
      setMensaje(`❌ Error al subir archivo : ${error.message}`);
      console.log(`❌ Error al subir archivo: ${error.message}`)
    }
  };

  return (
     <div className="dark:bg-background-dark bg-background-light font-display flex justify-center items-center min-h-screen"> 
   <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center dark:bg-background-dark  bg-background-light border-white/20 dark:border-white/10 rounded-xl shadow-lg">
  <div className="w-full max-w-md space-y-6 dark:bg-background-dark shadow-md rounded-lg p-6  bg-background-light border-white/20 dark:border-white/10 rounded-xl shadow-lg">
   
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
     
  
   
    {/* Cargar Ubicaciones */}
    <div className="space-y-2">
      <h4 className="text-lg font-semibold text-gray-800">Cargar Ubicaciones:</h4>
      <input
        type="file"
        accept=".xlsx, .xls"
        disabled={!enabledInputs[0]}
        onChange={(e) => handleFileChange(e, 0)}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        onClick={() => uploadFile(file1, 0)}
        disabled={!file1 || !enabledInputs[0]}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md 
                   hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Subir Archivo
      </button>
    </div>



    {/* Cargar Productos Observados */}
    <div className="space-y-2">
      <h4 className="text-lg font-semibold text-gray-800">Cargar Productos Observados:</h4>
      <input
        type="file"
        accept=".xlsx, .xls"
        disabled={!enabledInputs[1]}
        onChange={(e) => handleFileChange(e, 1)}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        onClick={() => uploadFile(file2, 1)}
        disabled={!file2 || !enabledInputs[1]}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md 
                   hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Subir Archivo
      </button>
    </div>

   {/* Cargar Maestro de Usuarios */}
    <div className="space-y-2">
      <h4 className="text-lg font-semibold text-gray-800">Cargar de Operarios Activos:</h4>
      <input
        type="file"
        accept=".xlsx, .xls"
        disabled={!enabledInputs[2]}
        onChange={(e) => handleFileChange(e, 2)}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        onClick={() => uploadFile(file3, 2)}
        disabled={!file3 || !enabledInputs[2]}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md 
                   hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Subir Archivo
      </button>
    </div>


    {/* Cargar Maestro de Productos */}
    <div className="space-y-2">
      <h4 className="text-lg font-semibold text-gray-800">Cargar Maestro de Productos:</h4>
      <input
        type="file"
        accept=".xlsx, .xls"
        disabled={!enabledInputs[3]}
        onChange={(e) => handleFileChange(e, 3)}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        onClick={() => uploadFile(file4, 3)}
        disabled={!file4 || !enabledInputs[3]}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md 
                   hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Subir Archivo
      </button>
    </div>

    {/* Cargar Directiva */}
    <div className="space-y-2">
      <h4 className="text-lg font-semibold text-gray-800">Cargar Directiva:</h4>
      <input
        type="file"
        accept=".xlsx, .xls"
        disabled={!enabledInputs[4]}
        onChange={(e) => handleFileChange(e, 4)}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        onClick={() => uploadFile(file5, 4)}
        disabled={!file5 || !enabledInputs[4]}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md 
                   hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Subir Archivo
      </button>
    </div>
    {mensaje}
    {/* Procesar */}
    <div className="flex flex-col space-y-3">
      <button
        onClick={() => procesar()}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-md
                   hover:bg-green-700 transition disabled:opacity-50"
      >
        Procesar Ubicaciones
      </button>
      <button onClick={volverhome}  className="w-full py-3 bg-transparent text-white font-semibold rounded-md
                    transition disabled:opacity-50 border border-black/20 dark:border-white/20 text-black dark:text-white">Volver</button>
    </div>
  </div>
</div>
</div>
  );
}

export default UploadFiles;
