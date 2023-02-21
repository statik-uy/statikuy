"use strict";
import { sendMail, showNotification } from "../utils.js";

const formulario = document.getElementById("formulario-contacto");

const opciones = {
  1: "Accidente de transito",
  2: "Derecho de Seguros",
  3: "Derecho Penal",
  4: "Derecho Civil",
  5: "Servicios Notariales",
};

if (formulario) {
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    showNotification("Procesando solicitud");
    const campos = ["nombre", "telefono", "email"];
    console.log(event.target.mensaje.value);
    let cuerpo = ``;

    campos.forEach((campo) => {
      cuerpo += `<strong>${event.target[campo].name.toUpperCase()}</strong>: ${
        event.target[campo].value
      } <br/>`;
    });

    cuerpo += `<br/><strong>${event.target.mensaje.name.toUpperCase()}</strong>: ${
      event.target.mensaje.value
    } <br/>`;

    sendMail(
      "Solicitud de contacto",
      event.target.email.value,
      cuerpo,
      "Su solicitud de contacto fue enviada!"
    );
    formulario.reset();
  });
}
