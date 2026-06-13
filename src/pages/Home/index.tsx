import { Link } from 'react-router-dom';
import heroImage from '../../assets/hero.png';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { formatCurrency } from '../../utils/currency';

export function HomePage() {
  const { products, featuredProducts, loading, error, reloadProducts } = useProducts();
  const { addToCart } = useCart();

  return (
    <div className='page'>
      <section className='hero'>
        <div className='hero__content'>
          <span className='eyebrow'>Entrega em todo o Brasil</span>
          <h1 className='hero__title'>Seu pet merece uma loja online bonita e completa.</h1>
          <p className='hero__text'>
            Produtos selecionados para rotina, nutricao e diversao com compra simples
            e entrega rapida.
          </p>
          <div className='hero__actions'>
            <a href='#catalogo' className='button button--primary'>
              Ver catalogo
            </a>
            <Link to='/carrinho' className='button button--ghost'>
              Ir para o carrinho
            </Link>
          </div>
        </div>
        <div className='hero__media'>
          <img src={heroImage} alt='Cachorro usando bandana colorida' />
        </div>
      </section>

      <section className='highlights'>
        <article className='highlight-card'>
          <strong>{products.length} produtos</strong>
          <span>Catalogo conectado ao backend `json-server`.</span>
        </article>
        <article className='highlight-card'>
          <strong>Frete gratis</strong>
          <span>Compras acima de R$ 299 com envio promocional.</span>
        </article>
        <article className='highlight-card'>
          <strong>Checkout rapido</strong>
          <span>Carrinho persistente para demonstrar experiencia real.</span>
        </article>
      </section>

      <section className='catalog-section' id='catalogo'>
        <div className='section-heading'>
          <div>
            <span className='eyebrow'>Destaques</span>
            <h2>Vitrine principal</h2>
          </div>
          {error ? (
            <button type='button' className='button button--ghost' onClick={() => void reloadProducts()}>
              Tentar novamente
            </button>
          ) : null}
        </div>

        {loading ? <p className='status-card'>Carregando produtos...</p> : null}
        {error ? <p className='status-card status-card--error'>{error}</p> : null}

        {!loading && !error ? (
          <div className='product-grid'>
            {featuredProducts.map((product) => (
              <article key={product.id} className='product-card'>
                <img src={product.image} alt={product.name} className='product-card__image' />
                <span className='product-card__category'>{product.category}</span>
                <h3>{product.name}</h3>
                <strong>{formatCurrency(product.price)}</strong>
                <div className='product-card__actions'>
                  <Link to={`/produto/${product.id}`} className='button button--ghost'>
                    Ver detalhes
                  </Link>
                  <button
                    type='button'
                    className='button button--primary'
                    onClick={() => addToCart(product)}
                  >
                    Adicionar
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
