const loginMesajes = {
	updateError: "Error al actualizar, inténtelo más tarde",
	errorTypePassword: "Error en la contraseña, especifique otra",
	errorCheckPassword: "Error en la contraseña, escríbala nuevamente",
	errorTypeFirstName: "Necesitamos su nombre para identificalo",
	errorTypeLastName: "Necesitamos su apellido para identificarlo",
	errorTypePhone: "Necesitamos su teléfono para poder contactarlo",
	errorSaveUser: "Hubo un error al guardar el nuevo usuario, inténtelo nuevamente",
	errorCheckDuplicateUser: "No hemos podido verificar si el nombre de usuario es válido, inténtelo nuevamente",
	successSaveUser: "Se agrego el usuario, ahora puede iniciar sesión",
	errorValidateUsername: "Por favor, ingrese un nombre de usuario",
	errorValidateUsernameLenght: "El nombre de usuario debe tener entre 5 y 15 caracteres",
	errorInvalidUsername: "Ingrese un nombre de usuario válido, solo letras del alfabeto y números",
	errorDuplicateUsername: "Ya existe un usuario registrado con ese nombre de usuario, por favor cámbielo",
	errorResetPasswordName: "Necesitamos su nombre de usuario para enviarle su contraseña",
	errorSendInfoForResetPassword: "No hemos podido enviarle su contraseña, quizás se deba a un problema de conección",
	errorTypeUsername: "Parece que no ha escrito un nombre de usuario válido",
	errorValidateMails: "Parece que el mail que ha escrito no es válido",
	errorValidatePhone: "Parece que el teléfono que ha escrito no es válido",
	mailTitleReset: "Mail para reseteo de contraseña",
	successResetPasswordByPhone: "En la brevedad le enviaremos un mensaje con sus datos de acceso",
	successResetPasswordByMail: "Le hemos enviado un correo electrónico con sus datos de acceso",
	errorStartSesion: "No se pudo iniciar sesión, quizás se deba a un problema de conección",
	errorLoguin: "No se ha podido iniciar sesión, quizás el nombre de usuario o la contraseña estén incorrectos",
};

const generalMesages = {
	verifyMesaje: "Verificando...",
	saveMesaje: "Guardando...",
	waitMensaje: "Espere...",
	updateMensaje: "Iniciando...",
	searchMensaje: "Buscando...",
	loadMensaje: "Cargando...",
	deleteMensaje: "Eliminando...",
	moveMensaje: "Moviendo...",
	addMensaje: "Agregando...",
	asociateMensaje: "Sacando...",
	mesaje: "Aviso",
	errorConection: "Sin conexión, inténtelo más tarde",
	autologin: "Iniciando sesión automáticamente...",
	emptyData: "¡Auxilio! no encontramos nada",
	emptyByDelete: "Parece que ya borró todo",
	noMail:"No especificó e-mail",
	firstFatherTitle: "Antes de empezar...",
	firstFatherMsg: "Recuerde ingresar los datos de sus hijos, utilize los botones de agregar hijo/a ubicados arriba",
	firstTeacherMsg: "Como primer paso deberá ingresar los lugares donde trabaja, revise el recuadro que dice &quot;Mis trabajos&quot; para agregarlos",
	exitSecondTime: "Repita para salir",
}

const accessMesages = {
	errorAskAccess: "No pudimos solicitar el acceso, quizás no tenga una buena conección",
	errorCheckAccess: "No pudimos chequear si tiene acceso, quizás no tenga una buena conección",
	errorNoAccessNow: "Deberá esperar un poco más para tener acceso",
	successAccess: "Ya tiene acceso como maestra jardinera",
	errorChangeAccountValues: "No hemos podido realizar los cambios solicitados, inténtelo mas tarde",
	successChangeAccountValues: "Se han guardado los cambios",
	errorTypeOldPassword: "No ha escrito una contraseña anterior válida",
	errorTypeNewPassword: "No ha escrito una contraseña nueva válida",
	errorPasswordOldNotMach: "No coincide la contraseña actual con la que tenemos registrada",
	errorPasswordsNotSame: "No coinciden ambas contraseñas nuevas",
	successChangePassword: "Hemos cambiado su contraseña, si cierra sesión recuerde ingresar su nueva contraseña"
}

var htmlMailResetByPhone = '<head>';
htmlMailResetByPhone += '<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />';
htmlMailResetByPhone += '</head>';
htmlMailResetByPhone += '<body>';
htmlMailResetByPhone += '<p>Envie mensaje de reseteo de contraseña con los datos:</p>';
htmlMailResetByPhone += '<p>Teléfono: *phone*</p>';
htmlMailResetByPhone += '<p>Usuario: *username*</p>';
htmlMailResetByPhone += '<p>Contraseña: *password*</p>';
htmlMailResetByPhone += '</body>';

var htmlMailResetByMail = '<head>';
htmlMailResetByMail += '<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />';
htmlMailResetByMail += '</head>';
htmlMailResetByMail += '<body>';
htmlMailResetByMail += '<p>Le enviamos sus datos de acceso de la App para Smartphones:</p>';
htmlMailResetByMail += '<p>Su nombre de usuario es: *username*</p>';
htmlMailResetByMail += '<p>Su contraseña es: *password*</p>';
htmlMailResetByMail += '</body>';