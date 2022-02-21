import MainLayout from "./components/layout/mainlayout/MainLayout";
import BackBtnLayout from "./components/layout/backbtnlayout/BackBtnLayout";
import { CustomersPage, OrdersPage, InventoryPage, } from "./pages";
import { WyzebotList, SquadList } from "./pages/sidemenu";
import { Wyzebot, Squad } from "./pages/backbutton";
import { Navigate  } from "react-router";

const routes = [ 
    {   
        path: '/', element: <MainLayout />, 
        children: [ 
            { path: '/', element: <Navigate to="wyzebots" /> },
            { path: '*', element: <Navigate to="wyzebots" /> },
            { path: 'wyzebots', element: <WyzebotList/> },
            { path: 'squads', element: <SquadList/> },
            { path: 'orders', element: <OrdersPage/> },
        ] 
    },
    {   
        path: '/', element: <BackBtnLayout />, 
        children: [ 
            { path: 'wyzebots/:id', element: <Wyzebot/> },
            { path: 'squads/:id', element: <Squad /> },
            { path: 'customers', element: <CustomersPage/> },
            { path: 'inventory', element: <InventoryPage/> }
        ]
    }
];

export default routes;
