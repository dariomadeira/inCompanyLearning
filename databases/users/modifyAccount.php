<?php
	header("Access-Control-Allow-Origin: *");
	require_once('../../libs/conexion.php');
	if (isset($_POST['val1']) && isset($_POST['val2']) && isset($_POST['val3']) && isset($_POST['val4']) && isset($_POST['val5'])) {
		$first = trim($_POST['val1']);
		$last = trim($_POST['val2']);
		$phone = trim($_POST['val3']);
		$mail = trim($_POST['val4']);
		$user = trim($_POST['val5']);
		$conexion = Conectarse();
		$que = "UPDATE users SET name='".$first."', lastName='".$last."', phone='".$phone."', email='".$mail."' WHERE ID = '".$user."'";
		$res = mysql_query($que, $conexion) or die(mysql_error());
		if (is_bool($res) === false) {
			mysql_free_result($res);
		}
	}
?>