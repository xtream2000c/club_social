<?php

//Requerimiento de acceso a base de datos.
require_once(dirname(__FILE__).'/../PHP/DB.php');

class Eventos{ 

    public $titulo_evento;
    public $cuerpo_evento;
    public $id_eventos;

    function __construct($titulo_evento,$cuerpo_evento,$id_evento){
        $this->titulo_evento=$titulo_evento;
        $this->cuerpo_evento=$cuerpo_evento;
        $this->id_evento=$id_evento;
    }

    static function getEventos(){
        $sentencia = "SELECT * FROM eventos";
        $result = mysqli_fetch_all(DB::query($sentencia),MYSQLI_ASSOC);
        $eventos = Array();
        foreach($result as $evento){
            array_push($eventos, new Eventos($evento["titulo_evento"],$evento["cuerpo_evento"],$evento["id_eventos"]));
        }

        return json_encode($eventos);
    }

    
}
print(Eventos::getEventos());//imprime todas los eventos en JSON, llama a getEventos()
?>