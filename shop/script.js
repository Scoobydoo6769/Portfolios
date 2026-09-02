/* =========================================================
   LUMINA STORE — script.js
   Full interactive shopping experience
   ========================================================= */

'use strict';

/* -------------------------------------------------------
   PRODUCT DATA
   ------------------------------------------------------- */
const PRODUCTS = [
  {
    id: 1,
    name: 'Lumina ProPhone X',
    category: 'phones',
    categoryLabel: 'Smartphone',
    price: 1099,
    originalPrice: 1299,
    image: 'assets/images/hero_phone.jpg',
    badge: 'new',
    badgeLabel: 'New',
    rating: 4.9,
    reviews: 1247,
    description: 'Redefining what a smartphone can be. Titanium build, pro-grade camera system, and all-day battery.',
    specs: { Display: '6.7" Super OLED', Chip: 'Lumina A3 Ultra', Camera: '108MP + 4K Video', Battery: '4800mAh', Storage: '256GB / 512GB' },
  },
  {
    id: 2,
    name: 'Lumina MacBook Air',
    category: 'laptops',
    categoryLabel: 'Laptop',
    price: 1499,
    originalPrice: null,
    image: 'assets/images/laptop.jpg',
    badge: 'bestseller',
    badgeLabel: 'Bestseller',
    rating: 4.8,
    reviews: 3421,
    description: 'Impossibly thin. Unbelievably powerful. The perfect laptop for work, creativity, and everything in between.',
    specs: { Display: '15.3" Liquid Retina', Chip: 'M4 Pro (12-core)', RAM: '24GB Unified', Storage: '1TB SSD', Battery: '22 hours' },
  },
  {
    id: 3,
    name: 'ProTab Ultra 13',
    category: 'tablets',
    categoryLabel: 'Tablet',
    price: 899,
    originalPrice: 1049,
    image: 'assets/images/tablet.jpg',
    badge: 'sale',
    badgeLabel: 'Sale',
    rating: 4.7,
    reviews: 892,
    description: 'Your canvas, your stage, your workstation. The most advanced tablet display ever made.',
    specs: { Display: '13" Ultra XDR', Chip: 'Lumina M3', RAM: '16GB', Storage: '256GB', Connectivity: 'Wi-Fi 7 + 5G' },
  },
  {
    id: 4,
    name: 'SoundSphere Pro',
    category: 'audio',
    categoryLabel: 'Earbuds',
    price: 279,
    originalPrice: 349,
    image: 'assets/images/earbuds.jpg',
    badge: 'hot',
    badgeLabel: 'Hot',
    rating: 4.9,
    reviews: 5600,
    description: 'Industry-leading Active Noise Cancellation. Studio-quality sound in a feather-light design.',
    specs: { Driver: '11mm Dynamic', ANC: 'Adaptive H2', Battery: '9h + 36h case', Codec: 'LDAC / AAC', IPX: 'IPX4 Rated' },
  },
  {
    id: 5,
    name: 'Lumina Watch Ultra',
    category: 'wearables',
    categoryLabel: 'Smartwatch',
    price: 599,
    originalPrice: null,
    image: 'assets/images/watch.jpg',
    badge: 'new',
    badgeLabel: 'New',
    rating: 4.8,
    reviews: 2103,
    description: 'The most rugged, capable, and adventurous smartwatch ever. Titanium case, sapphire crystal.',
    specs: { Case: '49mm Titanium', Display: 'Always-on OLED', GPS: 'Dual-frequency', Battery: '72 hours', Depth: '100m Waterproof' },
  },
  {
    id: 6,
    name: 'Lumina MacBook Pro 16"',
    category: 'laptops',
    categoryLabel: 'Laptop',
    price: 2499,
    originalPrice: null,
    image: 'assets/images/laptop.jpg',
    badge: null,
    rating: 5.0,
    reviews: 4120,
    description: 'The ultimate pro laptop. M4 Max chip with 16-core GPU and up to 128GB unified memory.',
    specs: { Display: '16.2" Liquid XDR', Chip: 'M4 Max (16-core)', RAM: '64GB Unified', Storage: '2TB SSD', Battery: '22 hours' },
  },
  {
    id: 7,
    name: 'MagLink Charger Trio',
    category: 'wearables',
    categoryLabel: 'Accessories',
    price: 139,
    originalPrice: 179,
    image: 'assets/images/watch.jpg',
    badge: 'sale',
    badgeLabel: 'Sale',
    rating: 4.6,
    reviews: 780,
    description: 'Charge your phone, watch, and earbuds simultaneously. MagSafe-compatible, ultra-slim design.',
    specs: { Output: '30W Total', Compatibility: 'Universal Qi2', Ports: 'USB-C x2', Material: 'Aluminum + Glass', Certification: 'MFi Certified' },
  },
  {
    id: 8,
    name: 'SoundSphere Over-Ear',
    category: 'audio',
    categoryLabel: 'Headphones',
    price: 449,
    originalPrice: 549,
    image: 'assets/images/earbuds.jpg',
    badge: 'hot',
    badgeLabel: 'Hot',
    rating: 4.9,
    reviews: 3289,
    description: 'Reference-grade over-ear headphones with 40mm planar magnetic drivers and premium leather earcups.',
    specs: { Driver: '40mm Planar Mag', ANC: 'Hybrid 4-mic', Battery: '40 hours', Codec: 'LDAC + aptX Lossless', Weight: '250g' },
  },
];

