import MainLayout from "./components/layout/mainlayout/MainLayout";
import BackBtnLayout from "./components/layout/backbtnlayout/BackBtnLayout";
import { DashboardPage, CustomersPage, OrdersPage, InventoryPage, } from "./pages";
import { Dashboard, WyzebotList } from "./pages/sidemenu";
import { Wyzebot } from "./pages/backbutton";
import { Navigate  } from "react-router";

const routes = [ 
    {   
        path: '/', element: <MainLayout />, 
        children: [ 
            { path: '/', element: <Navigate to="wyzebots" /> },
            { path: '*', element: <Navigate to="wyzebots" /> },
            { path: 'wyzebots', element: <WyzebotList/> },
            { path: 'orders', element: <OrdersPage/> },
        ] 
    },
    {   
        path: '/', element: <BackBtnLayout />, 
        children: [ 
            { path: 'wyzebots/:id', element: <Wyzebot/> },
            { path: 'customers', element: <CustomersPage/> },
            { path: 'inventory', element: <InventoryPage/> }
        ]
    }
];

export default routes;
