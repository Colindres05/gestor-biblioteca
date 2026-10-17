"use strict";

// Clase 15: aplicación de demostración. La tabla inicia vacía.
// Los libros se guardan únicamente en el localStorage de este navegador.
const CLAVE_LIBROS = "gestor-biblioteca-libros";
let libros = [];

window.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");
  const formLibro = document.getElementById("form-libro");

  formLogin.addEventListener("submit", iniciarSesion);
  formLibro.addEventListener("submit", agregarLibro);
  document.getElementById("btn-salir").addEventListener("click", cerrarSesion);

  cargarLibros();
  renderizarLibros();
});

function iniciarSesion(evento) {
  evento.preventDefault();
  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value;
  const mensaje = document.getElementById("login-msg");

  if (usuario !== "admin" || clave !== "admin123") {
    mensaje.textContent = "Usuario o contraseña incorrectos.";
    return;
  }

  mensaje.textContent = "";
  document.getElementById("login").classList.add("oculto");
  document.getElementById("panel").classList.remove("oculto");
  document.getElementById("titulo").focus();
}

function cerrarSesion() {
  document.getElementById("panel").classList.add("oculto");
  document.getElementById("login").classList.remove("oculto");
  document.getElementById("form-login").reset();
  document.getElementById("form-libro").reset();
  document.getElementById("form-msg").textContent = "";
  document.getElementById("usuario").focus();
}

function cargarLibros() {
  try {
    const valor = localStorage.getItem(CLAVE_LIBROS);
    const recuperados = valor ? JSON.parse(valor) : [];
    libros = Array.isArray(recuperados) ? recuperados : [];
  } catch (_error) {
    libros = [];
  }
}

function guardarLibros() {
  localStorage.setItem(CLAVE_LIBROS, JSON.stringify(libros));
}

function agregarLibro(evento) {
  evento.preventDefault();
  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();
  const copias = Number(document.getElementById("copias").value);
  const mensaje = document.getElementById("form-msg");

  if (!titulo || !autor) {
    mensaje.textContent = "El título y el autor son obligatorios.";
    return;
  }

  // VALIDACIÓN CLAVE: Integrante 2 introduce la falla aquí en su propia rama.
  // Integrante 3 deberá restaurar esta validación sin modificar las pruebas.
  if (!Number.isInteger(copias) || copias <= 0) {
    mensaje.textContent = "El número de copias debe ser mayor que 0.";
    return;
  }

  libros.push({ id: Date.now().toString() + Math.random().toString(36).slice(2), titulo, autor, copias });
  guardarLibros();
  renderizarLibros();
  mensaje.textContent = "";
  document.getElementById("form-libro").reset();
  document.getElementById("titulo").focus();
}

function eliminarLibro(id) {
  libros = libros.filter((libro) => libro.id !== id);
  guardarLibros();
  renderizarLibros();
}

function renderizarLibros() {
  const tabla = document.getElementById("tabla-libros");
  tabla.replaceChildren();

  libros.forEach((libro) => {
    const fila = document.createElement("tr");
    fila.className = "fila";

    const titulo = document.createElement("td");
    titulo.className = "col-titulo";
    titulo.textContent = libro.titulo;

    const autor = document.createElement("td");
    autor.textContent = libro.autor;

    const copias = document.createElement("td");
    const contador = document.createElement("span");
    contador.className = "copy-count";
    contador.textContent = String(libro.copias);
    copias.appendChild(contador);

    const accion = document.createElement("td");
    accion.className = "row-action";
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn-eliminar";
    boton.textContent = "Eliminar";
    boton.setAttribute("aria-label", `Eliminar ${libro.titulo}`);
    boton.addEventListener("click", () => eliminarLibro(libro.id));
    accion.appendChild(boton);

    fila.append(titulo, autor, copias, accion);
    tabla.appendChild(fila);
  });

  document.getElementById("total-libros").textContent = String(libros.length);
  document.getElementById("pill-libros").textContent = String(libros.length);
  document.getElementById("total-copias").textContent = String(libros.reduce((total, libro) => total + libro.copias, 0));
  document.getElementById("empty-state").classList.toggle("oculto", libros.length !== 0);
}
