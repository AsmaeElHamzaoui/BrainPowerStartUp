
fetch('../asset/admin/Data/DataMovie.json')
  .then(response => response.json())
  .then(data => {
    if (!localStorage.getItem("movie")) {
      localStorage.setItem("movie", JSON.stringify(data.DataMovie));
    }
  })
  .catch(error => console.error('Erreur:', error));



fetch('../asset/admin/Data/DataTshirt.json')
  .then(response => response.json())
  .then(data => {
    if (!localStorage.getItem("Tshirt")) {
       localStorage.setItem("Tshirt", JSON.stringify(data.DataTshirt));
      }
  })
  .catch(error => console.error('Erreur:', error));

fetch('../asset/admin/Data/DataAccessoire.json')
  .then(response => response.json())
  .then(data => {
    if (!localStorage.getItem("Accessoire")) {
        localStorage.setItem("Accessoire", JSON.stringify(data.DataAccessoires));
       }
  })
  .catch(error => console.error('Erreur:', error));





// #######################################################################################################################
const SaveMovie = document.getElementById("SaveMovie");
// ############################################################  remplissage movie  ###############################################################
let dataMovies = JSON.parse(localStorage.getItem("movie")) || [] ;
let indexMovie =dataMovies.length;

// counteur movie
const counteurMovie = document.querySelector("#counteurMovie");
counteurMovie.textContent = indexMovie;

SaveMovie.addEventListener("click", function (e) {
    e.preventDefault();
    btnModifierMovie.classList.toggle("hidden");

    const nameMovie = document.querySelector("#nameMovie").value;
    const textareaMovie = document.querySelector("#textareaMovie").value;
    const priceMovie = document.querySelector("#priceMovie").value;
    const GenreMovie = document.querySelector("#GenreMovie").value;
    const dateMovie = document.querySelector("#dateMovie").value;
    const duréMovie = document.querySelector("#duréMovie").value;
    const quantiteMovie = document.querySelector("#quantiteMovie").value;
    const autheurMovie = document.querySelector("#autheurMovie").value;
    const imageMovie = document.querySelector("#imageMovie").files[0]; 
    const vidéoMovie = document.querySelector("#vidéoMovie").files[0];

    if (!nameMovie || !textareaMovie || !quantiteMovie || !priceMovie || !GenreMovie || !dateMovie || !duréMovie || !autheurMovie || !imageMovie || !vidéoMovie) {
        alert("Remplissez tous les champs");
        return;
    }

    // Lire l'image avec FileReader
    const readerImage = new FileReader();
    readerImage.onload = function (event) {
        const imageUrl = event.target.result;

        // Lire la vidéo avec FileReader
        const readerVideo = new FileReader();
        readerVideo.onload = function (event) {
            const videoUrl = event.target.result;

            let Movie = {
                id: ++indexMovie,
                name: nameMovie,
                text: textareaMovie,
                price: priceMovie,
                genre: GenreMovie,
                date: dateMovie,
                dure: duréMovie,
                quantite : quantiteMovie,
                autheur: autheurMovie,
                image: imageUrl, 
                video: videoUrl,
            };

            dataMovies.push(Movie);
            localStorage.setItem("movie", JSON.stringify(dataMovies));
            VideFormMovie();
            afficheTable("Movie");
        };

        readerVideo.readAsDataURL(vidéoMovie); // Lire le fichier vidéo en tant qu'URL
    };

    readerImage.readAsDataURL(imageMovie); // Lire le fichier image en tant qu'URL
    closeModalMovie();
});

// supprimer movie
function SupprimerMovie(id) {

    const index = dataMovies.findIndex((movie) => movie.id == id);
    dataMovies.splice(index, 1);
    localStorage.setItem("movie", JSON.stringify(dataMovies));
    afficheTable("Movie");
}

const btnModifierMovie = document.getElementById("SaveModiferMovie");

