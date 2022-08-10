// INICIAR SESIÓN
function loginApp() {
  var validar = validateUsername($("#logUser").val());
  if (validar != "") {
    createToast(validar, "ERROR", "error");
    $("#logUser").removeClass('valid');
    $("#logUser").addClass('invalid');
    if (putFocus) {
      $("#logUser").focus();
    };
    return false
  } else {
    $("#logUser").removeClass('invalid');
    $("#logUser").addClass('valid');
  }
  validar = checkWhite($("#logPassword").val());
  if (validar == false) {
    createToast(loginMesajes.errorCheckPassword, "ERROR", "error");
    $("#logPassword").removeClass('valid');
    $("#logPassword").addClass('invalid');
    if (putFocus) {
      $("#logPassword").focus();
    };
    return false
  } else {
    $("#logPassword").removeClass('invalid');
    $("#logPassword").addClass('valid');
  }
  setTimeout(function() {
    $.get("fragments/general/loadData.html", function (data) {
      // console.log(data);
      $("#loginWait").html(data);
      $("#MSG_ID").attr("id", "loadWaitMensaje");
      $("#loadWaitMensaje").html(generalMesages.updateMensaje);
      $("#SPIN_ID").attr("id", "loadWaitSpin");
      $("#loginData").addClass("d-none");
      $("#loginWait").removeClass("d-none");
      $.post(dbPath + '/users/login.php', {
        val1: $("#logUser").val(),
        val2: $("#logPassword").val(),
      //   val3: mesajesToken,
      }, function(data) {
        // FUNCION FINALIZAR AJAX CON DATA
        console.log(data);
        setTimeout(function() {
          if (data == ""){
            $("#loginWait").addClass("d-none");
            $("#loginData").removeClass("d-none");
            $("#btnloginCard").removeClass("d-none");
            createToast(loginMesajes.errorLoguin, "ERROR", "error");
            return false
          } else {
            if (data["status"] == "0"){
              $("#loginWait").addClass("d-none");
              $("#loginData").removeClass("d-none");
              $("#btnloginCard").removeClass("d-none");
              createToast(loginMesajes.errorLoguin, "ERROR", "error");
              return false
            } else if (data["status"] == "1") {
              userData = data;
              $("#name_data").html(data["name"] + " " + data["lastname"]);
              $("#firstName_input").val(data["name"]);
              $("#lastName_input").val(data["lastname"]);
              $("#phone_data").html(data["phone"]);
              $("#phone_input").val(data["phone"]);
              if ((data["mail"] == "") || (data["mail"]== null)) {
                $("#email_data").html(generalMesages.noMail);
                $("#email_input").val("");
              } else {
                $("#email_data").html(data["mail"]);
                $("#email_input").val(data["mail"]);
              }
              var firstname_letter = data["name"];
              firstname_letter = firstname_letter.slice(0,firstname_letter.slice.length-1).toUpperCase();
              var lastname_letter = data["lastname"];
              lastname_letter = lastname_letter.slice(0,lastname_letter.slice.length-1).toUpperCase();
              $(".avatar").attr("data-initial", firstname_letter +  lastname_letter);
              window.localStorage.removeItem("key");
              window.localStorage.removeItem("key2");
              window.localStorage.setItem("key", $("#logUser").val());
              window.localStorage.setItem("key2", $("#logPassword").val());
              window.localStorage.removeItem("key3");
              window.localStorage.setItem("key3", $("#autologin").prop('checked'));
              $("#scrDivs").addClass("d-none");
              $("#loadGeneralMensaje").html(generalMesages.loadMensaje);
              $("#generalWait").removeClass("d-none");
              if (data.is_admin == "1") {
                $.get("pages/admin/admin.html", function (data) {
                  // console.log(data);
                  $("#scrDivs").html(data);
                });
              }
              if (data.is_teacher == "1") {
                $.get("pages/student/student.html", function (data) {
                  // console.log(data);
                  $("#scrDivs").html(data);
                });
              }
              if (data.is_admin == "0" && data.is_teacher == "0") {
                gotoArea("scrStudent");
              }
              $("#generalWait").addClass("d-none");
              $("#scrDivs").removeClass("d-none");
              $("#appName").addClass("d-none");
              $("#appLogo").removeClass("d-none");
              manageNavbar(1);
            }
          }
        },timeToShow);
      }).fail(function() {
        // FUNCION DE ERROR
        $("#loginWait").addClass("d-none");
        $("#loginData").removeClass("d-none");
        $("#btnloginCard").removeClass("d-none");
        createToast(loginMesajes.errorStartSesion, "ERROR", "error");
        return false
      }).always(function() {
        // FUNCION SIEMPRE SE EJECUTA
      });
    });
  },timeRipple);
}

