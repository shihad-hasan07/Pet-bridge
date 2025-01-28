import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import MainOutline from "../Layout/MainOutline";
import Dashboard from "../Layout/Dashboard";
import Errorpage from "../pages/Errorpage";
import DonationCampaign from "../pages/Donation-campaign/DonationCampaign";
import PetListing from "../pages/pet-listing/PetListing";
import Login from "../pages/login/Login";
import Signup from "../pages/SIgnup/Signup";
import PetDetails from "../components/PetDetails";
import Dash_AoptionRequest from "../pages/Dashboard/Dash_AoptionRequest";
import Dash_Addpet from "../pages/Dashboard/Dash_Addpet";
import Dash_MyAddedPet from "../pages/Dashboard/Dash_MyAddedPet";
import Dash_CreateDonation from "../pages/Dashboard/Dash_CreateDonation";
import Dash_MyDonationCampaign from "../pages/Dashboard/Dash_MyDonationCampaign";
import Dash_MyDonation from "../pages/Dashboard/Dash_MyDonation";
import PrivateRoute from "./PrivateRoute";
import Admin_all_users from "../pages/Dashboard/Admin_all_users";
import Admin_All_Pets from "../pages/Dashboard/Admin_All_Pets";
import Admin_All_Donations from "../pages/Dashboard/Admin_All_Donations";

const allroutes = createBrowserRouter([
    {
        path: '/',
        element: <MainOutline></MainOutline>,
        errorElement: <Errorpage></Errorpage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/pet-listing',
                element: <PetListing></PetListing>
            },
            {
                path: `/pet/details/:id`,
                element: <PetDetails></PetDetails>
            },
            {
                path: '/donation-campaigns',
                element: <DonationCampaign></DonationCampaign>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    },

    //  dashboard
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <Dashboard></Dashboard></PrivateRoute>,
        errorElement: <Errorpage></Errorpage>,
        children: [

            // dashboard only for --> admin 
            {
                path: '/dashboard/admin/all-users',
                element: <Admin_all_users></Admin_all_users>
            },
            {
                path: '/dashboard/admin/all-pets',
                element: <Admin_All_Pets></Admin_All_Pets>
            },
            {
                path: '/dashboard/admin/all-donations',
                element: <Admin_All_Donations></Admin_All_Donations>
            },

            // dashboard for --> user and admin both 
            {
                path: '/dashboard/addPet',
                element: <PrivateRoute>
                    <Dash_Addpet></Dash_Addpet></PrivateRoute>
            },
            {
                path: '/dashboard/my-added-pets',
                element: <PrivateRoute>
                    <Dash_MyAddedPet></Dash_MyAddedPet></PrivateRoute>
            },
            {
                path: '/dashboard/adoption-request',
                element: <PrivateRoute>
                    <Dash_AoptionRequest></Dash_AoptionRequest></PrivateRoute>
            },
            {
                path: '/dashboard/create-donation-campaign',
                element: <PrivateRoute>
                    <Dash_CreateDonation></Dash_CreateDonation></PrivateRoute>
            },
            {
                path: '/dashboard/my-donation-campaign',
                element: <PrivateRoute>
                    <Dash_MyDonationCampaign></Dash_MyDonationCampaign></PrivateRoute>
            },
            {
                path: '/dashboard/my-donation',
                element: <PrivateRoute>
                    <Dash_MyDonation></Dash_MyDonation></PrivateRoute>
            }
        ]
    }
])

export default allroutes