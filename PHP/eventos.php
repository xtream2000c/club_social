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

    static function setEventos(){
        // set parameters and execute
        // print('ahora estoy aqui');
        $titulo_evento = $_POST['titulo_evento'];
        $cuerpo_evento = $_POST['cuerpo_evento'];
        
        $errores=[];//se crea un array que contendrá los errores

        try{
            $sentencia = " INSERT INTO eventos (id_eventos,titulo_evento,cuerpo_evento) VALUES ('','$titulo_evento','$cuerpo_evento')";

            DB::query($sentencia);

        }catch(Exception $e){

            $errores[]=$e->getMessage();//añado el mensaje del error

        }

        //se imprime un objeto json haya errores o no
        if(sizeof( $errores) > 0){
            print(json_encode(array('status'=>'error','mensaje'=>$errores)) );
        }else{
            print(json_encode(array('status'=>'ok')));
        }
        
    }

    static function eliminarEventos(){
        // set parameters and execute
        // print('ahora estoy aqui');
        $id_eliminar = $_POST['id_eliminar'];
        
        $errores=[];//se crea un array que contendrá los errores

        try{
            $sentencia = "DELETE FROM eventos WHERE eventos.id_eventos = $id_eliminar";

            DB::query($sentencia);

        }catch(Exception $e){
            $errores[]=$e->getMessage();//añado el mensaje del error
        }
        //se imprime un objeto json haya errores o no
        if(sizeof( $errores) > 0){
            print(json_encode(array('status'=>'error','mensaje'=>$errores)) );
        }else{
            print(json_encode(array('status'=>'ok')));
        }
        
    }

    static function editarEvento(){
        // set parameters and execute
        // print('ahora estoy aqui');
        $id_editar = $_POST['id_editar'];
        $titulo_evento = $_POST['titulo_evento'];
        $cuerpo_evento = $_POST['cuerpo_evento'];
        
        $errores=[];//se crea un array que contendrá los errores

        try{
            $sentencia = "UPDATE eventos SET titulo_evento = '$titulo_evento' , cuerpo_evento =  '$cuerpo_evento' WHERE eventos.id_eventos = $id_editar";

            DB::query($sentencia);

        }catch(Exception $e){
            $errores[]=$e->getMessage();//añado el mensaje del error
        }
        //se imprime un objeto json haya errores o no
        if(sizeof( $errores) > 0){
            print(json_encode(array('status'=>'error','mensaje'=>$errores)) );
        }else{
            print(json_encode(array('status'=>'ok')));
        }
        
    }
    
}

if($_POST['funcion']=='setEventos'){

    Eventos::setEventos(); // Llama a la funcion para crear eventos

}
if($_POST['funcion']=='getEventos'){

    print(Eventos::getEventos());//imprime todas los eventos en JSON, llama a getEventos()

}
if($_POST['funcion']=='EliminarEvento'){

    Eventos::eliminarEventos();//Llama a eliminar una noticia

}

if($_POST['funcion']=='editarEvento'){

    Eventos::editarEvento();//Llama a eliminar una noticia

}

?>