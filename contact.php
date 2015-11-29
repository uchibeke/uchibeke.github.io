<?php
// Step 1
$name = $_POST['name'];
$subject = $_POST['subject'];
$email = $_POST['email'];
$message = $_POST['message'];

$to = "hello@uchibeke.com"; // The e-mail address you want the message sent to

// Step 2
$header = "From: ". $name ." < " . $email . ">“;


mail($to, $subject, $message, $header);


header(”Location: thankyou.php”);

?>
