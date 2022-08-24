// TRAER LA AGENDA DEL USUARIO
function getStudentScheduler() {
  setTimeout(function() {
    $.get("fragments/general/loadData.html", function (data) {
      // console.log(data);
      $("#studentLoading").html(data);
      $("#MSG_ID").attr("id", "loadWaitMensaje");
      $("#loadWaitMensaje").html(generalMesages.loadMensaje);
      $("#SPIN_ID").attr("id", "loadWaitSpin");
      $("#studentLoading").removeClass("d-none");
      $.post(dbPath + '/student/userScheduler.php', {
        val1: userData.ID,
      }, function(data) {
        // FUNCION FINALIZAR AJAX CON DATA
        console.log(data);
        setTimeout(function() {
        // que carajos hacemos con los resultados
        
        for(let i = 0; i < data.length; i = i + 1 ) {  
          $.get("fragments/cards/studentCard.html", function (card) {
            console.log( data[i].date)
            card=card.replace("$fecha", data[i].date);
            card=card.replace("$horas", data[i].hours);
            card=card.replace("$horainicio", data[i].startHour);
            card=card.replace("$horafin", data[i].finishHour);
            $("#resultDate").append(card);
          })
        };

        $("#studentLoading").addClass("d-none");
        $("#viewdata").removeClass("d-none");

        },timeToShow);
      }).fail(function() {
        // FUNCION DE ERROR
        $("#studentLoading").addClass("d-none");
        $("#studentLoading").html("");
        createToast(loginMesajes.errorStartSesion, "ERROR", "error");
        return false
      }).always(function() {
        // FUNCION SIEMPRE SE EJECUTA
      });
    });
  },timeRipple);
}