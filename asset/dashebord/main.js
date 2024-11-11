const SaveMovie = document.getElementById("SaveMovie");
// ############################################################  remplissage movie  ###############################################################
let dataMovies = JSON.parse(localStorage.getItem("movie")) || [] ;
let indexMovie =dataMovies.length;

SaveMovie.addEventListener("click", function (e) {
    e.preventDefault();
    btnModifierMovie.classList.toggle("hidden");

    const nameMovie = document.querySelector("#nameMovie").value;
    const textareaMovie = document.querySelector("#textareaMovie").value;
    const priceMovie = document.querySelector("#priceMovie").value;
    const GenreMovie = document.querySelector("#GenreMovie").value;
    const dateMovie = document.querySelector("#dateMovie").value;
    const duréMovie = document.querySelector("#duréMovie").value;
    const autheurMovie = document.querySelector("#autheurMovie").value;
    const imageMovie = document.querySelector("#imageMovie").files[0]; 
    const vidéoMovie = document.querySelector("#vidéoMovie").files[0];

    if (!nameMovie || !textareaMovie || !priceMovie || !GenreMovie || !dateMovie || !duréMovie || !autheurMovie || !imageMovie || !vidéoMovie) {
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
                id: indexMovie++,
                name: nameMovie,
                text: textareaMovie,
                price: priceMovie,
                genre: GenreMovie,
                date: dateMovie,
                dure: duréMovie,
                autheur: autheurMovie,
                image: imageUrl, 
                video: videoUrl,
            };

            dataMovies.push(Movie);
            localStorage.setItem("movie", JSON.stringify(dataMovies));
            VideFormMovie();
            afficheTable();
        };

        readerVideo.readAsDataURL(vidéoMovie); // Lire le fichier vidéo en tant qu'URL
    };

    readerImage.readAsDataURL(imageMovie); // Lire le fichier image en tant qu'URL
    closeModalMovie();
});

// supprimer movie
function SupprimerMovie(id) {

    const index = dataMovies.findIndex((movie) => movie.id === id);
    dataMovies.splice(index, 1);
    localStorage.setItem("movie", JSON.stringify(dataMovies));
    afficheTable();
}

const btnModifierMovie = document.getElementById("SaveModiferMovie");

function ModifierMovie(id) {
    openModalMovie(); 
    SaveMovie.classList.add("hidden");
    btnModifierMovie.classList.toggle("hidden");

    const movie = dataMovies.find((movie) => movie.id === id);

    document.querySelector("#nameMovie").value = movie.name;
    document.querySelector("#textareaMovie").value = movie.text;
    document.querySelector("#priceMovie").value = movie.price;
    document.querySelector("#GenreMovie").value = movie.genre;
    document.querySelector("#dateMovie").value = movie.date;
    document.querySelector("#duréMovie").value = movie.dure;
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
        movie.autheur = autheurMovie;

        localStorage.setItem("movie", JSON.stringify(dataMovies));

        closeModalMovie();
        afficheTable(); 
    }
}



// ###################################################################################################################################
const SaveTshirt = document.getElementById("SaveTshir");

// ############################################################  remplissage T-shirt  ################################################
let dataTshirt = JSON.parse(localStorage.getItem("Tshirt")) || [];
let indexTshirt = dataTshirt.length

SaveTshirt.addEventListener("click", function (e) {
    e.preventDefault();

    btnModifierTshirt.classList.add("hidden");

    const titleTshirt = document.querySelector("#titleTshirt").value;
    const textareaTshirt = document.querySelector("#textTshirt").value;
    const priceTshirt = document.querySelector("#priceTshirt").value;
    const imagesInput = document.querySelector("#imageTshirt").files;

    if (!titleTshirt || !textareaTshirt || !priceTshirt || imagesInput.length === 0) {
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
                    id: indexTshirt++,
                    name: titleTshirt,
                    text: textareaTshirt,
                    price: priceTshirt,
                    images: imageUrls
                };

                dataTshirt.push(Tshirt);
                localStorage.setItem("Tshirt", JSON.stringify(dataTshirt));
                VideFormTshirt();
            }
        };
        reader.readAsDataURL(file);
    });
    closeModalTshirt();
});

