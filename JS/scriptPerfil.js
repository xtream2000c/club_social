window.onload = inicio;

function inicio(){

    compruebaSesion();

    var usuarioSesion = JSON.parse(sessionStorage.getItem("usuarioSesion"));

    if(usuarioSesion){
        var usuario = usuarioSesion[0];
        if(usuario['tipo_usuario'] == "Presidente"){

            var extras = '<div class="col-md-6 my-2"><a class="btn btn-primary" id="noticias" href="noticiasPresidente.html" >Administrar Noticias</a></div> <div class="col-md-6 my-2"><a class="btn btn-primary" id="eventos" href="eventosPresidente.html">Administrar Eventos</a></div><hr>'

            document.getElementById('extras').innerHTML= extras;

        }
        if(usuario['tipo_usuario'] == "Administrador"){

            var extras = '<div class="col-md-6 my-2"><a class="btn btn-primary" id="usuarios" href="usuarios.html">Administrar Miembros</a></div> <div class="col-md-6 my-2"><a class="btn btn-primary" id="eventos" href="instalaciones.html">Administrar Instalaciones</a></div><hr>'

            document.getElementById('extras').innerHTML= extras;

        }
    }

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