// 30 Verified Real-World Products with Reliable Fallback
const CATALOG = [
  // Grocery
 { id: 1, name: "Whole Milk 1L", category: "Grocery", price: 65, img: "assets/images/milk.jpg" },
  { id: 2, name: "Brown Bread 400g", category: "Grocery", price: 45, img: "assets/images/bread.jpg" },
  { id: 3, name: "Eggs (Pack of 12)", category: "Grocery", price: 90, img: "assets/images/eggs.jpg" },
  { id: 4, name: "Peanut Butter 500g", category: "Grocery", price: 210, img: "assets/images/peanut-butter.jpg" },
  { id: 5, name: "Oats Jar 1kg", category: "Grocery", price: 199, img: "assets/images/oats.jpg" },
  { id: 6, name: "Basmati Rice 1kg", category: "Grocery", price: 140, img: "assets/images/rice.jpg" },
  { id: 7, name: "Olive Oil 500ml", category: "Grocery", price: 450, img: "assets/images/olive-oil.jpg" },
  { id: 8, name: "Butter Slab 200g", category: "Grocery", price: 110, img: "assets/images/butter.jpg" },

  // Snacks
  { id: 9, name: "Potato Chips Spicy", category: "Snacks", price: 40, img: "assets/images/chips.jpg" },
  { id: 10, name: "Instant Noodles (Box)", category: "Snacks", price: 145, img: "assets/images/noodles.jpg" },
  { id: 11, name: "Chocolate Cookies", category: "Snacks", price: 80, img: "assets/images/cookies.jpg" },
  { id: 12, name: "Dark Chocolate 100g", category: "Snacks", price: 125, img: "assets/images/chocolate.jpg" },
  { id: 13, name: "Roasted Almonds 200g", category: "Snacks", price: 290, img: "assets/images/almonds.jpg" },
  { id: 14, name: "Popcorn Tub 150g", category: "Snacks", price: 75, img: "assets/images/popcorn.jpg" },
  { id: 15, name: "Nachos with Salsa", category: "Snacks", price: 110, img: "assets/images/nachos.jpg" },
  { id: 16, name: "Energy Protein Bar", category: "Snacks", price: 95, img: "assets/images/protein-bar.jpg" },

  // Beverages
  { id: 17, name: "Cold Brew Coffee 250ml", category: "Beverages", price: 130, img: "assets/images/coffee.jpg" },
  { id: 18, name: "Sparkling Lemon Water", category: "Beverages", price: 60, img: "assets/images/sparkling-water.jpg" },
  { id: 19, name: "Orange Juice 1L", category: "Beverages", price: 120, img: "assets/images/orange-juice.jpg" },
  { id: 20, name: "Green Tea Box (25 bags)", category: "Beverages", price: 180, img: "assets/images/green-tea.jpg" },
  { id: 21, name: "Energy Drink Can", category: "Beverages", price: 115, img: "assets/images/energy-drink.jpg" },
  { id: 22, name: "Almond Milk 1L", category: "Beverages", price: 240, img: "assets/images/almond-milk.jpg" },
  { id: 23, name: "Mango Smoothie 300ml", category: "Beverages", price: 90, img: "assets/images/smoothie.jpg" },

  // Personal Care
  { id: 24, name: "Toothpaste 150g", category: "Personal Care", price: 120, img: "assets/images/toothpaste.jpg" },
  { id: 25, name: "Hydrating Face Wash 100ml", category: "Personal Care", price: 275, img: "assets/images/facewash.jpg" },
  { id: 26, name: "Organic Shampoo 250ml", category: "Personal Care", price: 340, img: "assets/images/shampoo.jpg" },
  { id: 27, name: "Bathing Soap (Pack of 3)", category: "Personal Care", price: 160, img: "assets/images/soap.jpg" },
  { id: 28, name: "Hand Sanitizer 500ml", category: "Personal Care", price: 140, img: "assets/images/sanitizer.jpg" },
  { id: 29, name: "Sunscreen Gel SPF50", category: "Personal Care", price: 399, img: "assets/images/sunscreen.jpg" },
  { id: 30, name: "Paper Napkins (Pack of 2)", category: "Personal Care", price: 85, img: "assets/images/napkins.jpg" }
];

const THRESHOLD = 1500;
let currentUser = "";
let currentRoom = "";

function handleJoin(e) {
  e.preventDefault();
  currentUser = document.getElementById("userNameInput").value.trim();
  currentRoom = document.getElementById("roomCodeInput").value.trim().toUpperCase();

  if (!currentUser || !currentRoom) return;

  document.getElementById("authScreen").classList.add("d-none");
  document.getElementById("workspace").classList.remove("d-none");
  document.getElementById("roomBadgeContainer").classList.remove("d-none");
  document.getElementById("roomBadgeContainer").classList.add("d-flex");
  document.getElementById("leaveBtn").classList.remove("d-none");
  document.getElementById("displayRoomCode").textContent = currentRoom;
  document.getElementById("userBadge").textContent = `Logged as: ${currentUser}`;

  renderCatalog(CATALOG);
  logActivity(`${currentUser} joined the room.`);
  renderAll();
}

function leaveRoom() {
  logActivity(`${currentUser} left the room.`);
  currentUser = "";
  currentRoom = "";
  document.getElementById("authScreen").classList.remove("d-none");
  document.getElementById("workspace").classList.add("d-none");
  document.getElementById("roomBadgeContainer").classList.add("d-none");
  document.getElementById("leaveBtn").classList.add("d-none");
}

