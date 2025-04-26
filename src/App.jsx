import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/order" element={<OrderPage />} />
    </Routes>
  );
}

export default App;
