import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface LoginResponse {
  token: string;
  rol: string;
  username: string;
  nombreapellido: string;
}

function Login() {

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
    }, 3000);
  }

  const [username, setUsuario] = useState<string>('');
  const [password, setContrasena] = useState<string>('');
  const [visible, setVisible] = useState(false)
  const [tipo, setTipo] = useState<TipoMensaje>("success");
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setMostrarPassword(!mostrarPassword);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:8090/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (respuesta.ok) {
        const datos: LoginResponse = await respuesta.json();
        const token = datos.token;
        const rol = datos.rol;
        const username = datos.username;
        const nombreapellido= datos.nombreapellido;

        localStorage.setItem('token', token);
        console.log('Login exitoso:', datos);
       
        if( rol === 'ADMIN'){
            localStorage.setItem('rol', 'ADMIN');
            localStorage.setItem('username', username)
            localStorage.setItem('nombreapellido', nombreapellido)
            navigate('/home');
           
        }else {
           localStorage.setItem('rol', 'USER');
           localStorage.setItem('username', username)
           localStorage.setItem('nombreapellido', nombreapellido)
            navigate('/home')
           
        }
        mostrarMensaje('Bienvenido', 'success')
      } else {
        const error = await respuesta.json();
        mostrarMensaje(`Error: ${error.error}`, 'error')
      
      }
    } catch (err) {
      const error = err as Error; // Forzamos a que `err` sea del tipo `Error`
       mostrarMensaje(`Error de red: ${error.message}`, 'error')
    
    }
  };

  return (
    <div className="dark:bg-background-dark bg-background-light font-display flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-background-light dark:bg-background-dark border border-white/20 dark:border-white/10 rounded-xl shadow-lg">
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
     
      
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-6">Iniciar sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="sr-only" htmlFor="username">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="w-full bg-white/5 dark:bg-white/5 border border-white/20 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:ring-primary focus:border-primary px-4 py-2"
            />
          </div>
           <div className="relative">
      <label className="sr-only" htmlFor="password">
        Contraseña
      </label>
      <input
        id="password"
        type={mostrarPassword ? "text" : "password"}
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setContrasena(e.target.value)}
        required
        className="w-full bg-white/5 dark:bg-white/5 border border-white/20 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:ring-primary focus:border-primary px-4 py-2 pr-10"
      />

      {/* Botón del ojito */}
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200 focus:outline-none"
      >
        {mostrarPassword ? (
          <EyeSlashIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </div>
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:ring-primary"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
