export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='site-footer'>
      <div className='site-footer__content'>
        <strong className='site-footer__brand'>PetShop Ecommerce</strong>
        <span className='site-footer__text'>
          Cuidado, carinho e praticidade para o seu pet todos os dias.
        </span>
        <span className='site-footer__text'>Portfolio {currentYear}</span>
      </div>
    </footer>
  );
}
