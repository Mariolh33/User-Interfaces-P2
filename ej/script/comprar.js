const pack = JSON.parse(localStorage.getItem("selectedPack"));

window.onload = () => {
    document.getElementById("pack-title").textContent = pack.title;
    document.getElementById("pack-price").textContent = pack.price;
    document.getElementById("pack-description").textContent = pack.desc;
    document.getElementById("pack-image").src = pack.img;
    document.getElementById("pack-image").alt = pack.alt;
};

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("comprarForm");
    const botonComprar = document.getElementById("btnComprar");
    const botonBorrar = document.getElementById("btnBorrar");
    const mensaje = document.getElementById("mensaje");

    form.addEventListener("submit", (e) => {

        e.preventDefault();
        mensaje.textContent = "";
        mensaje.style.color = "red";

        // Obtener valores
        const nombre = document.getElementById("NombreCompleto").value.trim();
        const email = document.getElementById("CorreoElectronico").value.trim();
        const tipoTarjeta = document.getElementById("TipodeTarjeta").value;
        const numerodeTarjeta = document.getElementById("NumerodeTarjeta").value;
        const nombreTitular = document.getElementById("NombreTitular").value.trim();
        const fechaCaudacidad = document.getElementById("FechadeCaudacidad").value;
        const cvv = document.getElementById("CVV").value;

        // === VALIDACIONES ===
        if (nombre.length < 3) return mostrarError("El nombre debe tener al menos 3 caracteres.");
        if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(nombre)) return mostrarError("El nombre solo puede contener letras.");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return mostrarError("El email no tiene un formato válido.");

        // tipo de tarjeta
        if (tipoTarjeta !== "Visa" && tipoTarjeta !== "Mastercard" && tipoTarjeta !== "American Express"){
            return mostrarError("Selecciona un tipo de tarjeta válido");
        }

        // longitud de tarjeta
        if (numerodeTarjeta.length !== 13 && numerodeTarjeta.length !== 15 && numerodeTarjeta.length !== 16 && numerodeTarjeta.length !== 19){
            return mostrarError("El número de tarjeta tiene una longitud incorrecta.");
        }

        if (nombreTitular.length < 3) return mostrarError("El nombre debe tener al menos 3 caracteres.");
        if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(nombreTitular)) return mostrarError("El nombre solo puede contener letras.");

        if (fechaCaudacidad) {
        const fecha = new Date(fechaCaudacidad);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fecha.getFullYear();
        if (fecha <= hoy)
            return mostrarError("Introduce una fecha de caudacidad válida.");
        } else {
            return mostrarError("Introduce una fecha de caudacidad.");
        }

        if (cvv.length !== 3) return mostrarError("CVV debe ser 3 digitos");

        // Si todo es correcto

        mensaje.style.color = "green";
        mensaje.textContent = "✅ Compra completado correctamente. Redirigiendo...";

        setTimeout(() => {
            window.location.href = "versionb.html";
            }, 1500);
    })

    // Clear form when Borrar is clicked
    botonBorrar.addEventListener("click", () => {
        form.reset();          
        return mostrarError("La forma a sido borrada")
    });

    function mostrarError(texto) {
        mensaje.textContent = texto;
    }

})
