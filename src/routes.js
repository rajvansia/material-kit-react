import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Medication from 'src/pages/Medication';
import Dashboard from 'src/pages/Dashboard';
import CareTeam from 'src/pages/CareTeam';
import Lab from 'src/pages/Lab';
import Launcher from 'src/Launcher';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'meds', element: <Medication /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'app/dashboard', element: <Dashboard /> },
      { path: 'careteam', element: <CareTeam /> },
      { path: 'labs', element: <Lab /> },
      { path: 'launch', element: <Launcher /> },
      { path: '*', element: <Navigate to="/app/dashboard" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'launch', element: <Launcher /> },
      { path: '/', element: <Navigate to="/launch" /> },
    ]
  }
];

export default routes;
