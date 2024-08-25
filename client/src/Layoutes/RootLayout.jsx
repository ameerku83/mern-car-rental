
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/ui/NavBar";

export const RootLayout = () => {
    return (
        <div>
            <NavBar/>
            <div className="min-h-96">
                <Outlet />
            </div>
            
        </div>
    );
};




