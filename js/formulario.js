document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-contato");

  if (!form) {
    return;
  }

  const fields = [
    {
      input: form.querySelector("#nome"),
      error: form.querySelector("#nome-error"),
      messages: {
        valueMissing: "Informe seu nome completo.",
      },
    },
    {
      input: form.querySelector("#email"),
      error: form.querySelector("#email-error"),
      messages: {
        valueMissing: "Informe seu e-mail.",
        typeMismatch: "Informe um e-mail válido.",
      },
    },
  ];

  function setFieldError(field, message) {
    const { input, error } = field;

    if (!input || !error) {
      return;
    }

    if (message) {
      input.setAttribute("aria-invalid", "true");
      error.textContent = message;
      return;
    }

    input.removeAttribute("aria-invalid");
    error.textContent = "";
  }

  function getFieldMessage(field, mode = "submit") {
    const { input, messages } = field;

    if (!input) {
      return "";
    }

    const value = input.value.trim();

    if (input.required && value === "") {
      return messages.valueMissing || "Preencha este campo.";
    }

    if (mode !== "input" && input.type === "email" && input.validity.typeMismatch) {
      return messages.typeMismatch || "Preencha este campo corretamente.";
    }

    return "";
  }

  function validateField(field, mode = "submit") {
    const { input, error } = field;

    if (!input || !error) {
      return true;
    }

    const message = getFieldMessage(field, mode);
    setFieldError(field, message);

    return message === "";
  }

  form.addEventListener("submit", (event) => {
    let firstInvalidInput = null;

    fields.forEach((field) => {
      const isValid = validateField(field, "submit");

      if (!isValid && !firstInvalidInput) {
        firstInvalidInput = field.input;
      }
    });

    if (firstInvalidInput) {
      event.preventDefault();
      firstInvalidInput.focus();
    }
  });

  fields.forEach((field) => {
    const { input } = field;

    if (!input) {
      return;
    }

    input.addEventListener("input", () => {
      validateField(field, "input");
    });

    input.addEventListener("blur", () => {
      validateField(field, "blur");
    });
  });
});
