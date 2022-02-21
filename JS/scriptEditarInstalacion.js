window.onload = main;

function main(){

    compruebaSesion();

    var instalacion = JSON.parse(sessionStorage.getItem("instalacionEditar"));

    document.getElementById("tipoInstalacion").value= instalacion["tipo_pista"];
    document.getElementById("nombreInstalacion").value= instalacion["nombre_pista"];
    document.getElementById("precioSocios").value= instalacion["precio"];
    document.getElementById("precioNoSocios").value= instalacion["precio_no_socio"];

    document.getElementById("editarInstalacion").addEventListener("submit", editarinstalacion, false)

}

function editarinstalacion(event) {
   
    event.preventDefault();

    var instalacion = JSON.parse(sessionStorage.getItem("instalacionEditar"));

    let tipoPista= document.getElementById("tipoInstalacion").value;
    let nombrePista = document.getElementById("nombreInstalacion").value;
    let precioSocios = document.getElementById("precioSocios").value;
    let precioNoSocios = document.getElementById("precioNoSocios").value;
    let id_editar = instalacion['id_pista'];
    $.ajax({
        type:"POST",
        url: "PHP/instalaciones.php",//se modifica la ruta
        data: {
            'funcion':'editarinstalacion','id_editar' : id_editar ,'tipoPista' : tipoPista, 'nombrePista':nombrePista, 'precioSocios':precioSocios, 'precioNoSocios':precioNoSocios
        },
        success : function(instalacion){
            alert("instalacion editada con exito");

            $.ajax({
                type:"POST",
                url: "PHP/instalaciones.php",
                data: {'funcion':'getInstalaciones'},
                dataType: "JSON",
                success : function(instalaciones){
        
                    //console.log(instalacions);
                    if(1==1 || instalaciones.status === "success"){//mismo caso que instalaciones, conviene quitar el if
        
                       // console.log("success");
        
                        sessionStorage.setItem("instalaciones", JSON.stringify(instalaciones));
        
                    }else{
                        alert("error");
                    }
                },
                error : function(XHR, status){
                     alert("No se ha podido conectar con la base de datos para obtener las instalacions");
                }
            })

            location.href = "instalaciones.html"
            
        },
        error : function(xhr,ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        }
    })

}