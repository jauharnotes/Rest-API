<?php 
    $data = file_get_contents('pizza.json');
    $menu = json_decode($data, true);

    var_dump($menu);
    echo $menu;
?>