window.onload = main;
function main() {

    compruebaSesion();

    $.ajax({
        type:"POST",
        url: "PHP/Usuarios.php",//se modifica la ruta
        data: {'funcion':'getUsuarios'},
        dataType: "JSON",
        success : function(infoUsuarios){
            //console.log(infoUsuarios);
            if(1==1 || infoUsuarios.status === "success"){//esto es para que entre en el if siempre, es probable que no haga falta el if, el objeto que se recibe como parametro es el json, ese json no tiene success y nunca va a dar true
                //console.log("success");
                
                for(let i=0;i<infoUsuarios.length;i++){//se itera sobre el array y se imprimen las Usuarios
                    let usuario = infoUsuarios[i];
                    $('#tablaUsuarios').append(`<tr><td><h6>${usuario.nombre}</h6></td><td><h6>${usuario.apellidos}</h6></td><td><h6>${usuario.tipo_usuario}</h6></td><td><h6>${usuario.edad}</h6></td><td><h6>${usuario.miembros}</h6></td><td><h6>${usuario.email}</h6></td><td><h6>${usuario.usuario}</h6></td><td><button class="btn btn-warning m-2" onclick="editarUsuario(${usuario.id})">Editar</button></td><td><button class="btn btn-danger m-2" onclick="eliminarUsuario(${usuario.id})">Eliminar</button></td></tr>`);
                }
            }else{
                alert("error");
            }
        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener las Usuarios");
        }
    })
}

function eliminarUsuario(id) {

    $.ajax({
        type:"POST",
        url: "PHP/Usuarios.php",
        data: {'funcion':'eliminarUsuario', 'id_eliminar':id},
        dataType: "JSON",
        success : function(usuario){
            
            alert("usuario eliminado de forma satisfactoria");

            $.ajax({
                type:"POST",
                url: "PHP/Usuarios.php",
                data: {'funcion':'getUsuarios'},
                dataType: "JSON",
                success : function(infoUsuarios){
        
                    if(1==1 || infoUsuarios.status === "success"){//esto es para que entre en el if siempre, es probable que no haga falta el if, el objeto que se recibe como parametro es el json, ese json no tiene success y nunca va a dar true
                        //console.log("success");
                        
                        location.href="usuarios.html"
                        
                    }else{
                        alert("error");
                    }
                },
                error : function(XHR, status){
                     alert("No se ha podido conectar con la base de datos para obtener los usuarios");
                }
            })

        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener los usuarios");
        }
    })
}

function editarUsuario(id) {

    $.ajax({
        type:"POST",
        url: "PHP/Usuarios.php",//se modifica la ruta
        data: {'funcion':'getUsuarios'},
        dataType: "JSON",
        success : function(infoUsuarios){
            //console.log(infoUsuarios);
            if(1==1 || infoUsuarios.status === "success"){//esto es para que entre en el if siempre, es probable que no haga falta el if, el objeto que se recibe como parametro es el json, ese json no tiene success y nunca va a dar true
                //console.log("success");
                
                for(let i=infoUsuarios.length-1;i>=0;i--){
                    if(infoUsuarios[i].id == id){
            
                        var UsuarioEditar = infoUsuarios[i];
            
                    }
            
                } 
                sessionStorage.setItem("UsuarioEditar", JSON.stringify(UsuarioEditar));
                location.href="editarUsuarios.html";

            }else{
                alert("error");
            }
        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener las Usuarios");
        }
    })

}