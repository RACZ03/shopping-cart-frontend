import AppRouter from './routes/AppRouter'
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRouter />
    </>
  );
};

export default App;
