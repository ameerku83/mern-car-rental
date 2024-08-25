import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { RootLayout } from "../Layoutes/RootLayout";
import AdminLogin from "../components/admin/AdminLogin";
import { AdminAuth } from "./privetRoute/AuthAdmin";
import { AdminLayout } from "../Layoutes/AdminLayout";
import { UserLayout } from "../Layoutes/UserLayout";
import { UserAuth } from "./privetRoute/AuthUser";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { UserProfile } from "../pages/user/UserProfile";

const adminPath=process.env.REACT_APP_ADMIN
export const router=createBrowserRouter([
    {   path:"/",
        element:<RootLayout/>,
        children:[
            {
                path:"/",
                
                element:<HomePage/>
                
            },
            
            {
                path:adminPath,
                element:<AdminLogin/>
                
            },
            {
                path:'/signup',
                element:<Signup/>
                
            },
            {
                path:'/login',
                element:<Login/>
                
            },
            {
                path:'/services',
                element:<h1 className="pt-28" >servic</h1>
                
            }

        ]

    },
    {
        path:'admin',
        element:<AdminAuth> <AdminLayout/> </AdminAuth>,
        children:[
        {
            path:"users",
            element:<h1>hello</h1>
        },
        {
            path:"home",
            element:<HomePage/>
        },
        {
            path:"addcar",
            element:<h1 className=" mt-24" >add car</h1>
        },
        {
            path:"editcar",
            element:<h1 className=" mt-24" >edit car</h1>
        },
        {
            path:"carlist",
            element:<h1 className=" mt-24" >list car</h1>
        },
        
    ]

    },
    {
        path:"user",
        element: <UserAuth><UserLayout/></UserAuth> ,
        children:[
            {
                path:'home',
                element:<HomePage/>
                
            },
            {
                path:'profile',
                element:<UserProfile/>
                
            },


            {
                path:"rent",
                element:<h1 className="pt-28"  >rent</h1>

            },
            {
                path:"contact",
                element:<h1 className="pt-28"  >contact</h1>

            },
            {
                path:"services",
                element:<h1 className="pt-28"  >service</h1>

            }

        ]
    }


])