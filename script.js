let cart = [];
const cartCount = document.getElementById('cartCount');
const productGrid = document.getElementById('productGrid');

// 1. LOGIKA SISTEM LOGIN
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    localStorage.setItem('sd_user', user);
    initApp();
});

function initApp() {
    const user = localStorage.getItem('sd_user');
    if (user) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('userDisplay').innerText = user;
    }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('sd_user');
    location.reload();
});

// 2. KERANJANG BELANJA
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    // Efek sederhana
    const btn = event.target;
    btn.innerText = "✓ Berhasil";
    btn.style.background = "#059669";
    setTimeout(() => {
        btn.innerText = "Tambah ke Keranjang";
        btn.style.background = "#3b82f6";
    }, 1000);
}

function updateCartUI() {
    cartCount.innerText = cart.length;
    const list = document.getElementById('cartItems');
    const total = document.getElementById('totalPrice');
    
    list.innerHTML = '';
    let totalVal = 0;

    cart.forEach((item, index) => {
        totalVal += item.price;
        list.innerHTML += `
            <div class="flex justify-between items-center border-b pb-2">
                <div>
                    <p class="font-bold text-sm">${item.name}</p>
                    <p class="text-xs text-blue-600">Rp ${item.price.toLocaleString()}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-red-400 text-xs hover:underline">Hapus</button>
            </div>
        `;
    });

    total.innerText = `Rp ${totalVal.toLocaleString()}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

document.getElementById('cartBtn').addEventListener('click', () => toggleModal('cartModal'));

function toggleModal(id) {
    const m = document.getElementById(id);
    m.classList.toggle('hidden');
}

// 3. SISTEM PEMBAYARAN (SIMULASI)
function processPay(method) {
    if (cart.length === 0) return alert("Keranjang masih kosong!");
    
    const confirmPay = confirm(`Konfirmasi pembayaran dengan ${method}?`);
    if (confirmPay) {
        alert(`Pesanan Berhasil! \nSilakan selesaikan pembayaran ke rekening SmartDigital. \nInstruksi telah dikirim ke email.`);
        cart = [];
        updateCartUI();
        toggleModal('cartModal');
    }
}

// 4. PANEL PENJUAL (UPLOAD)
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('prodName').value;
    const cat = document.getElementById('prodCategory').value;
    const price = document.getElementById('prodPrice').value;
    const imgFile = document.getElementById('prodImage').files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        const div = document.createElement('div');
        div.className = 'prod-card animate-bounce-short';
        div.innerHTML = `
            <div class="prod-img overflow-hidden">
                <img src="${event.target.result}" class="w-full h-full object-cover">
            </div>
            <div class="p-5">
                <span class="cat">${cat}</span>
                <h4 class="font-bold text-lg">${name}</h4>
                <p class="text-green-600 font-black mt-2">Rp ${parseInt(price).toLocaleString()}</p>
                <button onclick="addToCart('${name}', ${price})" class="add-to-cart-btn">Tambah ke Keranjang</button>
            </div>
        `;
        productGrid.prepend(div);
        alert("Selamat! Produk Anda sudah aktif di katalog.");
        this.reset();
    };
    reader.readAsDataURL(imgFile);
});

// Cek status saat load
window.onload = initApp;
