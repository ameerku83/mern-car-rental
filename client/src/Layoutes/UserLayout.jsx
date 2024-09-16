
import React from "react";
import { Outlet } from "react-router-dom";

import UserNavbar from "../components/admin/UserNavbar";
import Footer from "../components/Footer";

export const UserLayout = () => {
    return (
        <div>
            <UserNavbar/>
            <div className="">
                <Outlet />
            </div>
            <Footer/>
            
        </div>
    );
};