// supprimer T-shirt
function SupprimerTshirt(id) {

    const index = dataTshirt.findIndex((Tshirt) => Tshirt.id === id);
    dataTshirt.splice(index, 1);
    localStorage.setItem("Tshirt", JSON.stringify(dataTshirt));
    afficheTable();
}

const btnModifierTshirt = document.getElementById("SaveModiferTshir");

function ModifierTshirt(id) {
    openModalTshirt(); 

    SaveTshirt.classList.add("hidden");
    btnModifierTshirt.classList.remove("hidden");

    const Tshirt = dataTshirt.find((tshirt) => tshirt.id === id);

    document.querySelector("#titleTshirt").value = Tshirt.name;
    document.querySelector("#textTshirt").value = Tshirt.text;
    document.querySelector("#priceTshirt").value = Tshirt.price;


    btnModifierTshirt.onclick = function(e) {
        e.preventDefault();

        const titleTshirt = document.querySelector("#titleTshirt").value;
        const textareaTshirt = document.querySelector("#textTshirt").value;
        const priceTshirt = document.querySelector("#priceTshirt").value;
        const imagesTshirt = document.querySelector("#imageTshirt").files;

        if (imagesTshirt && imagesTshirt.length > 0) {
            let imagesDataUrls = [];
            let loadedImages = 0; // Compteur pour vérifier quand toutes les images sont chargées

            Array.from(imagesTshirt).forEach((imageFile) => {
                const readerImage = new FileReader();

                readerImage.onload = function(event) {
                    imagesDataUrls.push(event.target.result);
                    loadedImages++;


                    if (loadedImages === imagesTshirt.length) {
                        Tshirt.images = imagesDataUrls;  // Mettre à jour les images du Tshirt

                        // Mise à jour des autres informations
                        Tshirt.name = titleTshirt;
                        Tshirt.text = textareaTshirt;
                        Tshirt.price = priceTshirt;

                        // Sauvegarder les modifications dans localStorage
                        localStorage.setItem("Tshirt", JSON.stringify(dataTshirt));

                        closeModalTshirt();
                        afficheTable(); // Mettre à jour l'affichage
                    }
                };

                readerImage.readAsDataURL(imageFile);
            });

        }
    };
}






// #####################################################################################################################################
const SaveAccessoire = document.getElementById("SaveAccessoire");
// ############################################################  remplissage T-shirt  ################################################

let dataAccessoire = JSON.parse(localStorage.getItem("Accessoire")) || [];
let indexAccessoire = dataAccessoire.length;

SaveAccessoire.addEventListener("click", function (e) {
    e.preventDefault();

    const titleAccessoire = document.querySelector("#titleAccessoire").value;
    const textareaAccessoire = document.querySelector("#textAccessoire").value;
    const priceAccessoire = document.querySelector("#priceAccessoire").value;
    const imagesInput = document.querySelector("#imageAccessoire").files;

    if (!titleAccessoire || !textareaAccessoire || !priceAccessoire || imagesInput.length === 0) {
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
                    id: indexAccessoire++,
                    name: titleAccessoire,
                    text: textareaAccessoire,
                    price: priceAccessoire,
                    images: imageUrls
                };

                dataAccessoire.push(Accessoire);
                localStorage.setItem("Accessoire", JSON.stringify(dataAccessoire));
                VideFormAccessoire();
            }
        };
        reader.readAsDataURL(file);
    });
    closeModalAccessoire();
});

