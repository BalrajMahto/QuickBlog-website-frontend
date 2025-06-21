import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"; 

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.message === "Network Error") {
            toast.error("Unable to connect to server. Please check your connection.");
        }
        return Promise.reject(error);
    }
);

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]); // <-- Renamed from blog to blogs for clarity
    const [input, setInput] = useState("");

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchBlogs();
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }
        // Do NOT redirect to /admin/login here for all users, only do this in protected routes!
    }, []);

    const value = {
        axios,
        navigate,
        token,
        setToken,
        blogs,      // <-- Renamed
        setBlogs,   // <-- Renamed
        input,
        setInput
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};