// VALIDAR UN NOMBRE DE USUARIO
function validateUsername(str) {
  var error = "";
  var illegalChars = /\W/;
  if (str == "") {
    error = loginMesajes.errorValidateUsername;
  } else if ((str.length < 5) || (str.length > 15)) {
    error = loginMesajes.errorValidateUsernameLenght;
  } else if (illegalChars.test(str)) {
    error = loginMesajes.errorInvalidUsername;
  } else {
    error = "";
  }
  return error;
}

// VER EL RESETEO DE CONTRASEÑA
function showResetPassword() {
  $("#loginData").addClass("d-none");
  $("#btnloginCard").addClass("d-none");
  $("#resetUser").removeClass('invalid');
  $("#resetUser").removeClass('valid');
  $("#resetUser").val(window.localStorage.getItem("key")).change();
  $("#passwordReset").removeClass('d-none');
  goBottom();
  if (putFocus) {
    $("#resetUser").focus();
  };
}

// RESETEO DE CONTRASEÑA
function resetPassNow() {
  validar = checkEmpty($("#resetUser").val());
  if (validar == false) {
    createToast(loginMesajes.errorResetPasswordName, "ERROR", "error");
    $("#resetUser").removeClass('valid');
    $("#resetUser").addClass('invalid');
    if (putFocus) {
      $("#resetUser").focus();
    };
    return false
  } else {
    $("#resetUser").removeClass('invalid');
    $("#resetUser").addClass('valid');
  }
  setTimeout(function() {
    $.get("fragments/general/loadData.html", function (data) {
      // console.log(data);
      $("#loginWait").html(data);
      $("#MSG_ID").attr("id", "loadWaitMensaje");
      $("#loadWaitMensaje").html(generalMesages.waitMensaje);
      $("#SPIN_ID").attr("id", "loadWaitSpin");
      $("#passwordReset").addClass("d-none");
      $("#loginWait").removeClass("d-none");
      var path = dbPath + '/users/rememberAccess.php';
      $.post(path, {
        val1: $("#resetUser").val(),
      }, function(data) {
        // FUNCION FINALIZAR AJAX CON DATA
        // console.log(data);
        if (data == ""){
          $("#loginWait").addClass("d-none");
          $("#passwordReset").removeClass("d-none");
          createToast(loginMesajes.errorTypeUsername, "ERROR", "error");
          return false
        } else {
          if (data["status"] == "0"){
            $("#loginWait").addClass("d-none");
            $("#passwordReset").removeClass("d-none");
            createToast(loginMesajes.errorTypeUsername, "ERROR", "error");
            return false
          } else if (data["status"] == "1"){
            if (data["mail"] == "") {
              var sendMesaje = htmlMailResetByPhone;
              sendMesaje = sendMesaje.replace("*phone*", data["phone"]);
              sendMesaje = sendMesaje.replace("*username*", data["user"]);
              sendMesaje = sendMesaje.replace("*password*", data["password"]);
              // console.log(sendMesaje);
              $.post(mailPath + 'send-mail.php', { 
                val1: appMail,
                val2: appMailName,
                val3: loginMesajes.mailTitleReset,
                val4: sendMesaje,
              }, function(data) { 
                // FUNCION FINALIZAR AJAX CON DATA
                console.log ("Estado del envío del mail a mi: " + data);
                if (data == "OK") {
                  $("#loginWait").addClass("d-none");
                  $("#passwordResetSuccess").removeClass("d-none");
                  $("#passwordResetSuccesstext").html(loginMesajes.successResetPasswordByPhone);
                  return false
                } else if (data == "ERROR") {
                  $("#loginWait").addClass("d-none");
                  $("#passwordReset").removeClass("d-none");
                  createToast(loginMesajes.errorSendInfoForResetPassword, "ERROR", "error");
                  return false;
                };
              }).fail(function() {
                // FUNCION DE ERROR
                $("#loginWait").addClass("d-none");
                $("#passwordReset").removeClass("d-none");
                createToast(loginMesajes.errorSendInfoForResetPassword, "ERROR", "error");
                return false;
              }).always(function() {
                // FUNCION SIEMPRE SE EJECUTA
              });
            } else {
              var sendMesaje = htmlMailResetByMail;
              sendMesaje = sendMesaje.replace("*username*", data["user"]);
              sendMesaje = sendMesaje.replace("*password*", data["password"]);
              // console.log(sendMesaje);
              $.post(mailPath + 'send-mail.php', { 
                val1: data["mail"],
                val2: appMailName,
                val3: loginMesajes.mailTitleReset,
                val4: sendMesaje,
              }, function(data) {
                // FUNCION FINALIZAR AJAX CON DATA
                console.log ("Estado del envío del mail al usuario: " + data);
                if (data == "OK") {
                  $("#loginWait").addClass("d-none");
                  $("#passwordResetSuccess").removeClass("d-none");
                  $("#passwordResetSuccesstext").html(loginMesajes.successResetPasswordByMail);
                  return false
                } else if (data == "ERROR") {
                  $("#loginWait").addClass("d-none");
                  $("#passwordReset").removeClass("d-none");
                  createToast(loginMesajes.errorSendInfoForResetPassword, "ERROR", "error");
                  return false;
                };
              }).fail(function() {
                // FUNCION DE ERROR
                $("#loginWait").addClass("d-none");
                $("#passwordReset").removeClass("d-none");
                createToast(loginMesajes.errorSendInfoForResetPassword, "ERROR", "error");
                return false;
              }).always(function() { 
                // FUNCION SIEMPRE SE EJECUTA
              });
            }
          }
        }
      }).fail(function() {
        // FUNCION DE ERROR
        $("#loginWait").addClass("d-none");
        $("#passwordReset").removeClass("d-none");
        createToast(loginMesajes.errorSendInfoForResetPassword, "ERROR", "error");
        return false
      }).always(function() {
        // FUNCION SIEMPRE SE EJECUTA
      });
    })
  },timeRipple);
}