function ModifierMovie(id) {
    openModalMovie(); 
    SaveMovie.classList.add("hidden");
    btnModifierMovie.classList.toggle("hidden");

    const movie = dataMovies.find((movie) => movie.id == id);

    document.querySelector("#nameMovie").value = movie.name;
    document.querySelector("#textareaMovie").value = movie.text;
    document.querySelector("#priceMovie").value = movie.price;
    document.querySelector("#GenreMovie").value = movie.genre;
    document.querySelector("#dateMovie").value = movie.date;
    document.querySelector("#duréMovie").value = movie.dure;
    document.querySelector("#quantiteMovie").value = movie.quantite
    document.querySelector("#autheurMovie").value = movie.autheur;
    document.querySelector("#imageMovie").src = movie.image; 
    document.querySelector("#vidéoMovie").src = movie.video; 

    btnModifierMovie.onclick = function (e) {
        e.preventDefault(); 

        const nameMovie = document.querySelector("#nameMovie").value;
        const textareaMovie = document.querySelector("#textareaMovie").value;
        const priceMovie = document.querySelector("#priceMovie").value;
        const GenreMovie = document.querySelector("#GenreMovie").value;
        const dateMovie = document.querySelector("#dateMovie").value;
        const duréMovie = document.querySelector("#duréMovie").value;
        const autheurMovie = document.querySelector("#autheurMovie").value;
        const quantiteMovie = document.querySelector("#quantiteMovie").value;
        const imageMovie = document.querySelector("#imageMovie").files[0];
        const videoMovie = document.querySelector("#vidéoMovie").files[0];


        if (imageMovie) {
            const readerImage = new FileReader();
            readerImage.onload = function (event) {
                movie.image = event.target.result; 
            };
            readerImage.readAsDataURL(imageMovie);
        }

        
        if (videoMovie) {
            const readerVideo = new FileReader();
            readerVideo.onload = function (event) {
                movie.video = event.target.result; 
            };
            readerVideo.readAsDataURL(videoMovie);
        }

        movie.name = nameMovie;
        movie.text = textareaMovie;
        movie.price = priceMovie;
        movie.genre = GenreMovie;
        movie.date = dateMovie;
        movie.dure = duréMovie;
        movie.quantite = quantiteMovie;
        movie.autheur = autheurMovie;

        localStorage.setItem("movie", JSON.stringify(dataMovies));

        closeModalMovie();
        afficheTable('Movie'); 
    }
}



// ###################################################################################################################################
const SaveTshirt = document.getElementById("SaveTshir");

// ############################################################  remplissage T-shirt  ################################################
let dataTshirt = JSON.parse(localStorage.getItem("Tshirt")) || [];
let indexTshirt = dataTshirt.length

// counteur Tshirt
const counteurTshirt = document.querySelector("#counteurTshirt");
counteurTshirt.textContent = indexTshirt;

SaveTshirt.addEventListener("click", function (e) {
    e.preventDefault();

    btnModifierTshirt.classList.add("hidden");

    const titleTshirt = document.querySelector("#titleTshirt").value;
    const textareaTshirt = document.querySelector("#textTshirt").value;
    const priceTshirt = document.querySelector("#priceTshirt").value;
    const quantiteTshirt = document.querySelector("#quantiteTshirt").value;
    const imagesInput = document.querySelector("#imageTshirt").files;

    if (!titleTshirt || !quantiteTshirt || !textareaTshirt || !priceTshirt || imagesInput.length === 0) {
        alert("Remplissez tous les champs du T-shirt");
        return;
    }

    const imageUrls = [];
    let loadedImages = 0;

    Array.from(imagesInput).forEach((file) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            imageUrls.push(event.target.result);
            loadedImages++;

            // Enregistrer le T-shirt une fois que toutes les images sont chargées
            if (loadedImages === imagesInput.length) {
                let Tshirt = {
                    id: ++indexTshirt,
                    name: titleTshirt,
                    text: textareaTshirt,
                    price: priceTshirt,
                    quantite:quantiteTshirt,
                    images: imageUrls
                };

                dataTshirt.push(Tshirt);
                localStorage.setItem("Tshirt", JSON.stringify(dataTshirt));
                VideFormTshirt();
                afficheTable('Tshirt')
            }
        };
        reader.readAsDataURL(file);
    });
    closeModalTshirt();
});

