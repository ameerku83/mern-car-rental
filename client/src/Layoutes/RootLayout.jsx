
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/ui/NavBar";
import Footer from "../components/Footer";

export const RootLayout = () => {
    return (
        <div>
            <NavBar/>
            <div className="min-h-96">
                <Outlet />

            </div>

            <Footer/>
            
        </div>
    );
};