/* -------------------------------------------------------
   STATE
   ------------------------------------------------------- */
const state = {
  cart: JSON.parse(localStorage.getItem('lumina_cart') || '[]'),
  currentCategory: 'all',
  visibleCount: 4,
  searchQuery: '',
};

/* -------------------------------------------------------
   DOM REFERENCES
   ------------------------------------------------------- */
const dom = {
  navbar: document.getElementById('navbar'),
  searchBtn: document.getElementById('search-btn'),
  searchOverlay: document.getElementById('search-overlay'),
  searchInput: document.getElementById('search-input'),
  searchClose: document.getElementById('search-close'),
  cartBtn: document.getElementById('cart-btn'),
  cartCount: document.getElementById('cart-count'),
  cartDrawer: document.getElementById('cart-drawer'),
  cartOverlay: document.getElementById('cart-overlay'),
  cartClose: document.getElementById('cart-close'),
  cartItems: document.getElementById('cart-items'),
  cartTotal: document.getElementById('cart-total'),
  checkoutBtn: document.getElementById('checkout-btn'),
  continueBtn: document.getElementById('continue-shopping-btn'),
  productsGrid: document.getElementById('products-grid'),
  loadMoreBtn: document.getElementById('load-more-btn'),
  catPills: document.querySelectorAll('.cat-pill'),
  hamburger: document.getElementById('hamburger'),
  navLinks: document.getElementById('nav-links'),
  toast: document.getElementById('toast'),
  modalOverlay: document.getElementById('modal-overlay'),
  productModal: document.getElementById('product-modal'),
  modalClose: document.getElementById('modal-close'),
  modalContent: document.getElementById('modal-content'),
  newsletterForm: document.getElementById('newsletter-form'),
};

/* -------------------------------------------------------
   UTILITY
   ------------------------------------------------------- */
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

function formatPrice(n) {
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(n);
}

function stars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function saveCart() {
  localStorage.setItem('lumina_cart', JSON.stringify(state.cart));
}

let toastTimer;
function showToast(msg, type = 'success') {
  dom.toast.textContent = msg;
  dom.toast.className = `toast ${type} show`;
  dom.toast.setAttribute('aria-hidden', 'false');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    dom.toast.className = 'toast';
    dom.toast.setAttribute('aria-hidden', 'true');
  }, 2800);
}

/* -------------------------------------------------------
   NAVBAR SCROLL
   ------------------------------------------------------- */
function onScroll() {
  dom.navbar.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', onScroll, { passive: true });

/* -------------------------------------------------------
   HAMBURGER (mobile nav)
   ------------------------------------------------------- */
dom.hamburger.addEventListener('click', () => {
  const open = dom.navLinks.classList.toggle('mobile-open');
  dom.hamburger.classList.toggle('open', open);
  dom.hamburger.setAttribute('aria-expanded', open);
});

/* Close mobile nav on link click */
dom.navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    dom.navLinks.classList.remove('mobile-open');
    dom.hamburger.classList.remove('open');
    dom.hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* -------------------------------------------------------
   SEARCH
   ------------------------------------------------------- */
dom.searchBtn.addEventListener('click', () => {
  dom.searchOverlay.classList.add('open');
  dom.searchOverlay.setAttribute('aria-hidden', 'false');
  dom.searchInput.focus();
});

function closeSearch() {
  dom.searchOverlay.classList.remove('open');
  dom.searchOverlay.setAttribute('aria-hidden', 'true');
  dom.searchInput.value = '';
  state.searchQuery = '';
  renderProducts();
}
dom.searchClose.addEventListener('click', closeSearch);

dom.searchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value.toLowerCase().trim();
  state.visibleCount = 8;
  renderProducts();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSearch();
    closeCart();
    closeModal();
  }
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    dom.searchBtn.click();
  }
});

