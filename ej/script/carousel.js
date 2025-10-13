const items = [
{
    img: "images/Mexico.jpg",
    title: "Pack Sudeste Asiatico 600$",
    desc: "Vietnam y Cambodia, buses, hostales y guia de visados"
},
{
    img: "images/india.jpeg",
    title: "Pack India 1200$",
    desc: "New Dehli, y Mumbia, incluye JR Pass y hoteles"
},
{
    img: "images/Tanzania.jpeg",
    title: "Pack Tanzania 800$",
    desc: "Safaris por Tanzania, rutas, transporte y alojamiento"
}
];

let currentIndex = 0;

function updateCarousel(){
    const item = items[currentIndex]

    document.getElementById("carousel-img").src = item.img;
    document.getElementById("carousel-title").textContent = item.title;
    document.getElementById("carousel-desc").textContent = item.desc;

}

function changeCarouselLeft() {

    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
}

function changeCarouselRight() {

    currentIndex = (currentIndex + 1 + items.length) % items.length;
    updateCarousel();
}

setInterval(changeCarouselRight, 2000);