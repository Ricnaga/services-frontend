import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ProviderRouter } from './application/routes';
import { Topbar } from './shared/components/Topbar';

export function App() {
  return (
    <ProviderRouter>
      <Topbar />
    </ProviderRouter>
  );
}
