<?php
// Pretentious Chocolates Contact Form Handler
$to = 'BrianHolm@yahoo.com';

// Validate required fields
if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['message'])) {
    echo "Error: All fields are required.";
    exit;
}

// Sanitize input
$name = strip_tags(trim($_POST['name']));
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$message = strip_tags(trim($_POST['message']));

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Error: Invalid email address.";
    exit;
}

// Prepare email
$subject = "New Contact Form Submission from Pretentious Chocolates";
$email_message = "Name: " . $name . "\n";
$email_message .= "Email: " . $email . "\n";
$email_message .= "Message: " . $message . "\n";

$headers = "From: noreply@pretentiouschocolates.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$success = mail($to, $subject, $email_message, $headers);

if ($success) {
    echo "Thank you! Your message has been sent successfully.";
} else {
    echo "Sorry, there was an error sending your message. Please try again.";
}
?>
