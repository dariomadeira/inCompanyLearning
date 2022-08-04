<?php
	header('Content-type: application/json; charset=utf-8');
	header("Access-Control-Allow-Origin: *");
	require_once('../../libs/conexion.php');
	if (isset($_POST['val1'])) {
		$user = trim($_POST['val1']);
		$jsondata = array();
		$conexion = Conectarse();
		$que ="SELECT * FROM users WHERE user = '".$user."' ORDER BY ID ASC";
		$res = mysql_query($que, $conexion);
		$total = mysql_num_rows ($res);
		if($total == 0) {
			$jsondata['status'] = "0";
			echo json_encode($jsondata);
			die(mysql_error());
		} else {
			while($fila=mysql_fetch_array($res)){
				$jsondata['status'] = "1";
				$jsondata['ID'] = $fila['ID'];
				$jsondata['user'] = $fila['user'];
				$jsondata['password'] = $fila['password'];
				$jsondata['name'] = $fila['name'];
				$jsondata['lastname'] = $fila['lastName'];
				$jsondata['phone'] = $fila['phone'];
				$jsondata['mail'] = $fila['email'];
			}
			echo json_encode($jsondata);
			if (is_bool($res) === false) {
				mysql_free_result($res);
			}
		}
	}
?>