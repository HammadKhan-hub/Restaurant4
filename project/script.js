/* =========================
   CONFIG
========================= */
const WHATSAPP_NUMBER = '923001234567'; // Replace with your number

/* =========================
   HERO SLIDER
========================= */
(function() {
  const slides = document.querySelectorAll('.hero-slider .slide');
  let current = 0;

  // Show the first slide
  slides[current].classList.add('active');

  // Auto-cycle
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 4000); // 4 seconds
})();

/* =========================
   MOBILE NAV
========================= */
(function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('nav ul');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
})();

/* =========================
   FADE UP ON SCROLL
========================= */
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})();

/* =========================
   CART SYSTEM
========================= */
(function() {
  const cartToggle = document.getElementById('cartToggle');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const closeCartBtn = document.getElementById('closeCart');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const addButtons = document.querySelectorAll('.card .btn');

  let cart = [];

  function renderCart() {
    cartItemsEl.innerHTML = '';
    if(cart.length === 0) {
      cartItemsEl.innerHTML = '<li style="text-align:center; color:#777; padding:1rem;">Your cart is empty</li>';
      cartTotalEl.textContent = '0.00';
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      total += Number(item.price);
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.padding = '0.5rem 0';
      li.textContent = `${item.name} - $${Number(item.price).toFixed(2)}`;
      cartItemsEl.appendChild(li);
    });

    cartTotalEl.textContent = total.toFixed(2);
  }

  // Add to cart
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = btn.dataset.price;
      if(name && price) {
        cart.push({ name, price });
        renderCart();
        cartSidebar.classList.add('open');
      }
    });
  });

  // Toggle sidebar
  cartToggle.addEventListener('click', () => cartSidebar.classList.toggle('open'));
  closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));

  // Checkout
  checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    let total = 0;
    let lines = [];
    cart.forEach((item, index) => {
      total += Number(item.price);
      lines.push(`${index+1}. ${encodeURIComponent(item.name)} - $${Number(item.price).toFixed(2)}`);
    });

    const message = `Hello Double Cheese,%0AI'd like to place an order:%0A${lines.join('%0A')}%0ATotal: $${total.toFixed(2)}%0A%0AName:%0APhone:%0AAddress:`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
  });

  renderCart();
})();
