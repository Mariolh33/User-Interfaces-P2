function iniciarSesion() {
  const usernameInput = document.getElementById("usernameLogin").value;
  const passwordInput = document.getElementById("passwordLogin").value;

  if (!usernameInput || !passwordInput) {
    alert("Por favor, complete ambos campos.");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios != null) {
    let usernameLogin = usernameInput;
    let passwordLogin = passwordInput;

    let encontrado = false;
    let usuarioEncontrado = null;

    for (let u of usuarios) {
      if (u.username === usernameLogin && u.password === passwordLogin) {
        encontrado = true;
        usuarioEncontrado = u;
        break;
      }
    }

    if (encontrado) {
      //  Guardar sesión activa y usuario actual
      sessionStorage.setItem("loginValido", "true");
      sessionStorage.setItem("usuarioLogueado", usuarioEncontrado.username);

      // Redirigir
      window.location.href = "versionb.html";
    } else {
      alert("Credenciales erróneas");
      document.getElementById("usernameLogin").value = "";
      document.getElementById("passwordLogin").value = "";
    }
  }
}


function cerrarSesion() {
  const popup = document.getElementById("popupCerrarSesion");
  popup.style.display = "flex";

  const confirmar = document.getElementById("confirmarCerrar");
  const cancelar = document.getElementById("cancelarCerrar");

  confirmar.onclick = () => {
    sessionStorage.setItem("loginValido", "false");
    sessionStorage.removeItem("usuarioLogueado");
    window.location.href = "index.html";
  };

  cancelar.onclick = () => {
    popup.style.display = "none";
  };
}


function validaSesion() {
	if (sessionStorage.getItem("loginValido") != "true") {
		window.location.href = "index.html";
	} 
}

function cargarUsuario() {
    const loginValido = sessionStorage.getItem("loginValido");
    const usernameLogueado = sessionStorage.getItem("usuarioLogueado");

    if (loginValido !== "true" || !usernameLogueado) {
        // Puedes comentar la redirección mientras pruebas
        // window.location.href = "index.html";
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.username === usernameLogueado);

    if (!usuario) return;

    // Aquí actualizamos la foto y el nombre
    document.getElementById("nombreUsuario").textContent = usuario.nombre + " " + usuario.apellido;
    document.getElementById("fotoPerfil").src = usuario.foto; // <--- base64 desde localStorage
}

document.addEventListener("DOMContentLoaded", cargarUsuario);
