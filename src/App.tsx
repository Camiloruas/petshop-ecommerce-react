import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import { HomePage } from './pages/Home';
import { ProductDetailsPage } from './pages/ProductDetails';

export function App() {
  return (
    <div className='app-shell'>
      <main className='app-content'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/produto/:id' element={<ProductDetailsPage />} />
          <Route path='/carrinho' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