function getCart() {
  return JSON.parse(localStorage.getItem(`cartshare_room_${currentRoom}`) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(`cartshare_room_${currentRoom}`, JSON.stringify(cart));
  renderAll();
}

function logActivity(text) {
  const logs = JSON.parse(localStorage.getItem(`cartshare_activity_${currentRoom}`) || "[]");
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  logs.unshift({ text, time });
  localStorage.setItem(`cartshare_activity_${currentRoom}`, JSON.stringify(logs.slice(0, 20)));
  renderActivity();
}

function addToCart(productId) {
  const item = CATALOG.find(p => p.id === productId);
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1, addedBy: currentUser });
  }

  saveCart(cart);
  logActivity(`${currentUser} added ${item.name}`);
}

function updateQty(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
    logActivity(`${currentUser} removed ${item.name}`);
  } else {
    logActivity(`${currentUser} updated qty for ${item.name}`);
  }
  saveCart(cart);
}

// Fallback image generator if network or URL fails
function handleImgError(imageEl, productName) {
  imageEl.onerror = null;
  imageEl.src = `https://placehold.co/400x300/e2e8f0/475569?text=${encodeURIComponent(productName)}`;
}

function renderCatalog(items) {
  const container = document.getElementById("productGrid");
  container.innerHTML = items.map(item => `
    <div class="col">
      <div class="product-card">
        <div class="product-img-wrapper">
          <img 
            src="${item.img}" 
            alt="${item.name}" 
            class="product-img" 
            loading="lazy" 
            onerror="handleImgError(this, '${item.name}')"
          >
          <span class="product-tag">${item.category}</span>
        </div>
        <div class="product-body">
          <div class="product-name text-truncate" title="${item.name}">${item.name}</div>
          <div class="product-price mb-2">₹${item.price}</div>
          <button class="btn-add-cart" onclick="addToCart(${item.id})">
            <i class="bi bi-plus-lg me-1"></i> Add
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterCatalog(category, event) {
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  if (event) event.target.classList.add("active");

  if (category === "All") {
    renderCatalog(CATALOG);
  } else {
    renderCatalog(CATALOG.filter(c => c.category === category));
  }
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cartList");

  if (cart.length === 0) {
    container.innerHTML = `<div class="text-center text-muted small py-4">Group cart is empty</div>`;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-row">
      <div style="max-width: 60%;">
        <div class="fw-bold small text-truncate">${item.name}</div>
        <div class="text-muted" style="font-size: 0.72rem;">By ${item.addedBy} • ₹${item.price}</div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <div class="qty-pill">
          <button onclick="updateQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id}, 1)">+</button>
        </div>
        <span class="fw-bold small text-end" style="min-width: 48px;">₹${item.price * item.qty}</span>
      </div>
    </div>
  `).join('');
}

function renderSummary() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  document.getElementById("subTotalText").textContent = `₹${total}`;
  document.getElementById("totalText").textContent = `₹${total}`;
  const mobileTotal = document.getElementById("mobileTotalText");
  if (mobileTotal) mobileTotal.textContent = `₹${total}`;

  const progressPercent = Math.min(100, (total / THRESHOLD) * 100);
  document.getElementById("thresholdProgress").style.width = `${progressPercent}%`;
  document.getElementById("thresholdText").textContent = `₹${total} / ₹${THRESHOLD}`;

  if (total >= THRESHOLD) {
    document.getElementById("thresholdSuccess").classList.remove("d-none");
  } else {
    document.getElementById("thresholdSuccess").classList.add("d-none");
  }
}

function renderActivity() {
  const logs = JSON.parse(localStorage.getItem(`cartshare_activity_${currentRoom}`) || "[]");
  const container = document.getElementById("activityFeed");
  if (logs.length === 0) {
    container.innerHTML = `<div class="text-center text-muted small py-3">No activity yet</div>`;
    return;
  }
  container.innerHTML = logs.map(l => `
    <div class="feed-item">
      <span>${l.text}</span>
      <span class="text-muted">${l.time}</span>
    </div>
  `).join('');
}

function renderAll() {
  renderCart();
  renderSummary();
  renderActivity();
}

// Multi-Tab Real-Time Sync
window.addEventListener("storage", (e) => {
  if (e.key === `cartshare_room_${currentRoom}` || e.key === `cartshare_activity_${currentRoom}`) {
    renderAll();
  }
});

function copyInvite() {
  navigator.clipboard.writeText(currentRoom);
  alert(`Room Code "${currentRoom}" copied to clipboard!`);
}

function printReceipt() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Cart is empty! Add items first.");
    return;
  }
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  document.getElementById("receiptDate").textContent = `DATE: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  document.getElementById("receiptRoomId").textContent = `ROOM: ${currentRoom} (BY: ${currentUser})`;

  document.getElementById("receiptTableBody").innerHTML = cart.map(i => `
    <tr>
      <td style="max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${i.name}</td>
      <td>${i.addedBy}</td>
      <td style="text-align: center;">${i.qty}</td>
      <td style="text-align: right;">₹${i.price * i.qty}</td>
    </tr>
  `).join('');

  document.getElementById("receiptTotalAmount").textContent = `₹${total}`;
  window.print();
}