// supprimer T-shirts
function SupprimerTshirt(id) {

    const index = dataTshirt.findIndex((Tshirt) => Tshirt.id == id);
    dataTshirt.splice(index, 1);
    localStorage.setItem("Tshirt", JSON.stringify(dataTshirt));
    afficheTable('Tshirt');
}

const btnModifierTshirt = document.getElementById("SaveModiferTshir");

function ModifierTshirt(id) {
    openModalTshirt(); 

    SaveTshirt.classList.add("hidden");
    btnModifierTshirt.classList.remove("hidden");

    const Tshirt = dataTshirt.find((tshirt) => tshirt.id == id);

    document.querySelector("#titleTshirt").value = Tshirt.name;
    document.querySelector("#textTshirt").value = Tshirt.text;
    document.querySelector("#priceTshirt").value = Tshirt.price;
    document.querySelector("#quantiteTshirt").value = Tshirt.quantite;


    btnModifierTshirt.onclick = function(e) {
        e.preventDefault();

        const titleTshirt = document.querySelector("#titleTshirt").value;
        const textareaTshirt = document.querySelector("#textTshirt").value;
        const priceTshirt = document.querySelector("#priceTshirt").value;
        const quantiteTshirt = document.querySelector("#quantiteTshirt").value;
        const imagesTshirt = document.querySelector("#imageTshirt").files;

        if (imagesTshirt && imagesTshirt.length > 0) {
            let imagesDataUrls = [];
            let loadedImages = 0;

            Array.from(imagesTshirt).forEach((imageFile) => {
                const readerImage = new FileReader();

                readerImage.onload = function(event) {
                    imagesDataUrls.push(event.target.result);
                    loadedImages++;

                    if (loadedImages === imagesTshirt.length) {
                        Tshirt.images = imagesDataUrls;
                        updateTshirtData(Tshirt, titleTshirt, textareaTshirt, priceTshirt,quantiteTshirt);
                    }
                };

                readerImage.readAsDataURL(imageFile);
            });

        } else {
            updateTshirtData(Tshirt, titleTshirt, textareaTshirt, priceTshirt,quantiteTshirt);
        }
    };

    function updateTshirtData(Tshirt, title, text, price,quantite) {
        Tshirt.name = title;
        Tshirt.text = text;
        Tshirt.price = price;
        Tshirt.quantite = quantite;


        localStorage.setItem("Tshirt", JSON.stringify(dataTshirt));
        closeModalTshirt();
        afficheTable('Tshirt');
    }
}









// #####################################################################################################################################
const SaveAccessoire = document.getElementById("SaveAccessoire");
// ############################################################  remplissage T-shirt  ################################################

let dataAccessoire = JSON.parse(localStorage.getItem("Accessoire")) || [];
let indexAccessoire = dataAccessoire.length;

// counteur Accessoires
const counteurAccessoires = document.querySelector("#counteurAccessoire");
counteurAccessoires.textContent = indexAccessoire;

SaveAccessoire.addEventListener("click", function (e) {
    e.preventDefault();

    const titleAccessoire = document.querySelector("#titleAccessoire").value;
    const textareaAccessoire = document.querySelector("#textAccessoire").value;
    const priceAccessoire = document.querySelector("#priceAccessoire").value;
    const quantiteAccessoire = document.querySelector("#quantiteAccessoire").value;
    const imagesInput = document.querySelector("#imageAccessoire").files;

    if (!titleAccessoire || !quantiteAccessoire || !textareaAccessoire || !priceAccessoire || imagesInput.length === 0) {
        alert("Remplissez tous les champs de l'accessoire");
        return;
    }

    const imageUrls = [];
    let loadedImages = 0;

    Array.from(imagesInput).forEach((file) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            imageUrls.push(event.target.result);
            loadedImages++;

            // Enregistrer l'accessoire une fois que toutes les images sont chargées
            if (loadedImages === imagesInput.length) {
                let Accessoire = {
                    id: ++indexAccessoire,
                    name: titleAccessoire,
                    text: textareaAccessoire,
                    price: priceAccessoire,
                    quantite:quantiteAccessoire,

                    images: imageUrls
                };

                dataAccessoire.push(Accessoire);
                localStorage.setItem("Accessoire", JSON.stringify(dataAccessoire));
                VideFormAccessoire();
                afficheTable("Accessoires");
            }
        };
        reader.readAsDataURL(file);
    });
    closeModalAccessoire();
});

