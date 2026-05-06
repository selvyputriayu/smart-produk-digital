// Database Referensi Produk (Dummy Data)
const referensiProduk = [
    { name: "PPT Interaktif Tata Surya", cat: "Materi Sekolah", price: 25000, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80" },
    { name: "Preset Lightroom Aesthetic", cat: "Foto Estetik", price: 45000, img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=300&q=80" },
    { name: "Infografis Bisnis Modern", cat: "Design", price: 30000, img: "https://images.unsplash.com/photo-1551288049-bbbda5466975?auto=format&fit=crop&w=300&q=80" },
    { name: "E-Book Rumus Matematika SMA", cat: "Materi Sekolah", price: 15000, img: "https://images.unsplash.com/photo-1509228468518-180dd48a57a1?auto=format&fit=crop&w=300&q=80" },
    { name: "Video Background Cinematic", cat: "Foto Estetik", price: 60000, img: "https://images.unsplash.com/photo-1493238792040-d710d734304c?auto=format&fit=crop&w=300&q=80" },
    { name: "Template Jurnal Perkuliahan", cat: "Edukasi", price: 20000, img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=300&q=80" },
    { name: "Icon Set 3D Premium", cat: "Design", price: 55000, img: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&w=300&q=80" },
    { name: "Materi Mewarnai Anak TK", cat: "Materi Sekolah", price: 10000, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=300&q=80" }
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    renderProducts(); // Menampilkan referensi produk saat start
});

// Menampilkan Produk ke Layar
function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = ''; // Bersihkan grid

    referensiProduk.forEach(item => {
        const card = `
            <div class="prod-card animate-in">
                <div class="prod-img overflow-hidden h-40">
                    <img src="${item.img}" class="w-full h-full object-cover" alt="${item.name}">
                </div>
                <div class="p-5">
                    <span class="cat">${item.cat}</span>
                    <h4 class="font-bold text-lg leading-tight mt-1">${item.name}</h4>
                    <p class="text-green-600 font-black mt-2">Rp ${item.price.toLocaleString('id-ID')}</p>
                    <button onclick="addToCart('${item.name}', ${item.price})" class="add-to-cart-btn">Tambah ke Keranjang</button>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// Fitur Upload Produk (Penjual)
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('prodName').value;
    const cat = document.getElementById('prodCategory').value;
    const price = document.getElementById('prodPrice').value;
    const imgInput = document.getElementById('prodImage');

    if (imgInput.files && imgInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            // Masukkan ke array referensi (atas)
            referensiProduk.unshift({
                name: name,
                cat: cat,
                price: parseInt(price),
                img: event.target.result
            });
            renderProducts(); // Gambar ulang katalog
            alert("Produk berhasil diupload!");
            e.target.reset();
        };
        reader.readAsDataURL(imgInput.files[0]);
    }
});

// Logika Login (Sederhana)
function initApp() {
    const user = localStorage.getItem('sd_user');
    if (user) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('userDisplay').innerText = user;
    }
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('sd_user', document.getElementById('username').value);
    initApp();
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('sd_user');
    location.reload();
});

// Fungsi Keranjang (Sama seperti sebelumnya namun disesuaikan)
function addToCart(name, price) {
    cart.push({ name, price });
    document.getElementById('cartCount').innerText = cart.length;
    updateCartModal();
}

function updateCartModal() {
    const list = document.getElementById('cartItems');
    const total = document.getElementById('totalPrice');
    let totalVal = 0;
    list.innerHTML = '';
    cart.forEach((item, index) => {
        totalVal += item.price;
        list.innerHTML += `<div class="flex justify-between text-sm border-b pb-2">
            <span>${item.name}</span>
            <span class="font-bold text-blue-600">Rp ${item.price.toLocaleString()}</span>
        </div>`;
    });
    total.innerText = `Rp ${totalVal.toLocaleString()}`;
}

function processPay(method) {
    if(cart.length === 0) return alert("Pilih produk dulu!");
    alert(`Sukses! Instruksi pembayaran via ${method} dikirim ke WhatsApp/Email Anda.`);
    cart = [];
    document.getElementById('cartCount').innerText = "0";
    document.getElementById('cartModal').classList.add('hidden');
}

function toggleModal(id) {
    document.getElementById(id).classList.toggle('hidden');
}

               
