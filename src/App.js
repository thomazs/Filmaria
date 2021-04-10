import { ToastContainer } from 'react-toastify';
import './App.css';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <div className="app">
      <Routes></Routes>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
