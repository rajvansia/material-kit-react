import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import MedicationList from 'src/pages/MedicationList';
import Dashboard from 'src/pages/Dashboard';
import CareTeam from 'src/pages/CareTeam';
import Settings from 'src/pages/Settings';
import Launcher from 'src/Launcher';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'meds', element: <MedicationList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'app/dashboard', element: <Dashboard /> },
      { path: 'careteam', element: <CareTeam /> },
      { path: 'settings', element: <Settings /> },
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