/* -------------------------------------------------------
   CART
   ------------------------------------------------------- */
function openCart() {
  dom.cartDrawer.classList.add('open');
  dom.cartOverlay.classList.add('open');
  dom.cartDrawer.setAttribute('aria-hidden', 'false');
  dom.cartOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  dom.cartDrawer.classList.remove('open');
  dom.cartOverlay.classList.remove('open');
  dom.cartDrawer.setAttribute('aria-hidden', 'true');
  dom.cartOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

dom.cartBtn.addEventListener('click', openCart);
dom.cartClose.addEventListener('click', closeCart);
dom.cartOverlay.addEventListener('click', closeCart);
dom.continueBtn.addEventListener('click', closeCart);

dom.checkoutBtn.addEventListener('click', () => {
  if (state.cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }
  showToast('Redirecting to secure checkout…', 'success');
  setTimeout(() => {
    state.cart = [];
    saveCart();
    renderCart();
    closeCart();
  }, 1600);
});

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }
  saveCart();
  renderCart();
  showToast(`✓ ${product.name} added to cart`);

  // Animate cart icon
  dom.cartBtn.style.transform = 'scale(1.25)';
  setTimeout(() => (dom.cartBtn.style.transform = ''), 250);
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  renderCart();
}

function updateQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  renderCart();
}

