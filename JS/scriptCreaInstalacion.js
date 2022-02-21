window.onload = main;

function main(){

    compruebaSesion();

document.getElementById('crearInstalacion').addEventListener("submit",creaInstalacion,false);

}

function creaInstalacion(event){
    event.preventDefault();


    let tipoPista= document.getElementById("tipoInstalacion").value;
    let nombrePista = document.getElementById("nombreInstalacion").value;
    let precioSocios = document.getElementById("precioSocios").value;
    let precioNoSocios = document.getElementById("precioNoSocios").value;
    

    $.ajax({
        type:"POST",
        url: "PHP/instalaciones.php",//se modifica la ruta
        data: {
            'funcion':'setInstalaciones','tipoPista' : tipoPista, 'nombrePista':nombrePista, 'precioSocios':precioSocios, 'precioNoSocios':precioNoSocios
        },
        success : function(Instalacion){
            alert("Instalacion insertada con exito");
            
            $.ajax({
                type:"POST",
                url: "PHP/instalaciones.php",
                data: {'funcion':'getInstalaciones'},
                dataType: "JSON",
                success : function(instalaciones){
        
                    //console.log(instalaciones);
                    if(1==1 || instalaciones.status === "success"){//mismo caso que instalaciones, conviene quitar el if
        
                       // console.log("success");
        
                        sessionStorage.setItem("instalaciones", JSON.stringify(instalaciones));
        
                    }else{
                        alert("error");
                    }
                },
                error : function(XHR, status){
                     alert("No se ha podido conectar con la base de datos para obtener las instalaciones");
                }
            })

            location.href="instalaciones.html";
            
        },
        error : function(xhr,ajaxOptions, thrownError){
            alert(xhr.status);
            alert(thrownError);
        }
    })
}