<?php

    $mahasiswa = [
        [
            "nama" => "Jauharuddin",
            "nrp" => "045660045",
            "email" => "jauharnotes@gmail.com"
        ],
        [
            "nama" => "Juned",
            "nrp" => "045660045",
            "email" => "juned@gmail.com"
        ],

    ];

    $data = json_encode($mahasiswa);
    echo $data;

?> 