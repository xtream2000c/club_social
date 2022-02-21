window.onload = main;

function main(){

    compruebaSesion();

    var instalaciones = JSON.parse(sessionStorage.getItem("instalaciones"));

    for(let i=instalaciones.length-1;i>=0;i--){
        let instalacion = instalaciones[i];
        
        $('#Instalaciones .row').append(`<div class="card col-12 mt-3 bg-info">
            <div class "card-body">
                <h1 class="card-title">${instalacion.nombre_pista}</h1>
                <table class="table">

                    <tr>
                        <th>
                            Precio socios
                        </th>
                        <th>
                            Precio no socios
                        </th>
                    </tr>

                    <tr>
                        <td>
                            ${instalacion.precio}
                        </td>
                        <td>
                            ${instalacion.precio_no_socio}
                        </td>
                    </tr>

                </table>

                <button class="btn btn-danger mb-2" id="eliminarinstalacion${instalacion.id_pista}" onclick=" eliminarinstalacion(${instalacion.id_pista})">Eliminar</button>
                <button class="btn btn-warning mb-2" id="editarinstalacion${instalacion.id_pista}" onclick=" editarinstalacion(${instalacion.id_pista})">Editar</button>
                
            </div>
        </div>`);
        
            
    }
}

function eliminarinstalacion(id) {

    $.ajax({
        type:"POST",
        url: "PHP/instalaciones.php",
        data: {'funcion':'Eliminarinstalacion', 'id_eliminar':id},
        dataType: "JSON",
        success : function(instalacions){
            
            alert("instalacion eliminado de forma satisfactoria");

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
                        location.href="instalaciones.html";
                    }else{
                        alert("error");
                    }
                },
                error : function(XHR, status){
                     alert("No se ha podido conectar con la base de datos para obtener las instalacions");
                }
            })

        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener las instalacions");
        }
    })
}

function editarinstalacion(id) {

    var instalaciones = JSON.parse(sessionStorage.getItem("instalaciones"));
    for(let i=instalaciones.length-1;i>=0;i--){
        if(instalaciones[i].id_pista == id){

            var instalacionEditar = instalaciones[i];

        }

    } 

    sessionStorage.setItem("instalacionEditar", JSON.stringify(instalacionEditar));
    location.href="editarInstalaciones.html"

}