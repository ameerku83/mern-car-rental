
import React from "react";
import { Outlet } from "react-router-dom";

import UserNavbar from "../components/admin/UserNavbar";

export const UserLayout = () => {
    return (
        <div>
            <UserNavbar/>
            <div className="min-h-96">
                <Outlet />
            </div>
            
        </div>
    );
};




