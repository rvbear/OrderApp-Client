import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import CartPage from "./pages/CartPage";
import OrderOptionPage from "./pages/OrderOptionPage";
import OrderCompletePage from "./pages/OrderCompletePage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order/option" element={<OrderOptionPage />} />
        <Route path="/order/complete" element={<OrderCompletePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
