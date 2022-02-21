window.onload = main;

function main(){

    compruebaSesion();
    cargaFormulario();

    
}

function cargaFormulario() {
    var usuario = JSON.parse(sessionStorage.getItem("UsuarioEditar"));

    document.getElementById("nombre").value= usuario["nombre"];
    document.getElementById("apellidos").value= usuario["apellidos"];
    document.getElementById("email").value= usuario["email"];
    document.getElementById("edad").value= usuario["edad"];
    document.getElementById("miembros").value= usuario["miembros"];
    document.getElementById("usuario").value= usuario["usuario"];
    document.getElementById("tipoUsuario").value= usuario["tipo_usuario"];

    document.getElementById("editarUsuario").addEventListener("submit", editarusuario, false)

    
}

function editarusuario(event) {
   
    var usuarioEditar = JSON.parse(sessionStorage.getItem("UsuarioEditar"));

    event.preventDefault();

    let nombre= document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let email = document.getElementById("email").value;
    let edad = document.getElementById("edad").value;
    let miembros = document.getElementById("miembros").value;
    let usuario = document.getElementById("usuario").value;
    let tipoUsuario = document.getElementById("tipoUsuario").value;

    let id_editar = usuarioEditar['id'];
    
    $.ajax({
        type:"POST",
        url: "PHP/usuarios.php",//se modifica la ruta
        data: {

            'funcion':'editarUsuario','id_editar' : id_editar ,'nombre' : nombre, 'apellidos':apellidos, 'email':email, 'edad':edad, 'miembros':miembros, 'usuario':usuario, 'tipoUsuario':tipoUsuario
        
        },
        success : function(usuario){
            alert("usuario editado con exito");

            location.href = "usuarios.html"
            
        },
        error : function(xhr,ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        }
    })

}