

const products = [
  {
    id: 1,
    title: 'Borsa Venezia',
    images: ['assets/prod1.jpg', 'assets/prod1-2.jpg', 'assets/prod1-3.jpg'],
    oldPrice: 299,
    price: 249,
    description: 'Elegante borsa in pelle italiana, finiture oro.'
  },
  {
    id: 2,
    title: 'Borsa Venezia',
    images: ['assets/prod2.jpg', 'assets/prod2-2.jpg', 'assets/prod2-3.jpg'],
    oldPrice: 299,
    price: 249,
    description: 'Elegante borsa in pelle italiana, finiture oro.',
    badge: 'Bestseller'
  },
  {
    id: 3,
    title: 'Borsa Venezia',
    images: ['assets/prod3.jpg', 'assets/prod3-2.jpg', 'assets/prod3-3.jpg'],
    oldPrice: 299,
    price: 249,
    description: 'Elegante borsa in pelle italiana, finiture oro.'
  },
  {
    id: 4,
    title: 'Borsa Venezia',
    images: ['assets/prod4.jpg', 'assets/prod4-2.jpg', 'assets/prod4-3.jpg'],
    oldPrice: 299,
    price: 249,
    description: 'Elegante borsa in pelle italiana, finiture oro.'
  },
  {
    id: 5,
    title: 'Borsa Venezia',
    images: ['assets/prod5.jpg', 'assets/prod5-2.jpg', 'assets/prod5-3.jpg'],
    oldPrice: 299,
    price: 249,
    description: 'Elegante borsa in pelle italiana, finiture oro.'
  },
  {
    id: 6,
    title: 'Borsa Venezia',
    images: ['assets/prod6.jpg', 'assets/prod6-2.jpg', 'assets/prod6-3.jpg'],
    oldPrice: 299,
    price: 249,
    description: 'Elegante borsa in pelle italiana, finiture oro.'
  }
];

// 2. Selettori DOM
const grid       = document.querySelector('.products__grid');
const modal      = document.getElementById('product-modal');
const modalImg   = modal.querySelector('.carousel__img');
const titleEl    = modal.querySelector('.modal__title');
const oldPriceEl = modal.querySelector('.modal__prices .old');
const priceEl    = modal.querySelector('.modal__prices .price');
const descEl     = modal.querySelector('.modal__shortdesc');
const prevBtn    = modal.querySelector('.carousel__btn.prev');
const nextBtn    = modal.querySelector('.carousel__btn.next');
const closeBtn   = modal.querySelector('.modal__close');

let currentImages = [];
let currentIndex  = 0;

// 3. Funzione per aggiornare l’immagine del carosello
function updateCarousel() {
  modalImg.src = currentImages[currentIndex];
}

// 4. Generazione dinamica delle card
grid.innerHTML = '';  // svuota la griglia

products.forEach(p => {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.id = p.id;

  const badgeHtml = p.badge
    ? `<div class="product-card__badge">${p.badge}</div>`
    : '';

  card.innerHTML = `
    ${badgeHtml}
    <img src="${p.images[0]}" alt="${p.title}" class="product-card__img"/>
    <div class="product-card__info">
      <div class="product-card__prices">
        ${p.oldPrice ? `<span class="price old">€${p.oldPrice}</span>` : ''}
        <span class="price">€${p.price}</span>
      </div>
    </div>
  `;

  // click sulla card → apre il modal con carosello
  card.addEventListener('click', () => {
    currentImages = p.images;
    currentIndex  = 0;
    updateCarousel();

    titleEl.textContent = p.title;
    if (p.oldPrice) {
      oldPriceEl.textContent = `€${p.oldPrice}`;
      oldPriceEl.style.display = 'inline';
    } else {
      oldPriceEl.style.display = 'none';
    }
    priceEl.textContent       = `€${p.price}`;
    descEl.textContent        = p.description;

    modal.classList.add('active');
  });

  grid.appendChild(card);
});

// 5. Navigazione carosello
prevBtn.addEventListener('click', e => {
  e.stopPropagation();
  if (!currentImages.length) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateCarousel();
});
nextBtn.addEventListener('click', e => {
  e.stopPropagation();
  if (!currentImages.length) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateCarousel();
});

// 6. Chiusura del modal
closeBtn.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('active');
});
