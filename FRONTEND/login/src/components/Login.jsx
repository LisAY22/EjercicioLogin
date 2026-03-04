import { useState } from "react";
import { loginUser } from "../services/AuthAPI";

import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const data = await loginUser({ username, password });
            
            // Save the token 
            sessionStorage.setItem("token", data.key);   
            navigate("/");
            
        } catch (err) {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light" id="login-background">
                <div className="card shadow p-4" style={{width: '350px'}}>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>
                    
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
                            Entrar
                        </button>
                    </form>
                </div>
        </div>
    );
}

export default Login;