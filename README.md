# CartShare - Collaborative Shopping Ecosystem

CartShare is a real-time collaborative shopping web application designed for shared living spaces (like student dorms, flatmates, or office teams). It eliminates fragmented shopping lists, coordinates orders to beat free-shipping thresholds, and generates transparent, audit-ready receipts.

## 🚀 Live Demo
- **Live URL**: https://hv83962.github.io/CartShare/
- **Repository**: https://github.com/hv83962/CartShare

---

## 🛠️ Features Implemented
- **Room-Based Access**: Join or create unique group rooms using custom room codes (e.g., `DORM1`, `ROOM202`).
- **Real-Time Cross-Tab Collaboration**: Items added or removed in one tab update instantly across all open tabs/sessions via browser `StorageEvent` APIs without requiring manual reloads.
- **Categorized Product Catalog**: 30 products across Grocery, Snacks, Beverages, and Personal Care with quick category filters.
- **Delivery Threshold Tracker**: Dynamic progress indicator showing progress toward a ₹1,500 target for free shipping.
- **Audit-Ready Printable Receipt**: Native `@media print` thermal slip summary displaying each item, quantity, price, and the group member who added it.
- **Live Room Activity Feed**: Real-time event log tracking user entries, item additions, and removals.
- **Responsive Interface**: Mobile-first design built with Bootstrap 5 and modern frosted glassmorphic UI.

---

## 📁 Project Structure
```text
CartShare/
├── index.html          # Core semantic structure and modal views
├── css/
│   └── style.css       # Custom styling, animations, and @media print rules
├── js/
│   └── app.js          # Catalog data, state management, and cross-tab sync
├── assets/             # Static assets, icons, and product media
└── README.md           # Project documentation
