const sizeBtns = document.querySelectorAll('.sizes button');

sizeBtns.forEach(btnSize => {
    btnSize.addEventListener('click', () => {
        // Remove active classes from all buttons
        sizeBtns.forEach(btn => {
            btn.classList.remove('text-white', 'bg-orange-500');
        });

        // Add active classes to the clicked button
        btnSize.classList.add('text-white', 'bg-orange-500');
    });
}); 

const incriesBtn = document.getElementById('incries');
const QuantityDisplay = document.getElementById('Quantity');
const dincriesBtn = document.getElementById('dincries');

function incries() {
    QuantityDisplay.textContent = parseInt(QuantityDisplay.textContent) + 1;
}

function dincries() {
    const currentQuantity = parseInt(QuantityDisplay.textContent);
    if (currentQuantity > 0) {
        QuantityDisplay.textContent = currentQuantity - 1;
    }
}

incriesBtn.addEventListener('click', incries);      
dincriesBtn.addEventListener('click', dincries);

// Switch between product images
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        // Update the src of the main image to match the clicked thumbnail
        mainImage.src = this.src;
    });
});

// Get product ID and type from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const productType = urlParams.get("type"); // Get the type (Tshirt, Accessoire, Movie)

// Retrieve data from localStorage
const DataTshirt = JSON.parse(localStorage.getItem("Tshirt"));
const DataAccessoires = JSON.parse(localStorage.getItem("Accessoire"));
const DataMovie = JSON.parse(localStorage.getItem("Movie")); // Assuming you have movie data in localStorage

let product = null;

// Based on the product type, find the corresponding product
if (productType === "Tshirt" && DataTshirt) {
    product = DataTshirt.find(p => p.id === parseInt(productId));
} else if (productType === "Accessoire" && DataAccessoires) {
    product = DataAccessoires.find(p => p.id === parseInt(productId));
} else if (productType === "Movie" && DataMovie) {
    product = DataMovie.find(p => p.id === parseInt(productId));
}

if (product) {
    // Populate the product details on the page
    document.getElementById("mainImage").src = product.images[0]; // Main image
    document.getElementById("mainImage").alt = product.name;
    document.querySelector("h1").textContent = product.name;
    document.querySelector(".text-red-500").textContent = product.price + " DH"; // Price
    document.querySelector("p.text-gray-300").textContent = product.text; // Description

    // Update image thumbnails
    const thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumb, index) => {
        if (product.images[index]) {
            thumb.src = product.images[index];
            thumb.addEventListener("click", () => {
                document.getElementById("mainImage").src = product.images[index];
            });
        }
    });
}
