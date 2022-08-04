// VARIABLES GENERALES Y CONSTANTES
const timeToShow = 320; // UN TIEMPO DE ESPERA PARA VER EL DISEÑO
const putFocus = false; // DETERMINA SI SE DEBE PONER EL FOCO EN LOS INPUTS, false=NO, true=SI
const timeRipple = 150; // TIEMPO DE ESPERA DEL EFECTO RIPPLE
const dbPath = "databases"; // DETERMINA LA RUTA DE LOS PHP DE MANEJO DE LA BASE DE DATOS
var userData; // DATOS DEL USUARIO LOGUEADO
// const mailPath = "http://mrblocklib.com/"; // DETERMINA LA RUTA DEL PHP PARA MANDAR MAILS
const mailPath = ""; // DETERMINA LA RUTA DEL PHP PARA MANDAR MAILS
const appMail = "dariomadeira@gmail.com" // DETERMINA EL MAIL AL CUAL SE LE ENVIARÁ EL ESTADO DE LA APP
const appMailName = "Darío Madeira"

// ARRANQUE (READY)
$(document).ready(function () {
  $.get("fragments/general/loadData.html", function (data) {
    // console.log(data);
    $("#generalWait").html(data);
    $("#MSG_ID").attr("id", "loadGeneralMensaje");
    $("#loadGeneralMensaje").html(generalMesages.waitMensaje);
    $("#SPIN_ID").attr("id", "loadGeneralSpin");
    $("#generalWait").removeClass("d-none");
    injectStyles("::-webkit-scrollbar {width: 6px;background: #f1f1fc;}");
    injectStyles(
      "::-webkit-scrollbar-thumb {background: #cccccc;cursor: pointer;}"
    );
    injectStyles(
      "::-webkit-scrollbar-thumb:hover {background: #949494;cursor: pointer;}"
    );
    setTimeout(function () {
      loadLogin();
    }, timeToShow);
  });
});

// INJECTAR UN ESTILO DIRECTO EN EL BODY
function injectStyles(rule) {
  var item = $("<div><style>" + rule + "</style></div>");
  $("body").append(item);
}

// CARGAR EL LOGIN
function loadLogin() {
  $.get("pages/login/login.html", function (data) {
    // console.log(data);
    $("#scrDivs").html(data);
    const user = window.localStorage.getItem("key");
    const password = window.localStorage.getItem("key2");
    const chkauto = window.localStorage.getItem("key3");
    if (user != null) {
      $("#logUser").val(user);
      $("#logUser").addClass("valid");
    }
    if (password != null) {
      $("#logPassword").val(password);
      $("#logPassword").addClass("valid");
    }
    if (chkauto == null) {
      $("#autologin").prop("checked", false);
    }
    if (chkauto == "false") {
      $("#autologin").prop("checked", false);
    }
    if (chkauto == "true") {
      $("#autologin").prop("checked", true);
    }
    if ($("#autologin").prop('checked')) {
      $("#generalWait").addClass("d-none");
      $.get("fragments/general/loadData.html", function (data) {
        // console.log(data);
        $("#loginWait").html(data);
        $("#MSG_ID").attr("id", "loadWaitMensaje");
        $("#loadWaitMensaje").html(generalMesages.autologin);
        $("#SPIN_ID").attr("id", "loadWaitSpin");
        $("#loginWait").removeClass("d-none");
        setTimeout(function () {
          $("#btnLogin").trigger("click");
        }, timeToShow);
      })
    } else {
      $("#generalWait").addClass("d-none");
      $("#loginData").removeClass("d-none");
      $("#btnloginCard").removeClass("d-none");
      if (putFocus) {
        $("#logUser").focus();
      }
    }
  });
}

// CHEQUEAR INPUT TECLA ENTER
function checkEnter(e, input) {
  var t = e.keyCode || e.wich;
  if (input == "logPassword") {
    if (t == 13) {
      loginApp();
    }
  }
  if (input == "resetUser") {
    if (t == 13) {
      resetPassNow();
    }
  }
}

// MOSTRAR MENSAJES
function createToast(texto, titulo, tipo) {
  $.toast({
    heading: titulo,
    text: texto,
    icon: tipo,
    loader: false,
    position: 'bottom-left',
    stack: false,
    allowToastClose: false,
  })
}

// SABER SI UN INPUT ESTA EN BLANCO
function checkWhite(str) {
  var status;
  var re = new RegExp("(?=.*[a-z]).{5,}");
  if (re.test(str)) {
    status = true;
  } else {
    status = false;
  }
  return status;
}

// MANEJADOR DE LA BARRA DE NAVEGACION
function manageNavbar(status) {
  $("#rightBtns button").each(function() {
    $(this).addClass("d-none");
  });
  if (status == 1) {
    $("#btnProfile").removeClass("d-none");
    $("#btnLogout").removeClass("d-none");
  }
}

