const packs = [
    {
        title: "Pack Sudeste Asiatico",
        price: "600€",
        descShort: "Disfruta una adventura maravillosa por tres paises en el Sudeste de Asia.",
        desc: "Disfruta una adventura maravillosa por tres paises en el Sudeste de Asia.\nEn este pack, incluimos un bus que te llevara por las ciudades y la naturaleza de estos paises.\nDisfruta con otros viajadores que han comprado el mismo pack. Tambien inluye el alojamiento y comida durante el viaje.",
        img: "./images/Vietnam.jpeg",
        alt: "Vietnam"
    },
    {
        title: "Pack India",
        price: "1200€",
        descShort: "New Dehli, y Mumbia, incluye JR Pass y hoteles",
        desc: "New Dehli, y Mumbia, incluye JR Pass y hoteles",
        img: "./images/india.jpeg",
        alt: "India"
        
    },
    {
        title: "Pack Tanzania",
        price: "800€",
        descShort: "Safaris por Tanzania, rutas, transporte y alojamiento",
        desc: "Safaris por Tanzania, rutas, transporte y alojamiento",
        img: "./images/Tanzania.jpeg",
        alt: "Tanzania"
    }
]

let currentIndex = 0;

function navigateToBuy(){
    localStorage.setItem("selectedPack", JSON.stringify(packs[currentIndex]));
    window.location.href='comprar.html';
}


function updateCarousel(){
    const pack = packs[currentIndex]
    document.getElementById("carousel-img").src = pack.img;
    document.getElementById("carousel-title").textContent = pack.title;
    document.getElementById("carousel-desc").textContent = pack.descShort;

}

function changeCarouselLeft() {

    currentIndex = (currentIndex - 1 + packs.length) % packs.length;
    updateCarousel();
}

function changeCarouselRight() {

    currentIndex = (currentIndex + 1 + packs.length) % packs.length;
    updateCarousel();
}

setInterval(changeCarouselRight, 2000);