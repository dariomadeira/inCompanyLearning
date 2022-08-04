<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	require 'PHPMailer/src/Exception.php';
	require 'PHPMailer/src/PHPMailer.php';
	require 'PHPMailer/src/SMTP.php';
	set_time_limit(2000);
	if (isset($_POST['val1']) && isset($_POST['val2']) && isset($_POST['val3']) && isset($_POST['val4'])) {
		//armar la lista de cosas del mail
		$mail_a_enviar = trim($_POST['val1']);
		$nombre_proveedor = trim($_POST['val2']);
		$asunto = trim($_POST['val3']);
		$contenido = trim($_POST['val4']);
	}
		// prueba de como llegan todos los datos
	// echo $contenido;
	// echo "enviar mail a: ".$mail_a_enviar;
	// echo "al proveedor: ".$nombre_proveedor;
	// echo "con el asunto: ".$asunto;
	$mail = new PHPMailer(true); // create a new object
	$mail->SetLanguage("es", 'PHPMailer/language');
	$mail->IsSMTP(); // enable SMTP
	$mail->SMTPDebug = 0;  // debugging: 1 = errors and messages, 2 = messages only
	$mail->SMTPAuth = true;  // authentication enabled
	$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
	$mail->Host = 'wo45.wiroos.host';
	$mail->Port = 465; 
	$mail->Username = "incompanylearning@mrblocklib.com";  
	$mail->Password = "pabloamendola1";
	$mail->CharSet = 'UTF-8';
	$mail->SetFrom("incompanylearning@mrblocklib.com", "Pablo Amendola");
	$mail->Subject = $asunto;
	$mail->IsHTML(true);
	$mail->Body = $contenido;
	$mail->AddCC('incompanylearning@mrblocklib.com', 'Pablo Amendola');
	$mail->addReplyTo("incompanylearning@mrblocklib.com", "Pablo Amendola");
	//$mail->AddAddress("incompanylearning@mrblocklib.com", "Pablo Amendola");
	$mail->AddAddress($mail_a_enviar, $nombre_proveedor);
	if(!$mail->Send()) {
		$mailStatus = 'ERROR';
		//$error = 'Error de envío, no se ha podido enviar el mail: '.$mail->ErrorInfo; 
		//$error = "Error de envío, no se ha podido enviar el mail.";
	} else {
		$mailStatus = 'OK';
	}
	echo $mailStatus;
?>