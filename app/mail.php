<?php
    $recepient = "getitrightwd@gmail.com";
    $sitename = "GetItRight";

    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $message = "Имя: $name \nТелефон: $phone \nПочта: $email";

    $pagetitle = "Новая заявка с сайта \"$sitename\"";
    mail($recepient, $pagetitle, $message, "Contect-type: text/plain; charset=\"utf-8\"\n From: $recepient");

    echo 1;
?>