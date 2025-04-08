// Utility to set data in localStorage with expiry
export const setLocalStorageWithExpiry = (key, data, expirationMinutes) => {
    const now = new Date();
    const item = {
        data: data,
        expiry: now.getTime() + expirationMinutes * 60 * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

// Utility to get data from localStorage with expiry
export const getLocalStorageWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
        const item = JSON.parse(itemStr);
        const now = new Date();

        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.data;
    } catch (e) {
        console.error("Error parsing localStorage item:", e);
        return null;
    }
};

// Login function with improved error handling
export const login = async (user) => {
    const { email, password } = user;
    const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:5000/api/v1";

    try {
        const res = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const contentType = res.headers.get("content-type");
        const data = contentType?.includes("application/json") ? await res.json() : {};

        if (res.status === 200) {
            setLocalStorageWithExpiry('auth', data, 60); // store for 60 minutes
            return {
                status: 200,
                user: data.user,
                token: data.token,
                message: data.message,
            };
        }

        return {
            status: res.status,
            message: data.message || 'Login failed',
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            status: 500,
            message: "Something went wrong while logging in",
        };
    }
};

// Register function
export const register = async (user) => {
    const { username, email, password } = user;
    const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:5000/api/v1";

    try {
        const res = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const contentType = res.headers.get("content-type");
        const data = contentType?.includes("application/json") ? await res.json() : {};

        if (res.status === 201) {
            return { status: 201, message: data.message };
        }

        return {
            status: res.status,
            message: data.message || "Registration failed",
        };
    } catch (error) {
        console.error("Register error:", error);
        return {
            status: 500,
            message: "Something went wrong while registering",
        };
    }
};