// VOLVER DEL RESET DE CONTRASEÑA
function showBackDataLogin(backTo) {
  setTimeout(function(){
    if (backTo == 1) {
      $("#passwordResetSuccess").addClass("d-none");
    };
    $("#passwordReset").addClass('d-none');
    $("#loginData").removeClass("d-none");
    $("#btnloginCard").removeClass("d-none");
    goBottom();
    if (putFocus) {
      $("#logUser").focus();
    };
  },timeRipple);
}

// CERRAR SESIÓN
function userLogout() {
  setTimeout(function(){
    $('#modalMoreDataUser').modal('hide');
    window.localStorage.removeItem("key3");
    setTimeout(function(){
      location.reload();
    },timeRipple);
  },timeRipple);
}

// MOSTRAR UN DIV ESPECIFICO PARA LOS USUARIOS
function showManagerDivs(idHide, idShow, idEsp, activador) {
  setTimeout(function(){
    // poner en blanco el campo contraseñas
    $("#password_old").val("");
    $("#password_new").val("");
    // parte 1
    $("#" + idHide).removeClass("fadeIn");
    $("#" + idHide).removeClass("fadeOut");
    $("#" + idHide).addClass("fadeOut");
    $("#" + idHide).addClass("d-none");
    // parte 2
    $("#" + idShow).removeClass("fadeIn");
    $("#" + idShow).removeClass("fadeOut");
    $("#" + idShow).addClass("fadeIn");
    $("#" + idShow).removeClass("d-none");
    memoryChange = idShow;
    if (idEsp != 0) {
      if (activador == 1) {
        $('#' + idEsp).addClass('d-none');
      } else if (activador == 2) {
        $('#' + idEsp).removeClass('d-none');
      }
    }
    // removedor de validates
    $("#firstName_input").removeClass('valid');
    $("#firstName_input").removeClass('invalid');
    $("#lastName_input").removeClass('valid');
    $("#lastName_input").removeClass('invalid');
    $("#phone_input").removeClass('valid');
    $("#phone_input").removeClass('invalid');
    $("#email_input").removeClass('valid');
    $("#email_input").removeClass('invalid');
    $("#password_old").removeClass('valid');
    $("#password_old").removeClass('invalid');
    $("#password_new").removeClass('valid');
    $("#password_new").removeClass('invalid');
  },timeRipple);
}

