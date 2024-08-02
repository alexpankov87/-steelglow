<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["feedback-name"]);
    $phone = htmlspecialchars($_POST["feedback-phone"]);
    

    $email = isset($_POST["feedback-email"]) ? htmlspecialchars($_POST["feedback-email"]) : '';

    $source_page = isset($_POST["source_page"]) ? htmlspecialchars($_POST["source_page"]) : "Unknown Page";

    $agreed = isset($_POST["feedback-checkbox"]) ? true : false;

    if (!$name || !$phone || !$agreed) {
        header("HTTP/1.1 400 Bad Request");
        echo json_encode(["status" => "error", "message" => "Заполните все обязательные поля и согласитесь предоставить персональные данные."]);
        exit;
    }

    $from_email = "info@steelglow.kz"; 
    $to_email = "admin@steelglow.kz"; 
    $subject = 'Новая заявка с формы';

    $message = "<html><head><title>$subject</title></head><body>";
    $message .= "<p><strong>Имя:</strong> $name</p>";
    $message .= "<p><strong>Телефон:</strong> $phone</p>";
    if ($email) {
        $message .= "<p><strong>E-mail:</strong> $email</p>";
    }
    $message .= "<p><strong>Отправлено со страницы:</strong> $source_page</p>";
    $message .= "</body></html>";

    $headers = "From: $from_email\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";

    if (mail($to_email, $subject, $message, $headers)) {
        header("HTTP/1.1 200 OK");
        echo json_encode(["status" => "success"]);
    } else {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(["status" => "error", "message" => "Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже."]);
    }
} else {
    header("HTTP/1.1 400 Bad Request");
    echo json_encode(["status" => "error", "message" => "Неверный метод запроса"]);
}
?>