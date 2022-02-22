    //Esto esta por probar
    window.onload=main;

    function main(){
        document.getElementById('registro').addEventListener("submit",registro,false);
        document.getElementById('inicioSesion').addEventListener("submit",inicioSesion,false);
    }
    
    function registro(event){
        event.preventDefault();
        let nombreR = document.getElementById('nombreR').value;
        let apellidosR = document.getElementById('apellidosR').value;
        let edadR = document.getElementById('edadR').value;
        let miembrosR = document.getElementById('miembrosR').value;
        let emailR = document.getElementById('emailR').value;
        let usuarioR = document.getElementById('usuarioR').value;
        let contrasenaR = document.getElementById('contrasenaR').value;
        
        if(edadR>14){

            $.ajax({
                type:"POST",
                url: "PHP/usuarios.php",//se modifica la ruta
                data: {
                    'funcion':'setUsuario','nombre' : nombreR, 'apellidos':apellidosR,'edad':edadR, 'miembros': miembrosR, 'email':emailR, 'usuario': usuarioR,'contraseña':contrasenaR
                },
                success : function(usu){
                    console.log(usu);
                    alert("Usuario registrado correctamente");
                    location.href="index.html";
                },
                error : function(xhr,ajaxOptions, thrownError){
                    alert(xhr.status);
                    alert(thrownError);
                }
            })
        }else{
            alert("El usuario debe ser mayor de 14 años");
        }

    }
    
    function inicioSesion(event){
        event.preventDefault();

        let usuario = document.getElementById('usuario').value;
        let contraseña = document.getElementById('contraseña').value;
        
        $.ajax({
            type:"POST",
            url: "PHP/usuarios.php",//se modifica la ruta
            data: {
                'funcion':'getUsuario', 'usuario': usuario,'contraseña':contraseña
            },
            success : function(user){

                if(user){

                    sessionStorage.setItem("usuarioSesion", user); //USER YA ES UN JSON NO HACE FALTA HACER JSON.stringify()
                    console.log(user);
                    location.href = 'index.html';

                }else{
                   alert("El usuario no existe, compruebe su usuario y contraseña");
                }                
                
            },
            error : function(xhr,status){
                 alert("No se ha podido conectar con BBDD");
                 
            }
        })
    }

    
    
    
    
    
   