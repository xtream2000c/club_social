<?php

//Requerimiento de acceso a base de datos.
require_once(dirname(__FILE__).'/../PHP/DB.php');

class Instalaciones{ 

    public $nombre_pista;
    public $tipo_pista;
    public $precio;
    public $precio_no_socio;
    public $id_pista;

    function __construct($nombre_pista,$tipo_pista,$precio,$precio_no_socio,$id_pista){

        $this->nombre_pista=$nombre_pista;
        $this->tipo_pista=$tipo_pista;
        $this->precio=$precio;
        $this->precio_no_socio=$precio_no_socio;
        $this->id_pista=$id_pista;

    }

    static function getInstalaciones(){
        $sentencia = "SELECT * FROM instalaciones";
        $result = mysqli_fetch_all(DB::query($sentencia),MYSQLI_ASSOC);
        $instalaciones = Array();
        foreach($result as $instalacion){
            array_push($instalaciones, new Instalaciones($instalacion["nombre_pista"],$instalacion["tipo_pista"],$instalacion["precio"],$instalacion["precio_no_socio"],$instalacion["id_pista"]));
        }

        return json_encode($instalaciones);
    }
}
?>