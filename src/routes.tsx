import MainLayout from "./components/layout/mainlayout/MainLayout";
import BackBtnLayout from "./components/layout/backbtnlayout/BackBtnLayout";
import { WyzebotList, SquadList, TribeList } from "./pages/sidemenu";
import { Wyzebot, Squad, Tribe } from "./pages/backbutton";
import { Switch, Redirect, Route  } from "react-router";

const routers = [
    { path: "/wyzebots", element: WyzebotList,  layout: MainLayout },
    { path: "/squads", element: SquadList,  layout: MainLayout },
    { path: "/tribes", element: TribeList,  layout: MainLayout },
    { path: "/wyzebots/:id", element: Wyzebot,  layout: BackBtnLayout },
    { path: "/squads/:id", element: Squad,  layout: BackBtnLayout },
    { path: "/tribes/:id", element: Tribe,  layout: BackBtnLayout },
];
    
function Routes() {
    
    return(
    <Switch>
        { routers.map((route:any, key:any ) =>
            <Route key={key} exact path={route.path} 
                render={props => <route.layout {...props} Component={route.element} /> } />
        )}
    </Switch>);
} 

export default Routes;
