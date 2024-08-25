
import { RouterProvider } from 'react-router-dom';
import './App.css';
import Btn from './components/ui/Btn';
import { DarkMode } from './components/ui/DarkMode';
import HomePage from './pages/HomePage';
import { router } from './routes/Routes';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {


 

  return (
    <div >
      
        
        
        <RouterProvider router={router}  />
     
        <ToastContainer />

     



    </div>
  );
}

export default App;
