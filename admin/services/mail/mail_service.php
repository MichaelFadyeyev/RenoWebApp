<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer/Exception.php";
require "PHPMailer/PHPMailer.php";
require "PHPMailer/SMTP.php";



class MailService
{

    private $_sender = "Служба реєстрації користувачів RenoWebApp";
    private $_address;
    private $_subject = "Підтвердження реєстрації";
    private $_content = "Для завершення реєстрації перейдіть за посиланням: ...";

    public function  sendMail($address, $link)
    {

        $this->_address = $address;
        $this->_content = $this->_content . $link;

        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = "sandbox.smtp.mailtrap.io";
        $mail->SMTPAuth = true;
        $mail->Username = "1d557e384a422f";
        $mail->Password = "61501f0db06743";
        $mail->SMTPSecure = "ssl";
        $mail->Port = 2525;

        $mail->setFrom("admin@reno-webapp.com", $this->_sender);

        $mail->addAddress($this->_address);

        $mail->isHTML(true);

        $mail->Subject = $this->_subject;

        $mail->Body = $this->_content;

        $mail->send();
    }
}
