import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


/// 
// import {createBrowserRouter,RouterProvider} from 'react-router-dom'
// const router = createBrowserRouter([{
//   path:'/',
//   element:<La/>,
//   errorElement:<div>404 Not Found</div>
//   },
//   {
//     path:'/card',
//     element:<Card/>,
//     children=[
//       {index:true,element:<Home}
//     ]
//   },
//   {
//     path:'/card',
//     element:<Card/>
//   },
//   {
//     path:'/card',
//     element:<Card/>
//   },
//   {
//     path:'/card',
//     element:<Card/>
//   },
//   {
//     path:'/card',
//     element:<Card/>
//   },
// ]);
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: 'dashboard', element: <Dashboard /> },
//       { path: 'knowledge-base', element: <KnowledgeBase /> },
//       { path: 'settings', element: <Settings /> },
//       { path: 'login', element: <Login /> },
//     ],
//   },
//   {
//     path: '/card',
//     element: <Card />,
//   },
//   {
//     path: '/card',
//     element: <Card />,
//   },
//   {
//     path: '/card',
//     element: <Card />,
//   },
//   {
//     path: '/card',
//     element: <Card />,
//   },
// ]);
// createRoot(document.getElementById('root')).render(