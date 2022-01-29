<?php

//Requerimiento de acceso a base de datos.
require_once(dirname(__FILE__).'/../PHP/DB.php');

class Noticias{ 

    public $titulo_noticia;
    public $cuerpo_noticia;
    public $id_noticia;

    function __construct($titulo_noticia,$cuerpo_noticia,$id_noticia){

        $this->titulo_noticia=$titulo_noticia;
        $this->cuerpo_noticia=$cuerpo_noticia;
        $this->id_noticia=$id_noticia;
    }

    static function getNoticias(){
        $sentencia = "SELECT * FROM noticias";
        $result = mysqli_fetch_all(DB::query($sentencia),MYSQLI_ASSOC);
        $noticias = Array();
        foreach($result as $noticia){
            array_push($noticias, new Noticias($noticia["titulo_noticia"],$noticia["cuerpo_noticia"],$noticia["id_noticias"]));
        }

        return json_encode($noticias);
    }

}
print(Noticias::getNoticias());//imprime todas las noticias en JSON, llama a getNoticias()
?>