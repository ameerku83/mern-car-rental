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
import CarForm from "../pages/admin/CarForm";
import { CarCategories } from "../pages/CarCategories";
import { AdminCarList } from "../pages/admin/AdminCarList";
import Services from "../pages/Services";
import AboutPage from "../pages/AboutPage";
import { Cardetails } from "../components/user/Cardetails";
import { BookingDetails } from "../pages/user/BookingDetails";
import MyBookings from "../pages/user/MyBookings";
import UserList from "../pages/admin/UserList";
import { AdminUserBookings } from "../pages/admin/AdminUserBookings";
import { PaymentSucces } from "../pages/user/PaymentSucces";
import { PaymentCancell } from "../pages/user/PaymentCancell";
import { UsersReviews } from "../pages/admin/UsersReviews";
import { UsersPayments } from "../pages/admin/UsersPayments";
import AdminCreateUser from "../pages/admin/AdminCreateUser";
import UserHomePage from "../pages/UserHomePage";
import ContactUs from "../pages/user/ContactUs";
import { UsersMessages } from "../pages/admin/UsersMessages";
import CancelBooking from "../pages/user/CancelBooking";

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
                path:'/editprofile/:id',
                element:<Signup/>
                
            },
            {
                path:'/login',
                element:<Login/>
                
            },
            {
                path:'/about',
                element:<AboutPage/>
                
            },
            {
                path:'/services',
                element:<Services/>
                
            },
            {
                path:'/rent',
                element:<CarCategories/>
                
            }


        ]

    },
    {
        path:'admin',
        element:<AdminAuth> <AdminLayout/> </AdminAuth>,
        children:[
        {
            path:"userlist",
            element:<UserList/>
        },
        {
            path:"home",
            element:<HomePage/>
        },
        {
            path:"addcar",
            element:<CarForm/>
        },
        {
            path:"edit/:id",
            element:<CarForm/>
        },
        {
            path:"carlist",
            element:<AdminCarList/>
        },
        {
            path:"bookings",
            element:<AdminUserBookings/>
        },
        {
            path:"reviews",
            element:<UsersReviews/>
        },
        {
            path:"payments",
            element:<UsersPayments/>
        },
        {
            path:"createuser",
            element:<AdminCreateUser/>
        },
        {
            path:"contacts",
            element:<UsersMessages/>
        },
        
    ]

    },
    {
        path:"user",
        element: <UserAuth><UserLayout/></UserAuth> ,
        children:[
            {
                path:'home',
                element:<UserHomePage/>
                
            },
            {
                path:'profile',
                element:<UserProfile/>
                
            },
            {
                path:'about',
                element:<AboutPage/>
                
            },
            {
                path:'rent',
                element:<CarCategories/>
                
            },
            {
                path:'cardetails/:id',
                element:<Cardetails/>
                
            },
            {
                path:"contact",
                element:<ContactUs/>

            },
            {
                path:"booking/:id",
                element:<BookingDetails/>

            },
            {
                path:"bookings",
                element:<MyBookings/>

            },
            {
                path:"payment/success",
                element:<PaymentSucces/>

            },
            {
                path:"payment/cancel",
                element:<PaymentCancell/>

            },
            {
                path:"services",
                element:<Services/>

            },
            {
                path:"bookingcancel",
                element:<CancelBooking/>

            }

        ]
    }


])