// supprimer Accessoire
function SupprimerAccessoire(id) {

    const index = dataAccessoire.findIndex((Accessoire) => Accessoire.id == id);
    dataAccessoire.splice(index, 1);
    localStorage.setItem("Accessoire", JSON.stringify(dataAccessoire));
    afficheTable("Accessoires");
}

const btnModifierAccessoire = document.getElementById("SaveModiferAccessoire");
function ModifierAccessoire(id) {
    openModalAccessoire(); 

    SaveAccessoire.classList.add("hidden");
    btnModifierAccessoire.classList.remove("hidden");

    const accessoire = dataAccessoire.find((accessoire) => accessoire.id == id);

    document.querySelector("#titleAccessoire").value = accessoire.name;
    document.querySelector("#textAccessoire").value = accessoire.text;
    document.querySelector("#priceAccessoire").value = accessoire.price;
    document.querySelector("#quantiteAccessoire").value = accessoire.quantite

    btnModifierAccessoire.onclick = function(e) {
        e.preventDefault();

        const titleAccessoire = document.querySelector("#titleAccessoire").value;
        const textareaAccessoire = document.querySelector("#textAccessoire").value;
        const priceAccessoire = document.querySelector("#priceAccessoire").value;
        const quantiteAccessoire = document.querySelector("#quantiteAccessoire").value;
        const imagesAccessoire = document.querySelector("#imageAccessoire").files;

        if (imagesAccessoire && imagesAccessoire.length > 0) {
            let imagesDataUrls = [];
            let loadedImages = 0;

            Array.from(imagesAccessoire).forEach((imageFile) => {
                const readerImage = new FileReader();

                readerImage.onload = function(event) {
                    imagesDataUrls.push(event.target.result);
                    loadedImages++;

                    if (loadedImages === imagesAccessoire.length) {
                        accessoire.images = imagesDataUrls;
                        updateAccessoireData(accessoire, titleAccessoire, textareaAccessoire, priceAccessoire,quantiteAccessoire);
                    }
                };

                readerImage.readAsDataURL(imageFile);
            });

        } else {
            updateAccessoireData(accessoire, titleAccessoire, textareaAccessoire, priceAccessoire,quantiteAccessoire);
        }
    };

    function updateAccessoireData(accessoire, title, text, price,quantite) {
        accessoire.name = title;
        accessoire.text = text;
        accessoire.price = price;
        accessoire.quantite = quantite;

        localStorage.setItem("Accessoire", JSON.stringify(dataAccessoire));
        closeModalAccessoire();
        afficheTable("Accessoires");
    }
}


// ###############################################  les forms vides   ######################################################
   
function VideFormMovie(){
    document.querySelector("#nameMovie").value = "";
    document.querySelector("#textareaMovie").value = "";
    document.querySelector("#priceMovie").value = "";
    document.querySelector("#GenreMovie").value = "";
    document.querySelector("#dateMovie").value = "";
    document.querySelector("#duréMovie").value = "";
    document.querySelector("#autheurMovie").value = "";
    document.querySelector("#imageMovie").value = "";
    document.querySelector("#vidéoMovie").value = "";
}

function VideFormTshirt(){
    document.querySelector("#titleTshirt").value = "";
    document.querySelector("#textTshirt").value = "";
    document.querySelector("#priceTshirt").value = "";
    document.querySelector("#imageTshirt").value = "";
}
function VideFormAccessoire(){
    document.querySelector("#titleAccessoire").value = "";
    document.querySelector("#textAccessoire").value = "";
    document.querySelector("#priceAccessoire").value = "";
    document.querySelector("#imageAccessoire").value = "";
}

