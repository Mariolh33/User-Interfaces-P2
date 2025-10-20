const pack = JSON.parse(localStorage.getItem("selectedPack"));

window.onload = () => {
    document.getElementById("pack-title").textContent = pack.title;
    document.getElementById("pack-price").textContent = pack.price;
    document.getElementById("pack-description").textContent = pack.desc;
    document.getElementById("pack-image").src = pack.img;
    document.getElementById("pack-image").alt = pack.alt;
};
