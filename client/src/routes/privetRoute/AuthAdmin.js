import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export const AdminAuth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(false);

    const checkAdmin = useCallback(async () => {
        try {
            await axiosInstance.get("admin/check-admin");
            setUser(true);
        } catch (error) {
            setUser(false);
            navigate("/login");
            console.log(error);
        }
    }, [navigate]);

    useEffect(() => {
        checkAdmin();
    }, [checkAdmin, location.pathname]);

    return user ? children : null;
};