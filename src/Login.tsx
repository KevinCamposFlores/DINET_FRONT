import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
  token: string;
  rol: string;
  username: string;
}

function Login() {
  const [username, setUsuario] = useState<string>('');
  const [password, setContrasena] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');

  const navigate = useNavigate();

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

        localStorage.setItem('token', token);
        console.log('Login exitoso:', datos);
       
        if( rol === 'ADMIN'){
            navigate('/uploadFile');
        }else {
            navigate('/locationskus')
        }
        

        setMensaje('✅ Bienvenido');
      } else {
        const error = await respuesta.text();
        setMensaje(`❌ Error: ${error}`);
      }
    } catch (err) {
      const error = err as Error; // Forzamos a que `err` sea del tipo `Error`
      setMensaje(`❌ Error de red: ${error.message}`);
    }
  };

  return (
    <div className="dark:bg-background-dark bg-background-light font-display flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-background-light dark:bg-background-dark border border-white/20 dark:border-white/10 rounded-xl shadow-lg">
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
          <div>
            <label className="sr-only" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="w-full bg-white/5 dark:bg-white/5 border border-white/20 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg focus:ring-primary focus:border-primary px-4 py-2"
            />
          </div>
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:ring-primary"
            >
              Entrar
            </button>
          </div>
        </form>
        {mensaje && (
          <p className="mt-4 text-center text-sm text-red-500 dark:text-red-400">
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
