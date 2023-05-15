window.onload = function(){
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
      let textoEncriptado = encriptarTexto(texto);
      if (textoEncriptado !== null) {
        $("#texto-a-encriptar").val(textoEncriptado);
      } else {
        alert("Error: Solo se permiten letras y espacios en blanco, y el texto debe tener un máximo de 200 caracteres.");
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
  
  
  

}
