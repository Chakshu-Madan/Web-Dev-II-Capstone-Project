import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/admin/Dashboard'
import ManageProducts from './pages/admin/ManageProducts'
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Protected */}
        <Route path="/cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />

        {/* Admin Protected */}
        <Route path="/admin/dashboard" element={
          <AdminRoute><Dashboard /></AdminRoute>
        } />
        <Route path="/admin/products" element={
          <AdminRoute><ManageProducts /></AdminRoute>
        } />
      </Routes>
    </BrowserRouter>
      <ChatWidget />
    </>
  );
}

export default App