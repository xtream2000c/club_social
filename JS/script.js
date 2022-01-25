window.onload = main;

function main() {
    //Esto esta por probar
    $.ajax({
        type:"POST",
        url: "instalaciones.php",
        dataType: "JSON",
        success : function(infoInstalaciones){
            console.log(infoInstalaciones);
            if(infoInstalaciones.status === "success"){
                alert("success");
                sessionStorage.setItem("instalaciones", JSON.stringify(infoInstalaciones));
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