import MainLayout from "./components/layout/mainlayout/MainLayout";
import BackBtnLayout from "./components/layout/backbtnlayout/BackBtnLayout";
import { DashboardPage, CustomersPage, OrdersPage, InventoryPage, } from "./pages";
import { Dashboard, WyzebotList } from "./pages/sidemenu";
import { Navigate  } from "react-router";

const routes = [ 
    {   
        path: '/', element: <MainLayout />, 
        children: [ 
            { path: '/', element: <Navigate to="wyzebot" /> },
            { path: '*', element: <Navigate to="wyzebot" /> },
            { path: 'wyzebot', element: <WyzebotList/> },
            { path: 'orders', element: <OrdersPage/> },
        ] 
    },
    {   
        path: '/', element: <BackBtnLayout />, 
        children: [ 
            { path: 'customers', element: <CustomersPage/> },
            { path: 'inventory', element: <InventoryPage/> }
        ]
    }
];

export default routes;
