const products = [
  {
    id: 1,
    name: "Brand Strategy",
    category: "Marketing",
    price: 1200,
    rating: 4.8,
    image: "assets/images/cards/brandstrategy.jpg",
    description: "Comprehensive brand positioning and market analysis."
  },
  {
    id: 2,
    name: "UI/UX Design",
    category: "Design",
    price: 2500,
    rating: 4.9,
    image: "assets/images/cards/uiuxdesign.jpg",
    description: "Modern and intuitive user interfaces for web and mobile."
  },
  {
    id: 3,
    name: "Web Development",
    category: "Code",
    price: 3000,
    rating: 5.0,
    image: "assets/images/cards/webdevelopment.webp",
    description: "High-performance websites built with the latest technologies."
  },
  {
    id: 4,
    name: "Logo Design",
    category: "Design",
    price: 800,
    rating: 4.7,
    image: "assets/images/cards/logodesign.jpg",
    description: "Unique and memorable brand identities."
  },
  {
    id: 5,
    name: "Social Media",
    category: "Marketing",
    price: 1500,
    rating: 4.5,
    image: "assets/images/cards/socialmedia.png",
    description: "Strategic content creation and community management."
  },
  {
    id: 6,
    name: "SEO Optimization",
    category: "Marketing",
    price: 1000,
    rating: 4.6,
    image: "assets/images/cards/seooptimization.jpg",
    description: "Improve your search engine rankings and visibility."
  },
  {
    id: 7,
    name: "App Development",
    category: "Code",
    price: 5000,
    rating: 4.9,
    image: "assets/images/cards/appdevelopment.png",
    description: "Custom mobile applications for iOS and Android."
  },
  {
    id: 8,
    name: "Art Direction",
    category: "Design",
    price: 2000,
    rating: 4.8,
    image: "assets/images/cards/artdirection.png",
    description: "Creative leadership for your visual projects."
  },
  {
    id: 9,
    name: "Copywriting",
    category: "Marketing",
    price: 600,
    rating: 4.4,
    image: "assets/images/cards/copywriting.jpg",
    description: "Persuasive and engaging content for your brand."
  },
  {
    id: 10,
    name: "Motion Graphics",
    category: "Design",
    price: 1800,
    rating: 4.7,
    image: "assets/images/cards/motiongraphics.jpg",
    description: "Dynamic animations to bring your brand to life."
  },
  {
    id: 11,
    name: "Cloud Solutions",
    category: "Code",
    price: 4000,
    rating: 4.9,
    image: "assets/images/cards/cloudsolutions.jpg",
    description: "Scalable and secure cloud infrastructure."
  },
  {
    id: 12,
    name: "Email Marketing",
    category: "Marketing",
    price: 900,
    rating: 4.5,
    image: "assets/images/cards/emailmarketing.jpg",
    description: "Targeted email campaigns that drive conversions."
  },
  {
    id: 13,
    name: "Photography",
    category: "Design",
    price: 1300,
    rating: 4.6,
    image: "assets/images/cards/photography.webp",
    description: "Professional photography for products and events."
  },
  {
    id: 14,
    name: "Cybersecurity",
    category: "Code",
    price: 3500,
    rating: 4.8,
    image: "assets/images/cards/cybersecurity.jpg",
    description: "Protect your digital assets from modern threats."
  },
  {
    id: 15,
    name: "Data Analytics",
    category: "Marketing",
    price: 2200,
    rating: 4.7,
    image: "assets/images/cards/dataanalytics.jpg",
    description: "Turn your data into actionable business insights."
  }
];

let currentProducts = [...products];
let activeCategory = 'all';
let searchQuery = '';
let sortCriteria = 'default';

function renderCatalog(items) {
  const container = document.getElementById('catalog-container');
  const noResults = document.getElementById('no-results');
  container.innerHTML = '';

  if (items.length === 0) {
    noResults.style.display = 'block';
  } else {  
    noResults.style.display = 'none';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-card__image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="product-card__content">
          <div class="product-card__category">${item.category}</div>
          <h3 class="product-card__title">${item.name}</h3>
          <p class="product-card__description">${item.description}</p>
          <div class="product-card__footer">
            <span class="product-card__price">$${item.price}</span>
            <span class="product-card__rating">★ ${item.rating}</span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }
}

function applyFilters() {
  let filtered = products.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortCriteria !== 'default') {
    filtered.sort((a, b) => {
      if (sortCriteria === 'price-asc') return a.price - b.price;
      if (sortCriteria === 'price-desc') return b.price - a.price;
      if (sortCriteria === 'name-asc') return a.name.localeCompare(b.name);
      if (sortCriteria === 'rating-desc') return b.rating - a.rating;
      return 0;
    });
  }

  currentProducts = filtered;
  renderCatalog(currentProducts);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog(products);

  // STAGE 3: Search, Sort, Category
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    applyFilters();
  });

  document.getElementById('sort-select').addEventListener('change', (e) => {
    sortCriteria = e.target.value;
    applyFilters();
  });

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.category-btn.active').classList.remove('active');
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      applyFilters();
    });
  });

  // STAGE 2: Array Methods
  document.getElementById('btn-filter').addEventListener('click', () => {
    const filtered = products.filter(p => p.price > 2000);
    renderCatalog(filtered);
  });

  document.getElementById('btn-map').addEventListener('click', () => {
    const mapped = products.map(p => ({...p, name: `PRO: ${p.name}`}));
    renderCatalog(mapped);
  });

  document.getElementById('btn-sort').addEventListener('click', () => {
    const sorted = [...products].sort((a, b) => b.rating - a.rating);
    renderCatalog(sorted);
  });

  document.getElementById('btn-reduce').addEventListener('click', () => {
    const total = products.reduce((sum, p) => sum + p.price, 0);
    alert(`Total Price of all services: $${total}`);
  });

  document.getElementById('btn-slice').addEventListener('click', () => {
    const sliced = products.slice(0, 5);
    renderCatalog(sliced);
  });

  document.getElementById('btn-reverse').addEventListener('click', () => {
    const reversed = [...products].reverse();
    renderCatalog(reversed);
  });

  document.getElementById('btn-find').addEventListener('click', () => {
    const found = products.find(p => p.category === 'Code');
    renderCatalog(found ? [found] : []);
  });

  document.getElementById('btn-every').addEventListener('click', () => {
    const allExpensive = products.every(p => p.price > 500);
    alert(`Are all services > $500? ${allExpensive}`);
  });

  document.getElementById('btn-some').addEventListener('click', () => {
    const hasPerfect = products.some(p => p.rating === 5.0);
    alert(`Is there any 5.0 rated service? ${hasPerfect}`);
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    searchQuery = '';
    activeCategory = 'all';
    sortCriteria = 'default';
    document.getElementById('search-input').value = '';
    document.getElementById('sort-select').value = 'default';
    document.querySelector('.category-btn.active').classList.remove('active');
    document.querySelector('[data-category="all"]').classList.add('active');
    renderCatalog(products);
  });
});
