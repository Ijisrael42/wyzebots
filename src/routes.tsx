import MainLayout from "./components/layout/mainlayout/MainLayout";
import BackBtnLayout from "./components/layout/backbtnlayout/BackBtnLayout";
import { WyzebotList, SquadList, TribeList } from "./pages/sidemenu";
import { Wyzebot, Squad, Tribe } from "./pages/backbutton";
import { Navigate  } from "react-router";

const routes = [ 
    {   
        path: '/', element: <MainLayout />, 
        children: [ 
            { path: '/', element: <Navigate to="wyzebots" /> },
            { path: '*', element: <Navigate to="wyzebots" /> },
            { path: 'wyzebots', element: <WyzebotList/> },
            { path: 'squads', element: <SquadList/> },
            { path: 'tribes', element: <TribeList/> },
        ] 
    },
    {   
        path: '/', element: <BackBtnLayout />, 
        children: [ 
            { path: 'wyzebots/:id', element: <Wyzebot/> },
            { path: 'squads/:id', element: <Squad /> },
            { path: 'tribes/:id', element: <Tribe /> },
        ]
    }
];

export default routes;