function renderCart() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  dom.cartCount.textContent = count;
  dom.cartCount.classList.toggle('visible', count > 0);
  dom.cartCount.setAttribute('aria-label', `${count} items in cart`);

  if (state.cart.length === 0) {
    dom.cartItems.innerHTML = `
      <div class="cart-empty">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span>Your cart is empty</span>
        <p style="font-size:12px;color:var(--text-muted)">Add some products and come back here</p>
      </div>`;
    dom.cartTotal.textContent = '฿0';
    return;
  }

  const total = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  dom.cartTotal.textContent = formatPrice(total);

  dom.cartItems.innerHTML = state.cart.map(item => `
    <div class="cart-item" role="listitem">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-controls">
          <button class="qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
          <span class="qty-value" aria-label="Quantity: ${item.qty}">${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-delta="1" aria-label="Increase quantity">+</button>
          <button class="cart-item-remove" data-remove="${item.id}" aria-label="Remove ${item.name} from cart">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  dom.cartItems.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => updateQty(+btn.dataset.id, +btn.dataset.delta));
  });
  dom.cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(+btn.dataset.remove));
  });
}

/* -------------------------------------------------------
   PRODUCT MODAL
   ------------------------------------------------------- */
function openModal(productId) {
  const p = PRODUCTS.find(p => p.id === productId);
  if (!p) return;

  dom.modalContent.innerHTML = `
    <div class="modal-img">
      <img src="${p.image}" alt="${p.name}" loading="lazy" />
    </div>
    <div class="modal-details">
      <div class="modal-cat">${p.categoryLabel}</div>
      <h2 class="modal-name">${p.name}</h2>
      <p class="modal-desc">${p.description}</p>
      <div class="modal-price-row">
        <span class="modal-price">${formatPrice(p.price)}</span>
        ${p.originalPrice ? `<span class="modal-original">${formatPrice(p.originalPrice)}</span>` : ''}
      </div>
      <div class="modal-specs">
        ${Object.entries(p.specs).map(([k, v]) => `
          <div class="modal-spec">
            <span class="modal-spec-label">${k}</span>
            <span class="modal-spec-val">${v}</span>
          </div>
        `).join('')}
      </div>
      <div class="modal-actions">
        <button class="btn btn-primary" id="modal-add-cart" data-id="${p.id}">Add to Cart</button>
        <button class="btn btn-ghost">Save to Wishlist</button>
      </div>
    </div>
  `;

  dom.productModal.classList.add('open');
  dom.modalOverlay.classList.add('open');
  dom.productModal.setAttribute('aria-hidden', 'false');
  dom.modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  $('#modal-add-cart').addEventListener('click', (e) => {
    addToCart(+e.target.dataset.id);
    closeModal();
  });
}

function closeModal() {
  dom.productModal.classList.remove('open');
  dom.modalOverlay.classList.remove('open');
  dom.productModal.setAttribute('aria-hidden', 'true');
  dom.modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
dom.modalClose.addEventListener('click', closeModal);
dom.modalOverlay.addEventListener('click', closeModal);

/* -------------------------------------------------------
   PRODUCTS RENDER
   ------------------------------------------------------- */
function filteredProducts() {
  let list = PRODUCTS;
  if (state.currentCategory !== 'all') {
    list = list.filter(p => p.category === state.currentCategory);
  }
  if (state.searchQuery) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(state.searchQuery) ||
      p.categoryLabel.toLowerCase().includes(state.searchQuery) ||
      p.description.toLowerCase().includes(state.searchQuery)
    );
  }
  return list;
}

function renderProducts() {
  const products = filteredProducts();
  const visible = products.slice(0, state.visibleCount);

  if (visible.length === 0) {
    dom.productsGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:80px 0;color:var(--text-muted);">
        <div style="font-size:48px;margin-bottom:12px">🔍</div>
        <p style="font-size:16px;font-weight:600;color:var(--text-secondary)">No products found</p>
        <p style="font-size:13px">Try a different search or category</p>
      </div>`;
    dom.loadMoreBtn.style.display = 'none';
    return;
  }

  dom.productsGrid.innerHTML = visible.map((p, i) => `
    <article
      class="product-card fade-up"
      role="listitem"
      id="product-card-${p.id}"
      data-product-id="${p.id}"
      style="animation-delay:${(i % 4) * 80}ms"
      tabindex="0"
      aria-label="${p.name}, ${formatPrice(p.price)}"
    >
      ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badgeLabel}</span>` : ''}
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="product-quick-actions">
          <button class="quick-view-btn" data-id="${p.id}" aria-label="Quick view ${p.name}">Quick View</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.categoryLabel}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-description">${p.description}</p>
        <div class="product-rating">
          <span class="stars" aria-hidden="true">${stars(p.rating)}</span>
          <span class="rating-count">${p.rating} (${p.reviews.toLocaleString()})</span>
        </div>
        <div class="product-bottom">
          <div class="product-prices">
            <span class="product-price">${formatPrice(p.price)}</span>
            ${p.originalPrice ? `<span class="product-original-price">${formatPrice(p.originalPrice)}</span>` : ''}
          </div>
          <button class="add-to-cart-btn" data-id="${p.id}" aria-label="Add ${p.name} to cart" title="Add to cart">+</button>
        </div>
      </div>
    </article>
  `).join('');

  /* Bind events */
  dom.productsGrid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(+btn.dataset.id);
    });
  });
  dom.productsGrid.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(+btn.dataset.id);
    });
  });
  dom.productsGrid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openModal(+card.dataset.productId));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openModal(+card.dataset.productId);
    });
  });

  /* Load more button */
  const hasMore = products.length > state.visibleCount;
  dom.loadMoreBtn.style.display = hasMore ? '' : 'none';

  /* Intersection Observer for fade-up */
  observeFadeUps();
}

/* -------------------------------------------------------
   CATEGORY FILTER
   ------------------------------------------------------- */
dom.catPills.forEach(pill => {
  pill.addEventListener('click', () => {
    state.currentCategory = pill.dataset.category;
    state.visibleCount = 4;

    dom.catPills.forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-pressed', 'false');
    });
    pill.classList.add('active');
    pill.setAttribute('aria-pressed', 'true');

    renderProducts();

    document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* -------------------------------------------------------
   LOAD MORE
   ------------------------------------------------------- */
dom.loadMoreBtn.addEventListener('click', () => {
  state.visibleCount += 4;
  renderProducts();
});

/* -------------------------------------------------------
   NEWSLETTER
   ------------------------------------------------------- */
dom.newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value.trim();
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }
  showToast(`✓ You're subscribed! Welcome to Lumina.`, 'success');
  dom.newsletterForm.reset();
});

/* -------------------------------------------------------
   INTERSECTION OBSERVER — scroll animations
   ------------------------------------------------------- */
function observeFadeUps() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  $$('.fade-up').forEach(el => observer.observe(el));
}

/* Also apply fade-up to section headers and other static elements */
function initFadeUps() {
  const targets = $$('.section-header, .feature-item, .testimonial-card, .newsletter-inner');
  targets.forEach(el => el.classList.add('fade-up'));
  observeFadeUps();
}

/* -------------------------------------------------------
   SMOOTH SCROLL for anchor links
   ------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* -------------------------------------------------------
   INIT
   ------------------------------------------------------- */
function init() {
  renderCart();
  state.visibleCount = 8;
  renderProducts();
  initFadeUps();
  onScroll();
}

init();
