"use strict";
import { generateEmailTemplate } from "./generateEmailTemplate.js";

const showNotification = (message, type = "", callback = () => {}) => {
  const toastElement = document.getElementById("notification");
  const notificationMessage = document.getElementById("notification-message");
  const toast = new bootstrap.Toast(toastElement);

  toastElement.addEventListener("hide.bs.toast", callback);

  if (type == "success") {
    toastElement.classList.remove("text-bg-light");
    toastElement.classList.add("text-bg-success");
    notificationMessage.innerHTML =
      '<i class="fa fa-envelope me-2"></i>' + message;
  } else if (type == "loading") {
    toastElement.classList.remove("text-bg-success");
    toastElement.classList.add("text-bg-light");
    notificationMessage.innerHTML =
      '<i class="fa fa-spinner me-2"></i>' + message;
  }

  toast.show();
};

const sendMail = async (subject, email, message, successMessage) => {
  showNotification("Procesando solicitud.", "loading");
  const cuerpo = generateEmailTemplate(subject, message);
  const res = await fetch(
    "https://m76x7ulnva.execute-api.sa-east-1.amazonaws.com/sendMail",
    {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        de: '"Formulario de contacto" <contacto@statik.uy>',
        asunto: subject,
        mensaje: cuerpo,
        para: ["statikuy@gmail.com"],
      }),
    }
  );
  if (res) {
    console.log(res);
    showNotification(successMessage, "success");
    /* window.location.href = "/index.html"; */
  }
};

export { sendMail, showNotification };