// ###############################################  les models   ######################################################
function openModalMovie() {
    document.getElementById('ModalMovie').classList.remove('hidden');
    btnModifierMovie.classList.add("hidden")
    SaveMovie.classList.remove("hidden")
    VideFormMovie();
}
function openModalTshirt() {
    document.getElementById('ModalTshirt').classList.remove('hidden');
    btnModifierTshirt.classList.add("hidden")
    SaveTshirt.classList.remove("hidden")
    VideFormTshirt();
    
}
function openModalAccessoire() {
    document.getElementById('ModalAccessoire').classList.remove('hidden');
    btnModifierAccessoire.classList.add("hidden")
    SaveAccessoire.classList.remove("hidden")
    VideFormAccessoire();
}

function closeModalMovie() {
    document.getElementById('ModalMovie').classList.add('hidden');
}
function closeModalTshirt() {
    document.getElementById('ModalTshirt').classList.add('hidden');
}
function closeModalAccessoire() {
    document.getElementById('ModalAccessoire').classList.add('hidden');
}
// ########################################################################################################################

let currentPage = 1;
const itemsPerPage = 3;


function paginateData(data, page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
}

function renderPagination(totalItems, selectedCategory) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    
    const maxPages = 4; // Nombre de pages visibles
    let startPage = Math.max(currentPage - Math.floor(maxPages / 2), 1);
    let endPage = Math.min(startPage + maxPages - 1, totalPages);
    
    if (endPage - startPage < maxPages - 1) startPage = Math.max(endPage - maxPages + 1, 1);

    // Afficher les pages avec "..."
    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = `px-4 py-2 rounded-md ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-300`;
        button.onclick = () => { currentPage = i; afficheTable(selectedCategory); renderPagination(totalItems, selectedCategory); };
        paginationContainer.appendChild(button);
    }

    if (startPage > 1) paginationContainer.insertAdjacentHTML('afterbegin', `<span class="px-4 py-2 text-gray-700"><i class="bi bi-caret-left-fill text-blue-600"></i></span>`);
    if (endPage < totalPages) paginationContainer.insertAdjacentHTML('beforeend', `<span class="px-4 py-2 text-gray-700"><i class="bi bi-caret-right-fill text-blue-600"></i></span>`);
}
// ########################################################  Affichage   ##################################################

