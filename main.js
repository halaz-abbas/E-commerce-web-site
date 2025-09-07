const cartBtn = document.getElementById("cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("search-input");
const clearCartBtn = document.getElementById("clear-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
  {
    id: 1,
    title: "T-shirt",
    price: 499,
    desc: "Express yourself,own your style",
    img: "./imges/tchirtwhite.jpg",
  },
  {
    id: 2,
    title: "Boots",
    price: 59,
    desc: " comfort for every step you take",
    img: "./imges/bootswhite.jpg",
  },
  {
    id: 3,
    title: "Bag",
    price: 899,
    desc: "style and funtion,perfectly designed",
    img: "./imges/bagred.jpg",
  },
  {
    id: 4,
    title: "Jacket",
    price: 390,
    desc: " the only jacket you'll need",
    img: "./imges/jakat.jpg",
  },
  {
    id: 5,
    title: "Sneakers",
    price: 350,
    desc: "style your steps with confidence",
    img: "./imges/botred.jpg",
  },
  {
    id: 6,
    title: "Jacket",
    price: 199,
    desc: "Essential style for any weather",
    img: "./imges/jaketbrwon.jpg",
  },
  {
    id: 7,
    title: "Watch",
    price: 750,
    desc: "your day,optimized on your wrist",
    img: "./imges/watch.jpg",
  },
  {
    id: 8,
    title: "Dress",
    price: 220,
    desc: "shine this summer",
    img: "./imges/drees.jpg",
  },
];

function renderProducts() {
  const recommended = document.getElementById("recommended-products");
  const popular = document.getElementById("popular-products");

  recommended.innerHTML = "";
  popular.innerHTML = "";

  products.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div class="price">$${p.price}</div>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    if (i % 2 === 0) recommended.appendChild(div);
    else popular.appendChild(div);
  });
}

function renderCart() {
  cartItemsContainer.innerHTML = "";
  cart.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.title} (x${item.qty})</span>
      <div>
        <button onclick="increaseQty(${idx})">+</button>
        <button onclick="removeItem(${idx})">حذف</button>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });
  cartCount.innerText = cart.reduce((sum, i) => sum + i.qty, 0);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existing = cart.find((p) => p.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  renderCart();
}

function increaseQty(idx) {
  cart[idx].qty++;
  renderCart();
}

function removeItem(idx) {
  cart.splice(idx, 1);
  renderCart();
}

clearCartBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});

// Sidebar toggle
cartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("active");
});
document.getElementById("close-cart").addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

// Search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".product").forEach((p) => {
    p.style.display = p.innerText.toLowerCase().includes(query)
      ? "block"
      : "none";
  });
});

// Scroll to top
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  scrollToTopBtn.style.display = window.scrollY > 100 ? "flex" : "none";
});
scrollToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// Year in footer
document.getElementById("year").innerText = new Date().getFullYear();

// Init
renderProducts();
renderCart();
