import { Link, Navigate, useParams } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { formatCurrency } from '../../utils/currency';

export function ProductDetailsPage() {
  const { id } = useParams();
  const { loading, getProductById } = useProducts();
  const { addToCart } = useCart();

  if (loading) {
    return <div className='page'><p className='status-card'>Carregando detalhes...</p></div>;
  }

  if (!id) {
    return <Navigate to='/' replace />;
  }

  const product = getProductById(id);

  if (!product) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='page'>
      <div className='breadcrumb'>
        <Link to='/'>Loja</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <section className='details-card'>
        <img src={product.image} alt={product.name} className='details-card__image' />
        <div className='details-card__content'>
          <span className='eyebrow'>{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <strong className='details-card__price'>{formatCurrency(product.price)}</strong>
          <div className='details-card__actions'>
            <button
              type='button'
              className='button button--primary'
              onClick={() => addToCart(product)}
            >
              Adicionar ao carrinho
            </button>
            <Link to='/carrinho' className='button button--ghost'>
              Finalizar compra
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
