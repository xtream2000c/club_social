window.onload = inicio;

function inicio(){

    compruebaSesion();

    var usuarioSesion = JSON.parse(sessionStorage.getItem("usuarioSesion"));

    document.getElementById('nombreUsuario').innerHTML = usuarioSesion[0].usuario;

    document.getElementById('nombre').innerHTML = usuarioSesion[0].nombre;

    document.getElementById('apellidos').innerHTML = usuarioSesion[0].apellidos;

    document.getElementById('edad').innerHTML = usuarioSesion[0].edad;
    
    document.getElementById('miembros').innerHTML = usuarioSesion[0].miembros;

    document.getElementById('tipoUsuario').innerHTML = usuarioSesion[0].tipo_usuario;

    document.getElementById('cerrarSesion').addEventListener('click', cerrarSesion, false)

}

function cerrarSesion(){
    sessionStorage.removeItem("usuarioSesion");
    location.href = 'index.html';
}