// LLEVAR EL SCROLL AL FINAL
function goBottom() {
  $('html, body').animate({scrollTop:$(document).height()}, 'slow');
}

// SABER SI UN INPUT ESTA VACIO
function checkEmpty(pw) {
  var error = "";
  if ((pw.length < 1) || (pw == "") || (pw == " ")) {
    error = false;
  } else {
    error = true;
  }
  return error;
}

// VALIDAR SI UN EMAIL ESTÁ BIEN
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// PERMITIR SOLO NUMEROS
function justNumbers(e) {
  var keynum = window.event ? window.event.keyCode : e.which;
  if ((keynum == 8) || (keynum == 46)) return true; return /\d/.test(String.fromCharCode(keynum));
}










// FUNCIÓN QUE de carga
function getDataFromDB(dbPath, phpvalues) {
  $.post(dbPath + dbPath, phpvalues, function(data) {
    // FUNCION FINALIZAR AJAX CON DATA
    // console.log(data);
    setTimeout(function() {
      var totals = data.length;
      // totals = 0;
      if (totals == 0 ) {
        return "EMPTY";
      } else {
        return data;
      }
    },timeToShow);
  }).fail(function() {
    // FUNCION DE ERROR


    // $(".bg-mychildrens").remove();
    // $("#myChildrensCard").addClass("d-none");
    // $("#scrMyChildrensHeader").addClass("d-none");
    // filterKidsManager(2);
    // $("#filterMyChildrensAll").trigger("click");
    // $("#scrMyChildrens").removeAttr("isload");
    // $("#scrMyChildrens").removeAttr("mychildrencount");
    $.get("fragments/cardConection.html", function(data) {
      //console.log(data);
      $("#myChildrensCard").html(data);
      $("#CHANGE_CONECCTION_ID").attr("id", "errorMyChildrensMensaje");
      $("#errorMyChildrensMensaje").html(generalMesages.errorConection);      
      $("#myChildrensCard").removeClass("d-none");
      // manageHelp(0);
      // floatBtnManagerRight(0);
    });


    return false
  }).always(function() {
    // FUNCION SIEMPRE SE EJECUTA
  });
}













// MANEJA LAS ÁREAS DE LA APP
function gotoArea(gotoDiv, addicionalData) {
  setTimeout(function() {
    $.get("fragments/general/loadData.html", function(data) {
      //console.log(data);
      $("#generalWait").html(data);
      $("#MSG_ID").attr("id", "loadData");
      $("#loadData").html(generalMesages.loadMensaje);
      $("#SPIN_ID").attr("id", "loadDataSpin");
      $("#scrDivs").addClass("d-none");
      $("#generalWait").removeClass("d-none");
      if (gotoDiv == "scrStudent") {
        $.get("pages/student/student.html", function (data) {
          console.log("****",data);
          $("#scrDivs").html(data);





          $("#generalWait").addClass("d-none");
          $("#generalWait").html("");
          $("#scrDivs").removeClass("d-none");


        });


      // $.get("fragments/general/loadData.html", function(data) {
      //   //console.log(data);
      //   $("#shopCard").html(data);
      //   $("#MSG_ID").attr("id", "loadShopMensaje");
      //   $("#loadShopMensaje").html(generalMesages.loadMensaje);
      //   $("#SPIN_ID").attr("id", "loadShopSpin");
      //   $("#shopCard").removeClass("d-none");
      //   $(".manageDivs").addClass('d-none');
      //   $("#scrShopHeader").addClass('d-none');
      //   $("#scrShop").removeClass("d-none");
      //   backBtnManager("15");
      //   updateBtnManager(0);
      //   manageHelp(0);
      //   getProductsToShop(addicionalData, 0);
      // });
      }




      // $(".manageDivs").addClass('d-none');
      // $("#scrShopHeader").addClass('d-none');
      // $("#scrShop").removeClass("d-none");
      // backBtnManager("15");
      // updateBtnManager(0);
      // manageHelp(0);
      // getProductsToShop(addicionalData, 0);
    });


    // if (gotoDiv == "scrMain") {
    //   $.get("fragments/general/loadData.html", function(data) {
    //     //console.log(data);
    //     $("#shopCard").html(data);
    //     $("#MSG_ID").attr("id", "loadShopMensaje");
    //     $("#loadShopMensaje").html(generalMesages.loadMensaje);
    //     $("#SPIN_ID").attr("id", "loadShopSpin");
    //     $("#shopCard").removeClass("d-none");
    //     $(".manageDivs").addClass('d-none');
    //     $("#scrShopHeader").addClass('d-none');
    //     $("#scrShop").removeClass("d-none");
    //     backBtnManager("15");
    //     updateBtnManager(0);
    //     manageHelp(0);
    //     getProductsToShop(addicionalData, 0);
    //   });
    // }
  },timeRipple);
}