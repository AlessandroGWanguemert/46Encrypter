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

let previousWidth = window.innerWidth;

function cargarPlantillaConfiguracion() {
  if (window.innerWidth < 786) {
    cargarConfiguracion2('particlesjs-config2.json');
  } else {
    cargarConfiguracion('particlesjs-config.json');
  }
}

function cargarConfiguracion(ruta) {
  $.ajax({
    url: ruta,
    dataType: 'json',
    success: function(data) {
      particlesJS('particles-js', data);
    }
  });
}

function cargarConfiguracion2(ruta) {
  $.ajax({
    url: ruta,
    dataType: 'json',
    success: function(data) {
      particlesJS('particles-js', data);
    }
  });
}

function cargarPlantillaConfiguracionSegunAnchoPantalla() {
  const currentWidth = window.innerWidth;
  if (currentWidth < 786 && previousWidth >= 786) {
    cargarPlantillaConfiguracion();
  } else if (currentWidth >= 786 && previousWidth < 786) {
    cargarPlantillaConfiguracion();
  }
  previousWidth = currentWidth;
}

cargarPlantillaConfiguracion();
window.addEventListener('resize', cargarPlantillaConfiguracionSegunAnchoPantalla);



 /*----------------------------Switch-btn------------------------------- */
  $(document).ready(function() {
    $(".Decrypt").on("click", function() {
      $("#encriptar-btn").text("Decrypt");
      $("#encriptar-btn").addClass("Color2")
      $(".Decrypt").addClass("Color22")
      $("#encriptar-btn").removeClass("Color1")
     
    });

    $(".Encrypt").on("click", function() {
      $("#encriptar-btn").text("Encrypt");
      $("#encriptar-btn").addClass("Color1")
      $("#encriptar-btn").removeClass("Color2")
    });
  });
  // Desplazar la esfera hacia la derecha al hacer clic en "Encrypt"
$(document).ready(function() {
  $(".Decrypt").on("click", function() {
    $(".sphere").css({"transform": "translateX(5.5rem)"});
    $(".sphere").addClass("ColorS");

  });

  // Restablecer la posición de la esfera al hacer clic en "Decrypt"
  $(".Encrypt").on("click", function() {
    $(".sphere").css("transform", "translateX(0)");
    $(".sphere").removeClass("ColorS");
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

