function compruebaSesion(){

    var usuarioSesion = JSON.parse(sessionStorage.getItem("usuarioSesion"));

    if(usuarioSesion){

        //alert("SesionIniciada");
        document.getElementById("btnsesion").innerHTML="Perfil";
        document.getElementById("btnsesion").href="perfil.html";

    }

}