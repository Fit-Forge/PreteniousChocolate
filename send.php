<?php
$to      = 'BrianHolm@yahoo.com';  // Pretentious Chocolates contact email
$subject = 'New query from '.$_POST["name"]." ".$_POST["email"];
$message = strip_tags($_POST["message"], '<br>');
$headers = 'From: '.strip_tags($_POST["email"]).'' . "\r\n" .
    'Reply-To: '.strip_tags($_POST["email"]).'' . "\r\n";

$success = mail($to, $subject, $message, $headers);
if ($success) {
  echo "Your message has been successfully sent.";
  exit;
}
?>
