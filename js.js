window.onload = function() {
  $(document).ready(function() {
    setTimeout(function() {
      $("nav").addClass("show");
    }, 200);
  });

  $(document).ready(function() {
    $(".Decrypt").on("click", function() {
      $("#encriptar-btn").text("Decrypt");
    });

    $(".Encrypt").on("click", function() {
      $("#encriptar-btn").text("Encrypt");
    });
  });

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

  function esLetra(caracter) {
    return /^[a-zA-Z]+$/.test(caracter);
  }

  function encriptarTexto(texto) {
    if (texto.length > 200) {
      return null;
    }

    let textoEncriptado = "";

    for (let i = 0; i < texto.length; i++) {
      let caracter = texto[i];

      if (caracter !== " " && !esLetra(caracter)) {
        return null;
      }

      if (caracter === " ") {
        textoEncriptado += " ";
      } else {
        let codigoAscii = texto.charCodeAt(i);
        let codigoEncriptado = Math.round((codigoAscii * 60) / 4);
        textoEncriptado += codigoEncriptado + " ";
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
    
      let numerosEncriptados = palabraEncriptada.split("");
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
    
    return textoDesencriptado;
  }
  
}
