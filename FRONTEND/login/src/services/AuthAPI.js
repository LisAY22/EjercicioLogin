export const loginUser = async (credentials) => {
    const response = await fetch(`http://127.0.0.1:8000/api/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        throw new Error('Credenciales inválidas');
    }

    return await response.json();
};

export const newUser = async (userData) => {
    const response = await fetch(`http://127.0.0.1:8000/api/auth/registration/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: userData.username,
            password1: userData.password,
            password2: userData.password,
            email: userData.email || "default@example.com"
        })
    });
    
    if (!response.ok) {
        const errorDetail = await response.json();
        console.log("Detalle del error:", errorDetail);
        throw new Error('Error al registrar el usuario');
    }

    return await response.json();
};