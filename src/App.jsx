import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Goal from './pages/Goal';
import Reports from './pages/Reports';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>

        <Route index element={<Dashboard />} />
        <Route path="transaction" element={<Transactions />} />
        <Route path="goal" element={<Goal />} />
        <Route path="report" element={<Reports />} />

      </Route>
    </Routes>
  );
}

export default App;