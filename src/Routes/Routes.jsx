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

    // user dashboard
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        errorElement:<Errorpage></Errorpage>,
        children:[
            {
                path:'/dashboard/addPet',
                element:<Dash_Addpet></Dash_Addpet>
            },
            {
                path:'/dashboard/my-added-pets',
                element:<Dash_MyAddedPet></Dash_MyAddedPet>
            },
            {
                path:'/dashboard/adoption-request',
                element:<Dash_AoptionRequest></Dash_AoptionRequest> 
            },
            {
                path:'/dashboard/create-donation-campaign',
                element:<Dash_CreateDonation></Dash_CreateDonation>
            },
            {
                path:'/dashboard/my-donation-campaign',
                element:<Dash_MyDonationCampaign></Dash_MyDonationCampaign>
            },
            {
                path:'/dashboard/my-donation',
                element:<Dash_MyDonation></Dash_MyDonation>
            }
        ]
    }
])

export default allroutes