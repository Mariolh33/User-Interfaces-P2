
// Initial consejos in localStorage
let consejos = JSON.parse(localStorage.getItem("consejos")) || [
    { title: "Ahorrar Dinero", desc: "Como ahorrar dinero" },
    { title: "Viajar con Seguro", desc: "Viajar con Seguro" },
    { title: "Buena Comida", desc: "Buena Comida" }
];

// Renders consejos on window loads
function renderConsejos() {
    for (let i = 0; i < 3; i++) {
        document.getElementById(`consejos${i+1}Titulo`).textContent = consejos[i].title;
        document.getElementById(`consejos${i+1}Descripcion`).textContent = consejos[i].desc;
    }

    console.log(consejos);
}

// Adds a consejo to a stack in local storage
// if consejos > 3 then it pops from the stack

function addConsejo(titulo, descripcion) {

    const consejo = { 
        title: titulo,
        desc: descripcion 
    };

    consejos.unshift(consejo);

    localStorage.setItem("consejos", JSON.stringify(consejos));
    renderConsejos();
}

// Listening for submissions of consejos form
document.addEventListener("DOMContentLoaded", () => {

    renderConsejos();

    const form = document.getElementById("consejoForm");
    const mensaje = document.getElementById("consejoError");

    
    form.addEventListener("submit", (e) => {
        
        e.preventDefault();

        mensaje.textContent = "";
        mensaje.style.color = "red";

        const titulo = document.getElementById("consejoTitulo").value
        const descripcion = document.getElementById("consejoDescripcion").value

                // === VALIDACIONES ===
        if (titulo.length < 15) return mostrarError("El titulo debe tener al menos 15 caracteres.");
        if (descripcion.length < 30) return mostrarError("La descripcion debe tener al menos 30 caracteres.");

        addConsejo(titulo, descripcion)
    })

    function mostrarError(texto) {
        mensaje.textContent = texto;
    }
})