// GUARDAR DATOS DE PERFIL MODIFICADOS
function accountEditManagerSave() {
  var validar = checkEmpty($("#firstName_input").val());
  if (validar == false) {
    createToast(loginMesajes.errorTypeFirstName, "ERROR", "error");
    $("#firstName_input").removeClass('valid');
    $("#firstName_input").addClass('invalid');
    if (putFocus) {
      $("#firstName_input").focus();
    };
    return false
  } else {
    $("#firstName_input").removeClass('invalid');
    $("#firstName_input").addClass('valid');
  }
  validar = checkEmpty($("#lastName_input").val());
  if (validar == false) {
    createToast(loginMesajes.errorTypeLastName, "ERROR", "error");
    $("#lastName_input").removeClass('valid');
    $("#lastName_input").addClass('invalid');
    if (putFocus) {
      $("#lastName_input").focus();
    };
    return false
  } else {
    $("#lastName_input").removeClass('invalid');
    $("#lastName_input").addClass('valid');
  }
  validar = checkEmpty($("#phone_input").val());
  if (validar == false) {
    createToast(loginMesajes.errorValidatePhone, "ERROR", "error");
    $("#phone_input").removeClass('valid');
    $("#phone_input").addClass('invalid');
    if (putFocus) {
      $("#phone_input").focus();
    };
    return false
  } else {
    $("#phone_input").removeClass('invalid');
    $("#phone_input").addClass('valid');
  }
  validar = checkEmpty($("#email_input").val());
  var elmail;
  if (validar == false) {
    elmail = false;
  } else {
    elmail = validateEmail($("#email_input").val());
    if (elmail == false) {
      $("#email_input").removeClass('valid');
      $("#email_input").addClass('invalid');
    } else {
      $("#email_input").removeClass('invalid');
      $("#email_input").addClass('valid');
    }
  }
  setTimeout(function() {
    $.get("fragments/general/loadData.html", function(data) {
      //console.log(data);
      $("#accountWaitLoad").html(data);
      $("#MSG_ID").attr("id", "LoadWaitSave");
      $("#LoadWaitSave").html(generalMesages.saveMesaje);
      $("#SPIN_ID").attr("id", "saveWaitSpin");
      $("#accountWaitLoad").removeClass("d-none");
      setTimeout(function() {
        showManagerDivs('accountEdit', 'accountWait');
        $.post(dbPath + '/users/modifyAccount.php', {
          val1: $("#firstName_input").val(),
          val2: $("#lastName_input").val(),
          val3: $("#phone_input").val(),
          val4: $("#email_input").val(),
          val5: userData.ID,
        }, function(data) {
          // FUNCION FINALIZAR AJAX CON DATA
          // console.log(data);
          setTimeout(function() {
            $("#name_data").html($("#firstName_input").val() + " " + $("#lastName_input").val());
            $("#phone_data").html($("#phone_input").val());
            if (($("#email_input").val() == "") || ($("#email_input").val() == null)) {
              $("#email_data").html(generalMesages.noMail);
            } else {
              $("#email_data").html($("#email_input").val());
            }
            var firstname_letter = $("#firstName_input").val();
            firstname_letter = firstname_letter.slice(0,firstname_letter.slice.length-1).toUpperCase();
            var lastname_letter = $("#lastName_input").val();
            lastname_letter = lastname_letter.slice(0,lastname_letter.slice.length-1).toUpperCase();
            $(".avatar").attr("data-initial", firstname_letter +  lastname_letter);
            showManagerDivs('accountWait', 'accountData', 'btnLogout', 2);
            $("#accountWaitLoad").html("");
            $("#accountWaitLoad").addClass("d-none");
            createToast(accessMesages.successChangeAccountValues, "LISTO", "success");
            userPhone = $("#phone_input").val();
          },timeToShow);
        }).fail(function() {
          // FUNCION DE ERROR
          showManagerDivs('accountWait', 'accountEdit');
          $("#accountWaitLoad").html("");
          $("#accountWaitLoad").addClass("d-none");
          createToast(accessMesages.errorChangeAccountValues, "ERROR", "error");
          return false
        }).always(function() {
          // FUNCION SIEMPRE SE EJECUTA
        });
      },timeToShow);
    });
  },timeRipple);
}

