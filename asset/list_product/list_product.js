// Récupérer le paramètre 'category' de l'URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');  // La catégorie choisie (tshirt, movie, accessoire)

// Chargement des produits depuis localStorage
let products = [];

// Charger les produits en fonction de la catégorie sélectionnée
["Tshirt", "Accessoire", "movie"].forEach(cat => {
    const storedProducts = JSON.parse(localStorage.getItem(cat)) || [];

    // Si la catégorie correspond à celle choisie, on l'ajoute à la liste des produits
    if (!category || category.toLowerCase() === cat.toLowerCase()) {
        products = products.concat(storedProducts.map(item => {
            // Traitement des produits en fonction de la catégorie
            if (cat === "movie") {
                return {
                    id: item.id,
                    title: item.name,
                    price: parseFloat(item.price || 0),
                    rating: parseFloat(item.rating || 0), 
                    image: item.image ? item.image.replace(".", "") : "placeholder.jpg",
                    type: cat // Ajout du type
                };
            }
            return {
                id: item.id,
                title: item.name,
                price: parseFloat(item.price || 0),
                rating: parseFloat(item.rating || 0),
                image: item.images && item.images.length > 0 
                    ? item.images[0].replace(".", "") : "placeholder.jpg",
                type: cat // Ajout du type
            };
        }));
    }
});

// Variables de pagination
const itemsPerPage = 16;
let currentPage = 1;
let filteredProducts = [...products];

// Fonction d'affichage des produits
function displayProducts(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const productsToDisplay = filteredProducts.slice(start, end);
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    productsToDisplay.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("p-4");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="w-full h-64 object-contain rounded-md mb-4 product-card">
            <p class="text-2xl font-semibold mb-2">${product.title}</p>
            <div class="flex">
                <p class="text-4xl text-red font-bold text-yellow-500">${product.price.toFixed(2)} DH</p>
                <p class="text-lg line-through">${(product.price + 10).toFixed(2)} DH</p>
            </div>
            <div class="flex items-center justify-between">
                <p class="text-2xl">
                    <i class="bi bi-star-fill text-yellow-500"></i>
                    <i class="bi bi-star-fill text-yellow-500"></i>
                    <i class="bi bi-star-fill text-yellow-500"></i>
                    <i class="bi bi-star-fill text-yellow-500"></i>
                    <i class="bi bi-star-half text-yellow-500"></i>
                    9.5
                </p>
                <button class="add-to-cart" onClick="addToCart(${product.id})">
                    <i class="bi bi-cart-plus-fill text-4xl mr-5"></i>
                </button>
            </div>
        `;
        productList.appendChild(productCard);
        const productImage = productCard.querySelector("img");
        productImage.addEventListener("click", () => {
            let url = "";
            if (product.type === "movie") {
                url = `DetailMovies/detailMovie.html?id=${product.id}&type=${product.type}`; 
            } else {
                url = `product_detailes.html?id=${product.id}&type=${product.type}`; 
            }
            window.location.href = url;
        });
        
    });

    document.getElementById("pageNum").textContent = page;
    document.getElementById("prevPage").disabled = page === 1;
    document.getElementById("nextPage").disabled = end >= filteredProducts.length;
}

// Appel de la fonction pour afficher les produits
displayProducts(currentPage);

// Gestion de la pagination
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage);
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage * itemsPerPage < filteredProducts.length) {
        currentPage++;
        displayProducts(currentPage);
    }
});

// Gestion de la recherche
document.getElementById("searchInput").addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
    currentPage = 1;
    displayProducts(currentPage);
});

// Gestion du tri par prix
let sortAscending = true;

document.getElementById("sortPriceBtn").addEventListener("click", () => {
    const priceSortOptions = document.getElementById("priceSortOptions");
    priceSortOptions.classList.toggle("hidden");
});

// Tri croissant
document.getElementById("sortAsc").addEventListener("click", () => {
    filteredProducts.sort((a, b) => a.price - b.price);
    sortAscending = true;
    displayProducts(currentPage);
    document.getElementById("priceSortOptions").classList.add("hidden");
});

// Tri décroissant
document.getElementById("sortDesc").addEventListener("click", () => {
    filteredProducts.sort((a, b) => b.price - a.price);
    sortAscending = false;
    displayProducts(currentPage);
    document.getElementById("priceSortOptions").classList.add("hidden");
});

let card = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    // console.log("Product ID added:", productId);
    // let cart = getCart();
    const product = products.find(item => item.id === productId);
    
    const existingProduct = card.find(item => item.id === product.id && item.type === product.type);
    if (existingProduct) {
        // Si le produit est déjà dans le panier, on augmente la quantité
        existingProduct.quantity += 1;
    } else {
        // Sinon on l'ajoute avec quantité 1
        card.push({...product, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(card));
    alert(`${product.title} ajouté au panier !`);
}

// Fonction pour récupérer le panier du localStorage
// function getCart() {
//     return ;
// }

// Fonction pour enregistrer le panier dans le localStorage
// function saveCart(cart) {
    
// }

// Fonction pour ajouter un produit au panier

// Gestion des événements sur le bouton "Ajouter au panier"
document.querySelectorAll('.bi-cart-plus-fill').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = event.target.closest('.product').id; // Récupère l'id du produit parent
        const product = products.find(p => p.id === productId); // Trouve le produit dans la liste

        addToCart(product); // Ajoute au panier
    });
});
document.querySelector('.fa-cart-shopping').addEventListener('click', function () {
    window.location.href = 'cart_de_panier.html'; // Redirige l'utilisateur vers cart_de_panier.html
});

// Affichage initial
displayProducts(currentPage);
