import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadFiles() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [file3, setFile3] = useState<File | null>(null);
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
  };

   const procesar = async() => {
    navigate('/locationskus');
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
        url = 'http://localhost:8090/mproducto/upload';
      } else if (index === 2) {
        url = 'http://localhost:8090/mdirectiva/upload';
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
      if (index < 2) {
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
    <div>
     <div >
           <h4>Cargar Ubicaciones:</h4>
        <input
          type="file"
          accept=".xlsx, .xls"
          disabled={!enabledInputs[0]}
          onChange={(e) => handleFileChange(e, 0)}
    
        /> 
        <button onClick={() => uploadFile(file1, 0)} disabled={!file1 || !enabledInputs[0]}>
          Subir Archivo
        </button>
      </div>

      <div>
        <h4>Cargar Maestro de Productos:</h4>
        <input
          type="file"
          accept=".xlsx, .xls"
          disabled={!enabledInputs[1]}
          onChange={(e) => handleFileChange(e, 1)}
        />
        <button onClick={() => uploadFile(file2, 1)} disabled={!file2 || !enabledInputs[1]}>
          Subir Archivo
        </button>
      </div>

      <div>
        <h4>Cargar Directiva:</h4>
        <input
          type="file"
          accept=".xlsx, .xls"
          disabled={!enabledInputs[2]}
          onChange={(e) => handleFileChange(e, 2)}
        />
        <button onClick={() => uploadFile(file3, 2)} disabled={!file3 || !enabledInputs[2]}>
          Subir Archivo
        </button>
      </div>
       <div>
        <button onClick={() => procesar() }>Procesar Ubicaciones</button>
       </div>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default UploadFiles;
