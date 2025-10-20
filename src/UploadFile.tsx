import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';



function UploadFiles() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);
  const [file4, setFile4] = useState<File | null>(null);
  const [tipoarchivo, setTipoarchivo] = useState<string>('');
  

  const [enabledInputs, setEnabledInputs] = useState<boolean[]>([true, false, false]);
  
  const [mensaje, setMensaje] = useState<string>('');

  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (index === 0) setFile1(file);
    if (index === 1) setFile2(file);
    if (index === 2) setFile3(file);
    if (index === 3) setFile4(file);
  };

   const procesar = async() => {
  //  navigate('/locationskus');
      
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


   }

  const uploadFile = async (file: File | null, index: number) => {
    if (!file) {
      setMensaje('No hay archivo para subir');
      return;
    }

  

    try {
      setMensaje(`Subiendo archivo ${index + 1}...`);
      const formData = new FormData();
      formData.append('file', file);

      // Usamos una variable local en lugar de modificar el estado directamente
      let url: string = '';

      if (index === 0) {
        url = 'http://localhost:8090/ubicaciones/upload';
      } else if (index === 1) {
        url = 'http://localhost:8090/productoObservado/upload';
      } else if (index === 2) {
        url =  'http://localhost:8090/mproducto/upload';
      } else if (index === 3){
        url =  'http://localhost:8090/mdirectiva/upload'; 
       } 

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseText: string = await response.text();

      /*if (!response.ok) {
        throw new Error(responseText || 'Error en la subida');
      } */
      console.log(token)
      console.log(responseText);

      setMensaje(`✅ Archivo ${index + 1} subido con éxito!`);

      // Habilitar siguiente input si no es el último
      if (index < 3) {
        const newEnabled = [...enabledInputs];
        newEnabled[index + 1] = true;
        setEnabledInputs(newEnabled);
      }
    } catch (err) {
      const error = err as Error;
      setMensaje(`❌ Error al subir archivo ${index + 1}: ${error.message}`);
    }
  };

  return (
     <div className="dark:bg-background-dark bg-background-light font-display flex justify-center items-center min-h-screen"> 
   <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center dark:bg-background-dark  bg-background-light border-white/20 dark:border-white/10 rounded-xl shadow-lg">
  <div className="w-full max-w-md space-y-6 dark:bg-background-dark shadow-md rounded-lg p-6  bg-background-light border-white/20 dark:border-white/10 rounded-xl shadow-lg">
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

    {/* Cargar Maestro de Productos */}
    <div className="space-y-2">
      <h4 className="text-lg font-semibold text-gray-800">Cargar Maestro de Productos:</h4>
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

    {/* Cargar Directiva */}
    <div className="space-y-2">
      <h4 className="text-lg font-semibold text-gray-800">Cargar Directiva:</h4>
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

    {/* Procesar */}
    <div className="pt-4">
      <button
        onClick={() => procesar()}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-md
                   hover:bg-green-700 transition disabled:opacity-50"
      >
        Procesar Ubicaciones
      </button>
    </div>

    {/* Mensaje */}
    {mensaje && (
      <p className="text-center text-sm text-gray-700 bg-gray-100 rounded-md py-2">
        {mensaje}
      </p>
    )}
  </div>
</div>
</div>
  );
}

export default UploadFiles;
