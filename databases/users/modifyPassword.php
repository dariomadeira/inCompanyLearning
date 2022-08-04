<?php
	header("Access-Control-Allow-Origin: *");
	require_once('../../libs/conexion.php');
	if (isset($_POST['val1']) && isset($_POST['val2']) && isset($_POST['val3'])) {
		$oldPass = trim($_POST['val1']);
		$newPass = trim($_POST['val2']);
		$user = trim($_POST['val3']);
		$actualOldPassword = "";
		$conexion = Conectarse();
		$que ="SELECT * FROM Users WHERE ID = '".$user."' ORDER BY ID ASC";
		$res = mysql_query($que, $conexion) or die(mysql_error());
		while($fila=mysql_fetch_array($res)){
			$actualOldPassword = $fila['password'];
		}
		if (is_bool($res) === false) {
			mysql_free_result($res);
		}
		if ($actualOldPassword == $oldPass) {
			$que2 = "UPDATE Users SET password='".$newPass."' WHERE ID = '".$user."'";
			$res2 = mysql_query($que2, $conexion) or die(mysql_error());
			if (is_bool($res2) === false) {
				mysql_free_result($res2);
			}
			echo "success";
		}	else {
			echo "error";
		}
	}
?>