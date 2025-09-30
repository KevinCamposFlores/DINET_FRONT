import { useState } from 'react';

function Login() {
  const [username, setUsuario] = useState('');
  const [password, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await fetch('http://localhost:8090/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (respuesta.ok) {
        const datos = await respuesta.json();
        const token = datos.token;

        localStorage.setItem('token', token);
        console.log('Login exitoso:', datos);
        setMensaje('✅ Bienvenido');
      } else {
        const error = await respuesta.text();
        setMensaje(`❌ Error: ${error}`);
      }
    } catch (err) {
      setMensaje(`❌ Error de red: ${err.message}`);
    }
  };

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
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