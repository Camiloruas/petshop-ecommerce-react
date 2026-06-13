import { Navigate, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Footer } from './components/Footer';
import { useCart } from './hooks/useCart';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import { HomePage } from './pages/Home';
import { ProductDetailsPage } from './pages/ProductDetails';

export function App() {
  const { itemCount } = useCart();

  return (
    <div className='app-shell'>
      <header className='site-header'>
        <div className='site-header__content'>
          <Link to='/' className='site-header__brand'>
            PetJoy
          </Link>
          <nav className='site-header__nav'>
            <Link to='/' className='site-header__link'>
              Loja
            </Link>
            <Link to='/carrinho' className='site-header__link'>
              Carrinho ({itemCount})
            </Link>
          </nav>
        </div>
      </header>
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
