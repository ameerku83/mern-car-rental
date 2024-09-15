import React from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "../components/admin/AdminNavbar";
import Footer from "../components/Footer";

export const AdminLayout = () => {
    return (
        <div>
            <AdminNavbar />
            <div className="min-h-96">
                <Outlet />
            </div>
            <Footer/>
            
        </div>
    );
};
