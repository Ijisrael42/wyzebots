import { useLocation } from 'react-router-dom';
import { DrawerContextProvider } from "../contexts/drawer-context";
import { styled } from '@material-ui/core/styles';
import BackBtnNavBar from "./BackBtnNavBar";

const DashboardLayoutRoot = styled('div')(
    (props:any) => ({
      backgroundColor: props.theme.palette.background.default,
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%'
    })
  );
  
  const DashboardLayoutWrapper = styled('div')(
    (props:any) => ({
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64,
      [props.theme.breakpoints.up('lg')]: {
        // paddingLeft: 256
      }
    })
  );
  
  const DashboardLayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  });
  
  const DashboardLayoutContent = styled('div')({
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  });
  
const BackBtnLayout: React.FC<any> = ({Component}) => {

  const location = useLocation();
  const str = location.pathname.split("/")[1];
  const name = str[0].toUpperCase() + str.slice(1, str.length - 1);

    return (
        <DrawerContextProvider>
            <DashboardLayoutRoot>
                <BackBtnNavBar bannerName={name} />

                <DashboardLayoutWrapper>
                    <DashboardLayoutContainer>
                        <DashboardLayoutContent>
                          <Component />
                        </DashboardLayoutContent>
                    </DashboardLayoutContainer>
                </DashboardLayoutWrapper>
            </DashboardLayoutRoot>
        </DrawerContextProvider>
    );
}

export default BackBtnLayout;