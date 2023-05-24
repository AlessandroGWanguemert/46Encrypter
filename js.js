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
/*-------------------Cargar-particulas---------------------------*/
  $.ajax({
    url: 'particlesjs-config.json',
    dataType: 'json',
    success: function(data) {
      // Llamada a la función de inicialización de particles.js con la configuración cargada
      particlesJS('particles-js', data);
    }
  });
  /*----------------------------Switch-btn------------------------------- */
  $(document).ready(function() {
    $(".Decrypt").on("click", function() {
      $("#encriptar-btn").text("Decrypt");
      $("#encriptar-btn").addClass("Color1")
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
        $("#texto-a-encriptar").val(textoEncriptado);
      }
    });
  });

  function encriptarTexto(texto) {
    if (texto.length > 200 || !/^[a-zA-Z\s]+$/.test(texto)) {
      return null;
    }

    let palabras = texto.trim().split(" ");
    let palabrasEncriptadas = [];

    for (let i = 0; i < palabras.length; i++) {
      let palabra = palabras[i];
      let palabraEncriptada = "";

      for (let j = 0; j < palabra.length; j++) {
        let caracter = palabra[j];

        let codigoAscii = caracter.charCodeAt(0);
        let codigoEncriptado = Math.round((codigoAscii * 60) / 4);
        palabraEncriptada += codigoEncriptado + "00";
      }

      palabrasEncriptadas.push(palabraEncriptada.trim());
    }

    let textoEncriptado = palabrasEncriptadas.join(" ");

    return textoEncriptado;
  }

  function desencriptarTexto(texto) {
    let palabrasEncriptadas = texto.trim().split(" ");
    let palabrasDesencriptadas = [];

    for (let i = 0; i < palabrasEncriptadas.length; i++) {
      let palabraEncriptada = palabrasEncriptadas[i];

      let numerosEncriptados = palabraEncriptada.split(/(?<=\d{4})00/);
      let palabraDesencriptada = "";

      for (let j = 0; j < numerosEncriptados.length; j++) {
        let numeroEncriptado = parseInt(numerosEncriptados[j]);

        let codigoAscii = Math.round((numeroEncriptado * 4) / 60);
        let caracterDesencriptado = String.fromCharCode(codigoAscii);
        palabraDesencriptada += caracterDesencriptado;
      }

      palabrasDesencriptadas.push(palabraDesencriptada);
    }

    let textoDesencriptado = palabrasDesencriptadas.join(" ");

    return textoDesencriptado;
  }
};