// GUARDAR LA NUEVA CONTRASEÑA
function accountChangePassword() {
  var validar = checkWhite($("#password_old").val());
  if (validar == false) {
    createToast(accessMesages.errorTypeOldPassword, "ERROR", "error");
    $("#password_old").removeClass('valid');
    $("#password_old").addClass('invalid');
    if (putFocus) {
      $("#password_old").focus();
    };
    return false
  } else {
    $("#password_old").removeClass('invalid');
    $("#password_old").addClass('valid');
  }
  validar = checkWhite($("#password_new").val());
  if (validar == false) {
    createToast(accessMesages.errorTypeNewPassword, "ERROR", "error");
    $("#password_new").removeClass('valid');
    $("#password_new").addClass('invalid');
    if (putFocus) {
      $("#password_new").focus();
    };
    return false
  } else {
    $("#password_new").removeClass('invalid');
    $("#password_new").addClass('valid');
  }
  validar = checkWhite($("#password_new_repit").val());
  if (validar == false) {
    createToast(accessMesages.errorTypeNewPassword, "ERROR", "error");
    $("#password_new_repit").removeClass('valid');
    $("#password_new_repit").addClass('invalid');
    if (putFocus) {
      $("#password_new_repit").focus();
    };
    return false
  } else {
    $("#password_new_repit").removeClass('invalid');
    $("#password_new_repit").addClass('valid');
  }
  if ($("#password_new_repit").val() == $("#password_new").val()) {
    setTimeout(function() {
      $.get("fragments/general/loadData.html", function(data) {
        //console.log(data);
        $("#accountWaitLoad").html(data);
        $("#MSG_ID").attr("id", "LoadWaitSave");
        $("#LoadWaitSave").html(generalMesages.saveMesaje);
        $("#SPIN_ID").attr("id", "saveWaitSpin");
        $("#accountWaitLoad").removeClass("d-none");
        showManagerDivs('accountPassword', 'accountWait');
        $.post(dbPath + '/users/modifyPassword.php', {
          val1: $("#password_old").val(),
          val2: $("#password_new").val(),
          val3: userData.ID,
        }, function(data) {
          // FUNCION FINALIZAR AJAX CON DATA
          //console.log(data);
          setTimeout(function() {
            if (data == "error") {
              showManagerDivs('accountWait', 'accountPassword');
              $("#accountWaitLoad").html("");
              $("#accountWaitLoad").addClass("d-none");
              createToast(accessMesages.errorPasswordOldNotMach, "ERROR", "error");
              return false
            } else if (data == "success") {
              showManagerDivs('accountWait', 'accountData', 'btnLogout', 2);
              $("#accountWaitLoad").html("");
              window.localStorage.removeItem("key2");
              window.localStorage.setItem("key2", $("#password_new").val());
              createToast(accessMesages.successChangePassword, "LISTO", "success");
            }
          },timeToShow);
        }).fail(function() {
          // FUNCION DE ERROR
          showManagerDivs('accountWait', 'accountPassword');
          $("#accountWaitLoad").html("");
          $("#accountWaitLoad").addClass("d-none");
          createToast(accessMesages.errorChangeAccountValues, "ERROR", "error");
          return false
        }).always(function() {
          // FUNCION SIEMPRE SE EJECUTA
        });
      });
    },timeRipple);
  } else {
    createToast(accessMesages.errorPasswordsNotSame, "ERROR", "error");
    if (putFocus) {
      $("#password_new").focus();
    };
    return false
  }
}