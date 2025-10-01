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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Login;
