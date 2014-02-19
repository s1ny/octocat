<?php 

include ('config.php');


$name=trim($_POST['name']);
$phone=trim($_POST['phone']);
$question = (!empty($_POST['mail'])) ? $_POST['mail'] : "";

if (!isset($_POST['name']) or empty($_POST['name'])) {
    $error1 = "Введите Имя.<br />";
} 
else $error1 = NULL;

if (!isset($_POST['phone']) or empty($_POST['phone'])) {
    $error2 = "Введите Телефон.<br />";
}
else $error2 = NULL;




if (empty($error1) and empty($error2)) {
    $name    = htmlspecialchars($name);
    $phone   = htmlspecialchars($phone);
    
    $questions = (!empty($question)) ? "E-mail:" . $question . "<br/>" : "";

    $date = date("H:i:s m.d.y");
    $message = "
    Name: {$name}<br/> 
    Phone: {$phone}<br/>
    {$questions}
    Date: {$date}";
    $subject .= "Name: {$name} Phone: {$phone} {$date}";
    $subject = "=?utf-8?b?" . base64_encode($subject) . "?=";

	$headers = "From: admin \r\n";
	$headers .= "Mime-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=UTF-8\r\n";

	
	if (mail($email, $subject, $message, $headers)) {
	    echo $success;
		} else 
		echo "Ошибка!";
	
	} 
else {
    echo 'Ошибка!<br>'.$error1.$error2.$error3.$error4;
}
?>
