import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Authprovider from './authprovider/Authprovider'
import { RouterProvider } from 'react-router-dom'
import allroutes from './Routes/Routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Authprovider>
      <QueryClientProvider client={queryClient}>

        <RouterProvider router={allroutes}></RouterProvider>

      </QueryClientProvider>
    </Authprovider>
    <ToastContainer position="top-center" autoClose={1300} hideProgressBar={false} newestOnTop={false} closeOnClickrtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition:Bounce />
  </StrictMode >,
)
