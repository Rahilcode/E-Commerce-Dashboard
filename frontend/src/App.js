import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import AddProducts from "./components/AddProducts";
import UpdateProducts from "./components/UpdateProducts";
import Login from "./components/Login";
import PrivateComponent from "./components/PrivateComponent";
import Products from "./components/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Products />} />
            <Route path="/add-products" element={<AddProducts />} />
            <Route path="/update-products/:id" element={<UpdateProducts />} />
            <Route path="/logout" element={<h1>Logout</h1>} />
          </Route>
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