function afficheTable(category) {
    const tableContainer = document.getElementById('table-container');
    const tableTitle = document.getElementById('table-title');
    const tableChange = document.getElementById('table-change');
    const ModelMovie = document.getElementById("ajouterMovie")
    const ModelTshirt = document.getElementById("ajouterTshirt")
    const ModelAccessoire = document.getElementById("ajouterAccessoire")

    tableContainer.classList.remove('hidden');

    

    if (category === 'clients') {

        ModelMovie.classList.add("hidden");
        ModelTshirt.classList.add("hidden");
        ModelAccessoire.classList.add("hidden");
        
        tableTitle.textContent = 'Clients Table';
        tableChange.innerHTML = `
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">User</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Email</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Date</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-t">
                    <td class="px-6 py-4 flex items-center">
                        <img class="w-10 h-10 rounded-full mr-3" src="https://via.placeholder.com/40" alt="John Michael">
                        <div>
                            <p class="font-semibold">John Michael</p>
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        <p class="text-gray-500 text-sm">john@creative-tim.com</p>
                    </td>
                    <td class="px-6 py-4 text-gray-600">23/04/18</td>
                    <td class="px-6 py-4" flex items-center>
                        <button  class=" px-4 py-2 rounded"><i class="bi bi-pencil-square text-blue-600"></i></button>
                        <button  class=" px-4 py-2 rounded ml-2"><i class="bi bi-trash text-red-600"></i></button>
                    </td>
                </tr>
            </tbody>
        `;
    }else if (category === 'Movie') {
        ModelMovie.classList.remove("hidden");
        ModelTshirt.classList.add("hidden");
        ModelAccessoire.classList.add("hidden");

        const paginatedMovie = paginateData(dataMovies, currentPage);

        tableTitle.textContent = 'Movie Table';
        tableChange.innerHTML = `
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Name</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Price</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Genre</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Production Date</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Duration</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Author</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Quantite</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Image</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Video</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Actions</th> 
                </tr>
            </thead>
            <tbody>
                ${paginatedMovie.map(Movie => `
                    <tr class="border-t">
                        <td class="px-6 py-4">${Movie.name}</td>
                        <td class="px-6 py-4">${Movie.price}</td>
                        <td class="px-6 py-4">${Movie.genre}</td>
                        <td class="px-6 py-4">${Movie.date}</td>
                        <td class="px-6 py-4">${Movie.dure}</td>
                        <td class="px-6 py-4">${Movie.autheur}</td>
                        <td class="px-6 py-4">${Movie.quantite}</td>
                        <td class="px-6 py-4"><img src="${Movie.image}" alt="Movie" class="w-16 h-16 object-cover"></td>
                        <td class="px-6 py-4">
                            <iframe src="${Movie.video}" width="100px"  height="50px"></iframe>
                        </td>
                        <td class="px-6 py-4 flex items-center">
                            <button onclick="ModifierMovie(${Movie.id})" class="px-4 py-2 rounded"><i class="bi bi-pencil-square text-blue-600"></i></button>
                            <button onclick="SupprimerMovie(${Movie.id})" class="px-4 py-2 rounded ml-2"><i class="bi bi-trash text-red-600"></i></button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        renderPagination(dataMovies.length, category);
    }else if (category === 'Tshirt') {
        ModelMovie.classList.add("hidden");
        ModelTshirt.classList.remove("hidden");
        ModelAccessoire.classList.add("hidden");

        const paginatedTshirt = paginateData(dataTshirt, currentPage);
    
        tableTitle.textContent = 'T-shirt Table';
        tableChange.innerHTML = `
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Title</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Description</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Price</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Quantite</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Images</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${paginatedTshirt.map(Tshirt => `
                    <tr class="border-t">
                        <td class="px-6 py-4">${Tshirt.name}</td>
                        <td class="px-6 py-4">${Tshirt.text}</td>
                        <td class="px-6 py-4">${Tshirt.price}</td>
                        <td class="px-6 py-4">${Tshirt.quantite}</td>
                        <td class="px-6 py-4">
                            <div class="flex space-x-2">
                                ${Tshirt.images.map(imageUrl => `
                                    <img src="${imageUrl}" alt="T-shirt Image" class="w-16 h-16 object-cover">
                                `).join('')}
                            </div>
                        </td>
                        <td class="px-6 py-4 flex items-center">
                            <button onclick="ModifierTshirt('${Tshirt.id}')" class="px-4 py-2 rounded"><i class="bi bi-pencil-square text-blue-600"></i></button>
                            <button onclick="SupprimerTshirt('${Tshirt.id}')" class="px-4 py-2 rounded ml-2"><i class="bi bi-trash text-red-600"></i></button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        renderPagination(dataTshirt.length, category);
    }else if (category === 'Accessoires') {

        ModelMovie.classList.add("hidden");
        ModelTshirt.classList.add("hidden");
        ModelAccessoire.classList.remove("hidden");

        const paginatedAccessoire = paginateData(dataAccessoire, currentPage);
    
        tableTitle.textContent = 'Accessoires Table';
        tableChange.innerHTML = `
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Title</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Description</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Price</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Quantite</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Images</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${paginatedAccessoire.map(accessoire => `
                    <tr class="border-t">
                        <td class="px-6 py-4">${accessoire.name}</td>
                        <td class="px-6 py-4">${accessoire.text}</td>
                        <td class="px-6 py-4">${accessoire.price}</td>
                        <td class="px-6 py-4">${accessoire.quantite}</td>
                        <td class="px-6 py-4">
                            <div class="flex space-x-2">
                                ${accessoire.images.map(image => `
                                    <img src="${image}" alt="${accessoire.name}" class="w-16 h-16 object-cover">
                                `).join('')}
                            </div>
                        </td>
                        <td class="px-6 py-4 flex items-center">
                            <button  onclick="ModifierAccessoire('${accessoire.id}')" class="px-4 py-2 rounded"><i class="bi bi-pencil-square text-blue-600"></i></button>
                            <button onclick="SupprimerAccessoire('${accessoire.id}')" class="px-4 py-2 rounded ml-2"><i class="bi bi-trash text-red-600"></i></button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        renderPagination(dataAccessoire.length, category);
    }
    
    
}

// #######################################################################################################################