// supprimer Accessoire
function SupprimerAccessoire(id) {

    const index = dataAccessoire.findIndex((Accessoire) => Accessoire.id === id);
    dataAccessoire.splice(index, 1);
    localStorage.setItem("Accessoire", JSON.stringify(dataAccessoire));
    afficheTable();
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
    
        tableTitle.textContent = 'Movie Table';
        tableChange.innerHTML = `
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Name</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Description</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Price</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Genre</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Production Date</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Duration</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Author</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Image</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Video</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Actions</th> 
                </tr>
            </thead>
            <tbody>
                ${dataMovies.map(Movie => `
                    <tr class="border-t">
                        <td class="px-6 py-4">${Movie.name}</td>
                        <td class="px-6 py-4">${Movie.text}</td>
                        <td class="px-6 py-4">${Movie.price}</td>
                        <td class="px-6 py-4">${Movie.genre}</td>
                        <td class="px-6 py-4">${Movie.date}</td>
                        <td class="px-6 py-4">${Movie.dure}</td>
                        <td class="px-6 py-4">${Movie.autheur}</td>
                        <td class="px-6 py-4"><img src="${Movie.image}" alt="Movie" class="w-16 h-16 object-cover"></td>
                        <td class="px-6 py-4">
                            <video controls width="120px" height="120px">
                                <source src="${Movie.video}" type="video/mp4">
                            </video>
                        </td>
                        <td class="px-6 py-4 flex items-center">
                            <button onclick="ModifierMovie(${Movie.id})" class="px-4 py-2 rounded"><i class="bi bi-pencil-square text-blue-600"></i></button>
                            <button onclick="SupprimerMovie(${Movie.id})" class="px-4 py-2 rounded ml-2"><i class="bi bi-trash text-red-600"></i></button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
    }else if (category === 'Tshirt') {
        ModelMovie.classList.add("hidden");
        ModelTshirt.classList.remove("hidden");
        ModelAccessoire.classList.add("hidden");
    
        tableTitle.textContent = 'T-shirt Table';
        tableChange.innerHTML = `
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Title</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Description</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Price</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Images</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${dataTshirt.map(Tshirt => `
                    <tr class="border-t">
                        <td class="px-6 py-4">${Tshirt.name}</td>
                        <td class="px-6 py-4">${Tshirt.text}</td>
                        <td class="px-6 py-4">${Tshirt.price}</td>
                        <td class="px-6 py-4">
                            <div class="flex space-x-2">
                                ${Tshirt.images.map(imageUrl => `
                                    <img src="${imageUrl}" alt="T-shirt Image" class="w-16 h-16 object-cover">
                                `).join('')}
                            </div>
                        </td>
                        <td class="px-6 py-4 flex items-center">
                            <button onclick="ModifierTshirt(${Tshirt.id})" class="px-4 py-2 rounded"><i class="bi bi-pencil-square text-blue-600"></i></button>
                            <button onclick="SupprimerTshirt(${Tshirt.id})" class="px-4 py-2 rounded ml-2"><i class="bi bi-trash text-red-600"></i></button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
    }else if (category === 'Accessoires') {

        ModelMovie.classList.add("hidden");
        ModelTshirt.classList.add("hidden");
        ModelAccessoire.classList.remove("hidden");
    
        tableTitle.textContent = 'Accessoires Table';
        tableChange.innerHTML = `
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Title</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Description</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Price</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Images</th>
                    <th class="px-6 py-3 text-gray-600 font-medium uppercase">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${dataAccessoire.map(accessoire => `
                    <tr class="border-t">
                        <td class="px-6 py-4">${accessoire.name}</td>
                        <td class="px-6 py-4">${accessoire.text}</td>
                        <td class="px-6 py-4">${accessoire.price}</td>
                        <td class="px-6 py-4">
                            <div class="flex space-x-2">
                                ${accessoire.images.map(image => `
                                    <img src="${image}" alt="${accessoire.name}" class="w-16 h-16 object-cover">
                                `).join('')}
                            </div>
                        </td>
                        <td class="px-6 py-4 flex items-center">
                            <button class="px-4 py-2 rounded"><i class="bi bi-pencil-square text-blue-600"></i></button>
                            <button onclick="SupprimerAccessoire(${accessoire.id})" class="px-4 py-2 rounded ml-2"><i class="bi bi-trash text-red-600"></i></button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
    }
    
    
}

// #######################################################################################################################