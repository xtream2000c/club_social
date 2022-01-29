window.onload = main;

function main() {
    //Esto esta por probar
    $.ajax({
        type:"POST",
        url: "PHP/instalaciones.php",//se modifica la ruta
        dataType: "JSON",
        success : function(infoInstalaciones){
            console.log(infoInstalaciones);
            if(1==1 || infoInstalaciones.status === "success"){//esto es para que entre en el if siempre, es probable que no haga falta el if
                alert("success");
                sessionStorage.setItem("instalaciones", JSON.stringify(infoInstalaciones));
                
                for(let i=0;i<infoInstalaciones.length;i++){//se itera sobre el array

                    let inst = infoInstalaciones[i];
                    $('#tablaInstalaciones').append(`<tr><td><h6>${inst.tipo_pista}</h6></td><td>${inst.precio}</td><td>${inst.precio_no_socio}</td></tr>`);
                }

            }else{
                alert("error");
            }
        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener las instalaciones");
        }
    })
    $.ajax({
        type:"POST",
        url: "noticias.php",
        dataType: "JSON",
        success : function(noticias){
            console.log(noticias);
            if(noticias.status === "success"){
                alert("success");
                sessionStorage.setItem("noticias", JSON.stringify(noticias));
            }else{
                alert("error");
            }
        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener las noticias");
        }
    })
    $.ajax({
        type:"POST",
        url: "eventos.php",
        dataType: "JSON",
        success : function(eventos){
            console.log(eventos);
            if(eventos.status === "success"){
                alert("success");
                sessionStorage.setItem("eventos", JSON.stringify(eventos));
            }else{
                alert("error");
            }
        },
        error : function(XHR, status){
             alert("No se ha podido conectar con la base de datos para obtener los eventos");
        }
    })

}