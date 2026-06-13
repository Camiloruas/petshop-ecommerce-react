import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/currency';

export function CartPage() {
  const { items, subtotal, shipping, total, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className='page'>
        <section className='empty-state'>
          <h1>Seu carrinho esta vazio.</h1>
          <p>Adicione alguns produtos para demonstrar o fluxo completo da loja.</p>
          <Link to='/' className='button button--primary'>
            Voltar para a loja
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className='page page--split'>
      <section className='cart-list'>
        <h1>Carrinho</h1>
        {items.map((item) => (
          <article key={item.product.id} className='cart-item'>
            <img src={item.product.image} alt={item.product.name} className='cart-item__image' />
            <div className='cart-item__content'>
              <h2>{item.product.name}</h2>
              <p>{item.product.category}</p>
              <strong>{formatCurrency(item.product.price)}</strong>
            </div>
            <div className='cart-item__controls'>
              <label className='quantity-control'>
                <span>Qtd.</span>
                <input
                  type='number'
                  min='1'
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.product.id, Number(event.target.value))
                  }
                />
              </label>
              <button
                type='button'
                className='button button--ghost'
                onClick={() => removeFromCart(item.product.id)}
              >
                Remover
              </button>
            </div>
          </article>
        ))}
      </section>

      <aside className='summary-card'>
        <h2>Resumo</h2>
        <div className='summary-row'>
          <span>Subtotal</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
        <div className='summary-row'>
          <span>Frete</span>
          <strong>{shipping === 0 ? 'Gratis' : formatCurrency(shipping)}</strong>
        </div>
        <div className='summary-row summary-row--total'>
          <span>Total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
        <Link to='/checkout' className='button button--primary button--full'>
          Ir para checkout
        </Link>
      </aside>
    </div>
  );
}
