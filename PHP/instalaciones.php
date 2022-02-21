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

    static function setInstalaciones(){
        // set parameters and execute
        // print('ahora estoy aqui');
        $tipoPista = $_POST['tipoPista'];
        $nombrePista = $_POST['nombrePista'];
        $precioSocios = $_POST['precioSocios'];
        $precioNoSocios = $_POST['precioNoSocios'];
        
        $errores=[];//se crea un array que contendrá los errores

        try{
            $sentencia = " INSERT INTO instalaciones (id_pista,nombre_pista,precio,precio_no_socio,tipo_pista) VALUES ('','$nombrePista','$precioSocios','$precioNoSocios','$tipoPista')";

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

    static function eliminarinstalaciones(){
        // set parameters and execute
        // print('ahora estoy aqui');
        $id_eliminar = $_POST['id_eliminar'];
        
        $errores=[];//se crea un array que contendrá los errores

        try{
            $sentencia = "DELETE FROM instalaciones WHERE instalaciones.id_pista = $id_eliminar";

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

    static function editarinstalacion(){
        // set parameters and execute
        // print('ahora estoy aqui');
        $id_editar = $_POST['id_editar'];
        $tipoPista = $_POST['tipoPista'];
        $nombrePista = $_POST['nombrePista'];
        $tipoPista = $_POST['precioSocios'];
        $precioNoSocios = $_POST['precioNoSocios'];
        
        $errores=[];//se crea un array que contendrá los errores

        try{
            $sentencia = "UPDATE instalaciones SET nombre_pista = '$nombrePista' , tipo_pista =  '$tipoPista' , precio = '$tipoPista' , precio_no_socio =  '$precioNoSocios' WHERE instalaciones.id_pista = $id_editar";

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

if($_POST['funcion']=='setInstalaciones'){

    Instalaciones::setInstalaciones(); // Llama a la funcion para crear Instalaciones

}
if($_POST['funcion']=='getInstalaciones'){

    print(Instalaciones::getInstalaciones());//imprime todas los Instalaciones en JSON, llama a getInstalaciones()

}
if($_POST['funcion']=='Eliminarinstalacion'){

    Instalaciones::eliminarinstalaciones();//Llama a eliminar una noticia

}

if($_POST['funcion']=='editarinstalacion'){

    Instalaciones::editarinstalacion();//Llama a eliminar una noticia

}

?>