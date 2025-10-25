document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");
  const aceptar = document.getElementById("acepto");
  const boton = document.getElementById("btnRegistrar");
  const mensaje = document.getElementById("mensaje");

  // 🔸 Deshabilitar botón hasta que acepte la política
  boton.disabled = !aceptar.checked;
  aceptar.addEventListener("change", () => {
    boton.disabled = !aceptar.checked;

    // Muestra mensaje dinámico si desmarca
    if (!aceptar.checked) {
      mostrarError("Debes aceptar la política de privacidad para continuar.");
    } else {
      mensaje.textContent = "";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    mensaje.textContent = "";
    mensaje.style.color = "red";

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const confirmarEmail = document.getElementById("confirmar-email").value.trim();
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const foto = document.getElementById("foto-perfil").files[0];

    // === VALIDACIONES ===
    if (nombre.length < 3) return mostrarError("❌ El nombre debe tener al menos 3 caracteres.");
    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{3,}$/.test(nombre)) return mostrarError("❌ El nombre solo puede contener letras.");

    const apellidos = apellido.split(" ");
    if (apellidos.length < 2 || apellidos.some(a => a.length < 3))
      return mostrarError("❌ El apellido debe contener al menos dos palabras de 3 caracteres cada una.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return mostrarError("❌ El email no tiene un formato válido.");
    if (email !== confirmarEmail) return mostrarError("❌ Los correos no coinciden.");

    if (fechaNacimiento) {
      const fecha = new Date(fechaNacimiento);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fecha.getFullYear();
      if (fecha > hoy || edad < 10 || edad > 120)
        return mostrarError("❌ Introduce una fecha de nacimiento válida.");
    } else {
      return mostrarError("❌ Introduce una fecha de nacimiento.");
    }

    if (username.length < 5)
      return mostrarError("❌ El nombre de usuario debe tener al menos 5 caracteres.");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password))
      return mostrarError("❌ La contraseña debe tener al menos 8 caracteres, 2 números, 1 símbolo, 1 mayúscula y 1 minúscula.");

    if (!foto) return mostrarError("❌ Debe seleccionar una foto de perfil.");
    const extensionesPermitidas = ["image/webp", "image/png", "image/jpeg"];
    if (!extensionesPermitidas.includes(foto.type))
      return mostrarError("❌ Formato de imagen no válido. Solo se permiten .webp, .png y .jpg.");

    if (!aceptar.checked)
      return mostrarError("❌ Debes aceptar la política de privacidad antes de continuar.");

    // === SI TODO ES CORRECTO ===
    const reader = new FileReader();

    reader.onload = function (e) {
      const fotoBase64 = e.target.result;
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const usuario = {
        nombre,
        apellido,
        email,
        fechaNacimiento,
        username,
        password,
        foto: fotoBase64
      };

      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      sessionStorage.setItem("usuarioLogueado", username);
      sessionStorage.setItem("loginValido", "true");

      mensaje.style.color = "green";
      mensaje.textContent = "✅ Registro completado correctamente. Redirigiendo...";

      setTimeout(() => {
        window.location.href = "versionb.html";
      }, 1500);
    };

    reader.readAsDataURL(foto);
  });

  // === FUNCIÓN PARA MOSTRAR ERRORES ===
  function mostrarError(texto) {
    mensaje.textContent = texto;
    mensaje.style.color = "red";
    mensaje.style.fontWeight = "bold";
    mensaje.style.animation = "parpadeo 0.3s ease-in-out 2";
  }

  // Pequeña animación opcional de parpadeo para errores
  const estilo = document.createElement("style");
  estilo.textContent = `
    @keyframes parpadeo {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;
  document.head.appendChild(estilo);
});
