window.onload = function() {
  $(document).ready(function() {
    setTimeout(function() {
      $("nav").addClass("show");
      $(".Container").addClass("show");
      $(".h14").addClass("show");
      $(".h16").addClass("show");
      $(".Encrypth1").addClass("show");
    }, 200);
  });

  /*----------------------------Switch-btn------------------------------- */
  $(document).ready(function() {
    $(".Decrypt").on("click", function() {
      $("#encriptar-btn").text("Decrypt");
    });

    $(".Encrypt").on("click", function() {
      $("#encriptar-btn").text("Encrypt");
    });
  });

  /*----------------------------Encrypt-Decrypt-----------------------------*/
  $(document).ready(function() {
    $("#encriptar-btn").click(function() {
      let texto = $("#texto-a-encriptar").val();
      let textoEncriptado;

      if ($("#encriptar-btn").text() === "Encrypt") {
        textoEncriptado = encriptarTexto(texto);
        if (textoEncriptado !== null) {
          $("#texto-a-encriptar").val(textoEncriptado);
        } else {
          alert("Error: Solo se permiten letras y espacios en blanco, y el texto debe tener un máximo de 200 caracteres.");
        }
      } else if ($("#encriptar-btn").text() === "Decrypt") {
        textoEncriptado = desencriptarTexto(texto);
        if (textoEncriptado !== null) {
          $("#texto-a-encriptar").val(textoEncriptado);
        } else {
          alert("Error: El texto debe tener un máximo de 200 caracteres y solo puede contener números separados por espacios.");
        }
      }
    });
  });

  function esNumeroSeparadoPorEspacio(texto) {
    return /^(\d+\s)*\d+$/.test(texto);
  }

  function encriptarTexto(texto) {
    if (texto.length > 200 || !/^[a-zA-Z\s]+$/.test(texto)) {
      return null;
    }

    let textoEncriptado = "";

    for (let i = 0; i < texto.length; i++) {
      let caracter = texto[i];

      if (caracter === " ") {
        textoEncriptado += " ";
      } else {
        let codigoAscii = texto.charCodeAt(i);
        let codigoEncriptado = Math.round((codigoAscii * 60) / 4);
        textoEncriptado += codigoEncriptado + "00";
      }
    }

    return textoEncriptado.trim();
  }

  function desencriptarTexto(texto) {
    if (texto.length > 200) {
      return null;
    }

    let palabrasEncriptadas = texto.trim().split(" ");
    let palabrasDesencriptadas = [];

    for (let i = 0; i < palabrasEncriptadas.length; i++) {
      let palabraEncriptada = palabrasEncriptadas[i];

      if (palabraEncriptada === "") {
        continue;
      }

      let numerosEncriptados = palabraEncriptada.split("00");
      let palabraDesencriptada = "";

      for (let j = 0; j < numerosEncriptados.length; j++) {
        let numeroEncriptado = parseInt(numerosEncriptados[j]);

        if (isNaN(numeroEncriptado)) {
          return null;
        }

        let codigoAscii = Math.round((numeroEncriptado * 4) / 60);
        let caracterDesencriptado = String.fromCharCode(codigoAscii);
        palabraDesencriptada += caracterDesencriptado;
      }

      palabrasDesencriptadas.push(palabraDesencriptada);
    }

    let textoDesencriptado = palabrasDesencriptadas.join(" ");

    // Eliminar "00" que sean continuación de una secuencia de 4 números
    textoDesencriptado = textoDesencriptado.replace(/(\d{4})00/g, "$1");

    return textoDesencriptado;
  }
};

