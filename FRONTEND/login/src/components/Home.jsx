import { useState } from "react";
import { newUser } from "../services/AuthAPI";

import { useNavigate } from "react-router-dom";

function Home() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");

        navigate("/login");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await newUser({ username, password });

            setSuccess(true);
            setUsername(""); // Limpiamos campos
            setPassword("");
                        
        } catch (err) {
            setError("Error al registrar el usuario");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light" id="login-background">
                <div className="card shadow p-4" style={{width: '350px'}}>
                    <h2 className="text-center mb-4">Registrar nuevo usuario</h2>
                    
                    {success && <div className="alert alert-success">Usuario registrado exitosamente</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Usuario</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Crear Usuario
                        </button>
                    </form>

                    <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i> SALIR
                    </button>
                </div>
        </div>
    );
}

export default Home;