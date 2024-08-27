
import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export const AdminAuth = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState();

    const checkAdmin = async () => {
        try {
            const response = await axiosInstance.get("admin/check-admin",);
            setUser(true);
        } catch (error) {
            navigate('/login');
            console.log(error);
        }
    };

    useEffect(() => {
        checkAdmin();
    }, [location.pathname]);

    return user ? children : null;
};


