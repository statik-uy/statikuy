"use strict";
import { sendMail, showNotification } from "../utils.js";

const formulario = document.getElementById("formulario-contacto");

const opciones = {
  1: "Página Web",
  2: "Redes Sociales",
  3: "Publicidad",
  4: "Página WEB + Redes Sociales + Publicidad",
  5: "Otro (especifique en mensaje)"
};

if (formulario) {
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    showNotification("Procesando solicitud");
    const campos = ["nombre", "telefono", "email"];
    let cuerpo = ``;

    campos.forEach((campo) => {
      cuerpo += `<strong>${event.target[campo].name.toUpperCase()}</strong>: ${
        event.target[campo].value
      } <br/>`;
    });

    cuerpo += `<strong>${event.target.servicio.name.toUpperCase()}</strong>: ${
      opciones[event.target.servicio.value]
    } <br/>`;

    cuerpo += `<br/><strong>${event.target.mensaje.name.toUpperCase()}</strong>: ${
      event.target.mensaje.value
    } <br/>`;

    sendMail(
      "Solicitud de contacto",
      event.target.nombre.value,
      cuerpo,
      "Su solicitud de contacto fue enviada!"
    );
    formulario.reset();
  });
}
