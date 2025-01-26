import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import MainOutline from "../Layout/MainOutline";
import Dashboard from "../Layout/Dashboard";
import Errorpage from "../pages/Errorpage";
import DonationCampaign from "../pages/Donation-campaign/DonationCampaign";
import PetListing from "../pages/pet-listing/PetListing";

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
                path:'/pet-listing',
                element:<PetListing></PetListing>
            },
            {
                path:'/donation-campaigns',
                element:<DonationCampaign></DonationCampaign>
            }
        ]
    },

    // user dashboard
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
    }
])

export default allroutes