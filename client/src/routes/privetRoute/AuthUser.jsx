import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export const UserAuth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(false);

    const checkUser = useCallback(async () => {
        try {
            await axiosInstance.get("user/check-user");
            setUser(true);
        } catch (error) {
            setUser(false);
            navigate("/login");
            console.log(error);
        }
    }, [navigate]);

    useEffect(() => {
        checkUser();
    }, [checkUser, location.pathname]);

    return user ? children : null;
};