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

    static function setNoticias(){
        // set parameters and execute
        // print('ahora estoy aqui');
        $titulo_noticia = $_POST['titulo_noticia'];
        $cuerpo_noticia = $_POST['cuerpo_noticia'];
        
        $errores=[];//se crea un array que contendrá los errores

        try{
            $sentencia = " INSERT INTO noticias (id_noticias,titulo_noticia,cuerpo_noticia) VALUES ('','$titulo_noticia','$cuerpo_noticia')";

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

    static function eliminarNoticias(){
        // set parameters and execute
        // print('ahora estoy aqui');
        $id_eliminar = $_POST['id_eliminar'];
        
        $errores=[];//se crea un array que contendrá los errores

        try{
            $sentencia = "DELETE FROM noticias WHERE noticias.id_noticias = $id_eliminar";

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

    static function editarNoticia(){
        // set parameters and execute
        // print('ahora estoy aqui');
        $id_editar = $_POST['id_editar'];
        $titulo_noticia = $_POST['titulo_noticia'];
        $cuerpo_noticia = $_POST['cuerpo_noticia'];
        
        $errores=[];//se crea un array que contendrá los errores

        try{
            $sentencia = "UPDATE noticias SET titulo_noticia = '$titulo_noticia' , cuerpo_noticia =  '$cuerpo_noticia' WHERE noticias.id_noticias = $id_editar";

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


if($_POST['funcion']=='setNoticias'){

    Noticias::setNoticias(); // Llama a la funcion para crear noticia

}
if($_POST['funcion']=='getNoticias'){

    print(Noticias::getNoticias());//imprime todas las noticias en JSON, llama a getNoticias()

}

if($_POST['funcion']=='EliminarNoticia'){

    Noticias::eliminarNoticias();//Llama a eliminar una noticia

}

if($_POST['funcion']=='editarNoticia'){

    Noticias::editarNoticia();//Llama a eliminar una noticia

}

?>