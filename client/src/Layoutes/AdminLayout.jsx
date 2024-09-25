import React from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "../components/admin/AdminNavbar";

import AdminFooter from "../components/admin/AdminFooter";

export const AdminLayout = () => {
    return (
        <div>
            <AdminNavbar />
            <div >
                <Outlet />
            </div>
            <AdminFooter/>
            
        </div>
    );
};
