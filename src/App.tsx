import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Coin from "./pages/coin";

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:coin" element={<Coin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
