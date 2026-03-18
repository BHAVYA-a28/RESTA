import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservation from './pages/Reservation'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'

function App() {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <div className="flex flex-col min-h-screen font-body text-gray-800 bg-white">
      <Navbar />
      <BottomNav />
      <CartSidebar />
      <main className="flex-grow pt-16 md:pt-20 pb-36 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      {isContactPage && <Footer />}
    </div>
  )
}

export default App
