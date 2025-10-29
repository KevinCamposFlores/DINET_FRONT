import React from "react";

const Navbar: React.FC = () => {


const handleLogout =  async () => {

    const token = localStorage.getItem("token")
    const url: string = "http://localhost:8090/auth/logout"

    if(token) {
    try{
        await fetch(url,{
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`},

        } )
    }
    catch(error){
      console.error("Error al cerra la sesion:", error)
    }

}
localStorage.removeItem("token");
    window.location.href = "/login"
    }

    

 return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#1e1e2f",
      color: "white"
    }}>
      <h2>My APP</h2>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Cerrar sesión
      </button>
    </nav>
  );
};


export default Navbar;