import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/currency';

export function CheckoutPage() {
  const { items, subtotal, shipping, total, clearCart } = useCart();

  return (
    <div className='page page--split'>
      <section className='checkout-card'>
        <span className='eyebrow'>Checkout demonstrativo</span>
        <h1>Finalize o pedido do portfolio</h1>
        <p>
          Este checkout foi pensado para apresentacao. Ele resume o pedido e permite
          limpar o carrinho apos a simulacao de compra.
        </p>

        <form className='checkout-form'>
          <input type='text' placeholder='Nome completo' />
          <input type='email' placeholder='E-mail' />
          <input type='text' placeholder='Endereco de entrega' />
          <input type='text' placeholder='Numero do cartao' />
          <button type='button' className='button button--primary' onClick={clearCart}>
            Simular pagamento
          </button>
        </form>

        <Link to='/' className='button button--ghost'>
          Continuar comprando
        </Link>
      </section>

      <aside className='summary-card'>
        <h2>Pedido</h2>
        {items.map((item) => (
          <div key={item.product.id} className='summary-row'>
            <span>
              {item.quantity}x {item.product.name}
            </span>
            <strong>{formatCurrency(item.product.price * item.quantity)}</strong>
          </div>
        ))}
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
      </aside>
    </div>
  );
}
