$(
  "<style>.border-danger { border-color: #dc3545 5px solid !important; box-shadow: 0 0 0 0.1rem rgba(220, 53, 69, 0.25) !important; }</style>",
).appendTo("head");
//$(
//    '<style>.swal-modal { background-color: #ffffff; color: #797979;} .swal-button { background-color: #8CD4F5; color: white; display: block; padding: 10px 32px; border-radius: 5px; cursor: pointer; font-size: 17px; font-weight: 500; border: none; } .swal-button { border: none !important; } .swal-button { box-shadow: none !important; }   .swal-button:active { border: none !important; }  .swal-button:focus { border: none !important; } .swal-icon--success .swal-icon--success__line, .swal-icon--success .swal-icon--success__hide-corners::before { border-color: #C9DAE1; } .swal-icon--success .swal-icon--success__line { background-color: #C9DAE1; } .swal-icon--success__ring { border-color: #C9DAE1; } .swal-title { color: #575757; font-weight: 600; font-family: "Poppins", sans-serif; } .swal-text { color: #797979; font-size: 16px; text-align: center; font-weight: 400; position: relative; text-align: inherit; float: none; margin: 0; padding: 0; line-height: normal; box-sizing: border-box; overflow-wrap: break-word; max-width: calc(100% - 20px); } .swal-footer { text-align: center; }</style>',
//).appendTo("head");

$(document).ready(function () {

  $("#txtPersonaFecNancimiento").datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange: "1923:2023",
      dateFormat: "dd/mm/yy",
      firstDay: 1,
      monthNames: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Setiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
      ],
      monthNamesShort: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Oct",
          "Nov",
          "Dic",
      ],
      dayNames: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miercoles",
          "Jueves",
          "Viernes",
          "Sabado",
      ],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
  });

  $("#formularioCliente").on("submit", function (event) {
      event.preventDefault();
      var formIsValid = iniValidador();
      if (formIsValid) {
          guardarDatos();
      } else {
          Swal.fire('\u00A1Atenci\u00F3n!', 'Complete todos los campos antes de enviar', 'warning');
      }
  });
});

function setNumbreFormat(id) {
  if (
      !isNaN(
          $("#" + id)
              .val()
              .replace(/,/g, ""),
      )
  )
      $("#" + id).val(numeral($("#" + id).val()).format("0,0.00"));
  else $("#" + id).val("0.00");
}

function CalcularEdad(id) {
  $("#txtPersonaEdad" + id.replace("txtPersonaFecNancimiento", "")).val(
      calcularAnos($("#" + id).val()),
  );
}

function IsNumeric(valor) {
  var log = valor.length;
  var sw = "S";
  for (x = 0; x < log; x++) {
      v1 = valor.substr(x, 1);
      v2 = parseInt(v1);
      if (isNaN(v2)) {
          sw = "N";
      }
  }
  if (sw == "S") {
      return true;
  } else {
      return false;
  }
}

var primerslap = false;
var segundoslap = false;
function formateafecha(fecha) {
  var long = fecha.length;
  var dia;
  var mes;
  var ano;
  if (long >= 2 && primerslap == false) {
      dia = fecha.substr(0, 2);
      if (IsNumeric(dia) == true && dia <= 31 && dia != "00") {
          fecha = fecha.substr(0, 2) + "/" + fecha.substr(3, 7);
          primerslap = true;
      } else {
          fecha = "";
          primerslap = false;
      }
  } else {
      dia = fecha.substr(0, 1);
      if (IsNumeric(dia) == false) {
          fecha = "";
      }
      if (long <= 2 && (primerslap = true)) {
          fecha = fecha.substr(0, 1);
          primerslap = false;
      }
  }
  if (long >= 5 && segundoslap == false) {
      mes = fecha.substr(3, 2);
      if (IsNumeric(mes) == true && mes <= 12 && mes != "00") {
          fecha = fecha.substr(0, 5) + "/" + fecha.substr(6, 4);
          segundoslap = true;
      } else {
          fecha = fecha.substr(0, 3);
          segundoslap = false;
      }
  } else {
      if (long <= 5 && (segundoslap = true)) {
          fecha = fecha.substr(0, 4);
          segundoslap = false;
      }
  }
  if (long >= 7) {
      ano = fecha.substr(6, 4);
      if (IsNumeric(ano) == false) {
          fecha = fecha.substr(0, 6);
      } else {
          if (long == 10) {
              if (ano == 0 || ano < 1900 || ano > 2100) {
                  fecha = fecha.substr(0, 6);
              }
          }
      }
  }

  if (long >= 10) {
      fecha = fecha.substr(0, 10);
      dia = fecha.substr(0, 2);
      mes = fecha.substr(3, 2);
      ano = fecha.substr(6, 4);
      if (ano % 4 != 0 && mes == 02 && dia > 28) {
          fecha = fecha.substr(0, 2) + "/";
      }
  }
  return fecha;
}
function calcularAnos(fecha) {
  var values = fecha.split("/");
  var dia = values[0];
  var mes = values[1];
  var ano = values[2];

  var fecha_hoy = new Date();
  var ahora_ano = fecha_hoy.getYear();
  var ahora_mes = fecha_hoy.getMonth() + 1;
  var ahora_dia = fecha_hoy.getDate();

  var edad = ahora_ano + 1900 - ano;
  if (ahora_mes < mes) {
      edad--;
  }
  if (mes == ahora_mes && ahora_dia < dia) {
      edad--;
  }
  if (edad > 1900) {
      edad -= 1900;
  }

  var meses = 0;
  if (ahora_mes > mes) meses = ahora_mes - mes;
  if (ahora_mes < mes) meses = 12 - (mes - ahora_mes);
  if (ahora_mes == mes && dia > ahora_dia) meses = 11;

  // calculamos los dias
  var dias = 0;
  if (ahora_dia > dia) dias = ahora_dia - dia;
  if (ahora_dia < dia) {
      ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
      dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
  }

  if (edad >= 0) return edad + " años y " + meses + " meses";
  else return "0 años y 0 meses";
}


function actualizarNombreArchivo(inputId, labelId) {
  const input = document.getElementById(inputId);
  const label = document.getElementById(labelId);

  if (input.files.length > 0) {
      label.textContent = input.files[0].name;
  } else {
      label.textContent = "Seleccionar Archivo...";
  }
}


function validarCampo(inputId, errorId) {
  if (!$(inputId).val()) {
      $(errorId).text("Campo obligatorio").css("color", "red");
      $(inputId).addClass("border-danger");
      isValid = false;
  } else {
      $(errorId).text("");
      $(inputId).removeClass("border-danger");
  }
}

function validarCampoReferencia(inputId, errorId) {
  var table = document.getElementById('referencesTable');
  var isTableEmpty = table.rows.length <= 1;
  if (!$(inputId).val()) {
      if (isTableEmpty) {
          $(errorId).text("Campo obligatorio").css("color", "red");
          $(inputId).addClass("border-danger")
      } else {
          $(errorId).text("");
          $(inputId).removeClass("border-danger");
      }
      isValid = false;
  } else {
      $(errorId).text("");
      $(inputId).removeClass("border-danger");
  }
}

function soloLetras(inputId) {
  var valor = $(inputId).val();
  var letrasRegEx = /^[a-zA-Z\s]*$/;

  if (!letrasRegEx.test(valor)) {
      return false;
  } else {
      return true;
  }
}

function validarCorreo(inputId) {
  var valor = $(inputId).val();
  if (!valor) {
      return true;
  }
  var correoRegEx = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return correoRegEx.test(valor);
}


function validarIBAN(inputId) {
  var valor = $(inputId).val().toUpperCase().replace(/\s/g, '');
  if (!valor) {
      return true;
  }
  var ibanRegex = /^CR\d+$/;

  return ibanRegex.test(valor);
}


var fechaFormatoRegEx = /^(\d{2})\/(\d{2})\/(\d{4})$/;

function validarFormatoFecha(inputId, errorId) {
  var isValid = true;
  var fechaValue = $(inputId).val().trim();

  if (!fechaValue) {
      $(errorId).text('Campo obligatorio').css('color', 'red');
      $(inputId).addClass('border-danger');
      isValid = false;
  } else if (!fechaFormatoRegEx.test(fechaValue)) {
      $(errorId).text('La fecha ingresada no es v\u00E1lida').css('color', 'red');
      $(inputId).addClass('border-danger');
      isValid = false;
  } else {
      $(errorId).text('');
      $(inputId).removeClass('border-danger');
  }

  return isValid;
}


function validarTelefono(inputId, errorId) {
  var table = document.getElementById('referencesTable');
  var isTableEmpty = table.rows.length <= 1;

  var valor = $(inputId).val();
  var telefonoFormatoRegEx = /^[2-8]\d{7}$/;
  var isValid = true;

  if (!valor) {
      if (isTableEmpty) {
          $(errorId).text("Campo obligatorio").css("color", "red");
          $(inputId).addClass("border-danger")
      } else {
          $(errorId).text("");
          $(inputId).removeClass("border-danger");
      }
          isValid = false;
  } else {
      if (!telefonoFormatoRegEx.test(valor)) {
          $(errorId).text('El tel\u00E9fono ingresado no es v\u00E1lido').css('color', 'red');
          $(inputId).addClass('border-danger');
          isValid = false;
      } else {
          $(errorId).text('');
          $(inputId).removeClass('border-danger');
      }
  }

  return isValid; 
}


$("#txtPersonaidentificacion").change(function () {
  validarCampo("#txtPersonaidentificacion", "#txtPersonaidentificacionError");
});
$("#txtPersonaidentificacion").focusout(function () {
  validarCampo("#txtPersonaidentificacion", "#txtPersonaidentificacionError");
});
$("#txtPersonaNombre").change(function () {
  validarCampo("#txtPersonaNombre", "#txtPersonaNombreError");
});
$("#txtPersonaNombre").focusout(function () {
  validarCampo("#txtPersonaNombre", "#txtPersonaNombreError");
});
$("#txtPersonaApellido1").change(function () {
  validarCampo("#txtPersonaApellido1", "#txtPersonaApellido1Error");
});
$("#txtPersonaApellido1").focusout(function () {
  validarCampo("#txtPersonaApellido1", "#txtPersonaApellido1Error");
});
$("#txtPersonaApellido2").change(function () {
  validarCampo("#txtPersonaApellido2", "#txtPersonaApellido2Error");
});
$("#txtPersonaApellido2").focusout(function () {
  validarCampo("#txtPersonaApellido2", "#txtPersonaApellido2Error");
});
$("#cboPersonaNacionalidad").change(function () {
  validarCampo("#cboPersonaNacionalidad", "#cboPersonaNacionalidadError");
});
$("#cboPersonaNacionalidad").focusout(function () {
  validarCampo("#cboPersonaNacionalidad", "#cboPersonaNacionalidadError");
});
$("#txtPersonaFecNancimiento").change(function () {
  validarFormatoFecha(
      "#txtPersonaFecNancimiento",
      "#txtPersonaFecNancimientoError",
  );
});
$("#txtPersonaFecNancimiento").focusout(function () {
  validarFormatoFecha(
      "#txtPersonaFecNancimiento",
      "#txtPersonaFecNancimientoError",
  );
});
$("#cboPersonaPais").change(function () {
  validarCampo("#cboPersonaPais", "#cboPersonaPaisError");
});
$("#cboPersonaPais").focusout(function () {
  validarCampo("#cboPersonaPais", "#cboPersonaPaisError");
});
$("#cboGenero").change(function () {
  validarCampo("#cboGenero", "#cboGeneroError");
});
$("#cboGenero").focusout(function () {
  validarCampo("#cboGenero", "#cboGeneroError");
});
$("#cboTipoDesembolso").change(function () {
  validarCampo("#cboTipoDesembolso", "#cboTipoDesembolsoError");
});
$("#cboTipoDesembolso").focusout(function () {
  validarCampo("#cboTipoDesembolso", "#cboTipoDesembolsoError");
});
$("#cboTipoCuentas").change(function () {
  validarCampo("#cboTipoCuentas", "#cboTipoCuentasError");
});
$("#cboTipoCuentas").focusout(function () {
  validarCampo("#cboTipoCuentas", "#cboTipoCuentasError");
});
$("#cboPlazo").change(function () {
  validarCampo("#cboPlazo", "#cboPlazoError");
});
$("#cboPlazo").focusout(function () {
  validarCampo("#cboPlazo", "#cboPlazoError");
});
$("#txtCuotaEstimada").change(function () {
  validarCampo("#txtCuotaEstimada", "#txtCuotaEstimadaError");
});
$("#txtCuotaEstimada").focusout(function () {
  validarCampo("#txtCuotaEstimada", "#txtCuotaEstimadaError");
});
$("#cboMedio").change(function () {
  validarCampo("#cboMedio", "#cboMedioError");
});
$("#cboMedio").focusout(function () {
  validarCampo("#cboMedio", "#cboMedioError");
});
$("#txtsucursal_formaliza").change(function () {
  validarCampo("#txtsucursal_formaliza", "#txtsucursal_formalizaError");
});
$("#txtsucursal_formaliza").focusout(function () {
  validarCampo("#txtsucursal_formaliza", "#txtsucursal_formalizaError");
});
$("#txtMontoAprobado").change(function () {
  validarCampo("#txtMontoAprobado", "#txtMontoAprobadoError");
});
$("#txtMontoAprobado").focusout(function () {
  validarCampo("#txtMontoAprobado", "#txtMontoAprobadoError");
});
$("#txtMontoSolicitado").change(function () {
  validarCampo("#txtMontoSolicitado", "#txtMontoSolicitadoError");
});
$("#txtMontoSolicitado").focusout(function () {
  validarCampo("#txtMontoSolicitado", "#txtMontoSolicitadoError");
});

$("#txtPersonaCorreo").change(function () {
  validarCampo("#txtPersonaCorreo", "#txtPersonaCorreoError");
  if (!validarCorreo("#txtPersonaCorreo")) {
      $("#txtPersonaCorreoError")
          .text("El correo ingresado no es v\u00E1lido")
          .css("color", "red");
      $("#txtPersonaCorreo").addClass("border-danger");
  }
});

$("#txtPersonaCorreo").focusout(function () {
  validarCampo("#txtPersonaCorreo", "#txtPersonaCorreoError");
  if (!validarCorreo("#txtPersonaCorreo")) {
      $("#txtPersonaCorreoError")
          .text("El correo ingresado no es v\u00E1lido")
          .css("color", "red");
      $("#txtPersonaCorreo").addClass("border-danger");
  }
});

$("#txtNumCuenta").change(function () {
  if (!$(this).val()) {
      $("#txtNumCuentaError")
          .text("Campo obligatorio")
          .css("color", "red");
      $(this).addClass("border-danger");
  } else if (!validarIBAN("#txtNumCuenta")) {
      $("#txtNumCuentaError")
          .text("La cuenta iban no es v\u00E1lida")
          .css("color", "red");
      $(this).addClass("border-danger");
  } else {
      $("#txtNumCuentaError").text("");
      $(this).removeClass("border-danger");
  }
});

$("#txtNumCuenta").focusout(function () {
  if (!$(this).val()) {
      $("#txtNumCuentaError")
          .text("Campo obligatorio")
          .css("color", "red");
      $(this).addClass("border-danger");
  } else if (!validarIBAN("#txtNumCuenta")) {
      $("#txtNumCuentaError")
          .text("La cuenta iban no es v\u00E1lida")
          .css("color", "red");
      $(this).addClass("border-danger");
  } else {
      $("#txtNumCuentaError").text("");
      $(this).removeClass("border-danger");
  }
});


$("#txtConyuge").change(function () {
  validarCampo("#txtConyuge", "#txtConyugeError");
  if (!soloLetras("#txtConyuge")) {
      $("#txtConyugeError")
          .text("El nombre ingresado no es v\u00E1lido")
          .css("color", "red");
      $("#txtConyuge").addClass("border-danger");
  }
});

$("#txtConyuge").focusout(function () {
  validarCampo("#txtConyuge", "#txtConyugeError");
  if (!soloLetras("#txtConyuge")) {
      $("#txtConyugeError")
          .text("El nombre ingresado no es v\u00E1lido")
          .css("color", "red");
      $("#txtConyuge").addClass("border-danger");
  }
});

$("#cboPersonaActividadEconomica").change(function () {
  validarCampo(
      "#cboPersonaActividadEconomica",
      "#cboPersonaActividadEconomicaError",
  );
});
$("#cboPersonaActividadEconomica").focusout(function () {
  validarCampo(
      "#cboPersonaActividadEconomica",
      "#cboPersonaActividadEconomicaError",
  );
});
$("#selPuesto").change(function () {
  validarCampo("#selPuesto", "#selPuestoError");
});
$("#selPuesto").focusout(function () {
  validarCampo("#selPuesto", "#selPuestoError");
});
$("#cboLocalizacionProvincia").change(function () {
  validarCampo("#cboLocalizacionProvincia", "#cboLocalizacionProvinciaError");
});
$("#cboLocalizacionProvincia").focusout(function () {
  validarCampo("#cboLocalizacionProvincia", "#cboLocalizacionProvinciaError");
});
$("#cboLocalizacionCanton").change(function () {
  validarCampo("#cboLocalizacionCanton", "#cboLocalizacionCantonError");
});
$("#cboLocalizacionCanton").focusout(function () {
  validarCampo("#cboLocalizacionCanton", "#cboLocalizacionCantonError");
});
$("#cboLocalizacionDistrito").change(function () {
  validarCampo("#cboLocalizacionDistrito", "#cboLocalizacionDistritoError");
});
$("#cboLocalizacionDistrito").focusout(function () {
  validarCampo("#cboLocalizacionDistrito", "#cboLocalizacionDistritoError");
});
$("#cboLocalizacionBarrio").change(function () {
  validarCampo("#cboLocalizacionBarrio", "#cboLocalizacionBarrioError");
});
$("#cboLocalizacionBarrio").focusout(function () {
  validarCampo("#cboLocalizacionBarrio", "#cboLocalizacionBarrioError");
});
$("#cboLocalizacionPoblado").change(function () {
  validarCampo("#cboLocalizacionPoblado", "#cboLocalizacionPobladoError");
});
$("#cboLocalizacionPoblado").focusout(function () {
  validarCampo("#cboLocalizacionPoblado", "#cboLocalizacionPobladoError");
});
$("#cboTrabajoPrincipal").change(function () {
  validarCampo("#cboTrabajoPrincipal", "#cboTrabajoPrincipalError");
});
$("#cboTrabajoPrincipal").focusout(function () {
  validarCampo("#cboTrabajoPrincipal", "#cboTrabajoPrincipalError");
});
$("#txtLugarTrabajo").change(function () {
  validarCampo("#txtLugarTrabajo", "#txtLugarTrabajoError");
});
$("#txtLugarTrabajo").focusout(function () {
  validarCampo("#txtLugarTrabajo", "#txtLugarTrabajoError");
});
$("#txtTelefonoLaboral").change(function () {
  validarTelefono("#txtTelefonoLaboral", "#txtTelefonoLaboralError");
});
$("#txtTelefonoLaboral").focusout(function () {
  validarTelefono("#txtTelefonoLaboral", "#txtTelefonoLaboralError");
});
$("#cboPuestoLaboral").change(function () {
  validarCampo("#cboPuestoLaboral", "#cboPuestoLaboralError");
});
$("#cboPuestoLaboral").focusout(function () {
  validarCampo("#cboPuestoLaboral", "#cboPuestoLaboralError");
});
$("#cboLocalizacionProvinciaLaboral").change(function () {
  validarCampo(
      "#cboLocalizacionProvinciaLaboral",
      "#cboLocalizacionProvinciaLaboralError",
  );
});
$("#cboLocalizacionProvinciaLaboral").focusout(function () {
  validarCampo(
      "#cboLocalizacionProvinciaLaboral",
      "#cboLocalizacionProvinciaLaboralError",
  );
});
$("#cboLocalizacionCantonLaboral").change(function () {
  validarCampo(
      "#cboLocalizacionCantonLaboral",
      "#cboLocalizacionCantonLaboralError",
  );
});
$("#cboLocalizacionCantonLaboral").focusout(function () {
  validarCampo(
      "#cboLocalizacionCantonLaboral",
      "#cboLocalizacionCantonLaboralError",
  );
});
$("#txtJefeInmediato").change(function () {
  validarCampo("#txtJefeInmediato", "#txtJefeInmediatoError");
  if (!soloLetras("#txtJefeInmediato")) {
      $("#txtJefeInmediatoError")
          .text("El nombre ingresado no es v\u00E1lido")
          .css("color", "red");
      $("#txtJefeInmediato").addClass("border-danger");
  }
});

$("#txtJefeInmediato").focusout(function () {
  validarCampo("#txtJefeInmediato", "#txtJefeInmediatoError");
  if (!soloLetras("#txtJefeInmediato")) {
      $("#txtJefeInmediatoError")
          .text("El nombre ingresado no es v\u00E1lido")
          .css("color", "red");
      $("#txtJefeInmediato").addClass("border-danger");
  }
});

$("#txtDireccionLaboral").change(function () {
  validarCampo("#txtDireccionLaboral", "#txtDireccionLaboralError");
});
$("#txtDireccionLaboral").focusout(function () {
  validarCampo("#txtDireccionLaboral", "#txtDireccionLaboralError");
});

$("#txtNombreReferencia").change(function () {
  if (!soloLetras("#txtNombreReferencia")) {
      $("#txtNombreReferenciaError")
          .text("El nombre ingresado no es v\u00E1lido")
          .css("color", "red");
      $("#txtNombreReferencia").addClass("border-danger");
  } else {
      validarCampoReferencia("#txtNombreReferencia", "#txtNombreReferenciaError");
  }
});


$("#txtNombreReferencia").focusout(function () {
  var table = document.getElementById('referencesTable');
  var isTableEmpty = table.rows.length <= 1;

  if (isTableEmpty) {
      if (!soloLetras("#txtNombreReferencia")) {
          $("#txtNombreReferenciaError")
              .text("El nombre ingresado no es v\u00E1lido")
              .css("color", "red");
          $("#txtNombreReferencia").addClass("border-danger");
      } else {
          validarCampoReferencia("#txtNombreReferencia", "#txtNombreReferenciaError");
      }
  }
});

$("#txtApellido1Referencia").change(function () {
      if (!soloLetras("#txtApellido1Referencia")) {
          $("#txtApellido1ReferenciaError")
              .text("El apellido ingresado no es v\u00E1lido")
              .css("color", "red");
          $("#txtApellido1Referencia").addClass("border-danger");
      } else {
          validarCampoReferencia("#txtApellido1Referencia", "#txtApellido1ReferenciaError");
      }
});

$("#txtApellido1Referencia").focusout(function () {
  var table = document.getElementById('referencesTable');
  var isTableEmpty = table.rows.length <= 1;

  if (isTableEmpty) {
      if (!soloLetras("#txtApellido1Referencia")) {
          $("#txtApellido1ReferenciaError")
              .text("El apellido ingresado no es v\u00E1lido")
              .css("color", "red");
          $("#txtApellido1Referencia").addClass("border-danger");
      } else {
          validarCampoReferencia("#txtApellido1Referencia", "#txtApellido1ReferenciaError");
      }
  }
});

$("#txtApellido2Referencia").change(function () {
      if (!soloLetras("#txtApellido2Referencia")) {
          $("#txtApellido2ReferenciaError")
              .text("El apellido ingresado no es v\u00E1lido")
              .css("color", "red");
          $("#txtApellido2Referencia").addClass("border-danger");
      } else {
          validarCampoReferencia("#txtApellido2Referencia", "#txtApellido2ReferenciaError");
      }
});

$("#txtApellido2Referencia").focusout(function () {
  var table = document.getElementById('referencesTable');
  var isTableEmpty = table.rows.length <= 1;

  if (isTableEmpty) {
      if (!soloLetras("#txtApellido2Referencia")) {
          $("#txtApellido2ReferenciaError")
              .text("El apellido ingresado no es v\u00E1lido")
              .css("color", "red");
          $("#txtApellido2Referencia").addClass("border-danger");
      } else {
          validarCampoReferencia("#txtApellido2Referencia", "#txtApellido2ReferenciaError");
      }
  }
});

$("#txtTelefonoReferencia").change(function () {
  validarTelefono("#txtTelefonoReferencia", "#txtTelefonoReferenciaError");
});

$("#txtTelefonoReferencia").focusout(function () {
  var table = document.getElementById('referencesTable');
  var isTableEmpty = table.rows.length <= 1;

  if (isTableEmpty) {
      validarTelefono("#txtTelefonoReferencia", "#txtTelefonoReferenciaError");
  }
});

$("#txtEmpresaReferencia").change(function () {
  validarCampoReferencia("#txtEmpresaReferencia", "#txtEmpresaReferenciaError");
});

$("#txtEmpresaReferencia").focusout(function () {
  var table = document.getElementById('referencesTable');
  var isTableEmpty = table.rows.length <= 1;

  if (isTableEmpty) {
      validarCampoReferencia("#txtEmpresaReferencia", "#txtEmpresaReferenciaError");
  }
});

$("#cboParentescoReferencia").change(function () {
  validarCampoReferencia("#cboParentescoReferencia", "#cboParentescoReferenciaError");
});

$("#cboParentescoReferencia").focusout(function () {
  var table = document.getElementById('referencesTable');
  var isTableEmpty = table.rows.length <= 1;

  if (isTableEmpty) {
      validarCampoReferencia("#cboParentescoReferencia", "#cboParentescoReferenciaError");
  }
});

$("#cboLocalizacionDistritoLaboral").change(function () {
  validarCampo(
      "#cboLocalizacionDistritoLaboral",
      "#cboLocalizacionDistritoLaboralError",
  );
});
$("#cboLocalizacionDistritoLaboral").focusout(function () {
  validarCampo(
      "#cboLocalizacionDistritoLaboral",
      "#cboLocalizacionDistritoLaboralError",
  );
});

function iniValidador() {
  var isValid = true;
  var table = document.getElementById('referencesTable');
  var tableRowCount = table.rows.length;

  function validateField(value, fieldId, errorId, errorMessage) {
      if (!value) {
          $(errorId)
              .text(errorMessage)
              .css("color", "red");
          $(fieldId).addClass("border-danger");
          isValid = false;
      }
  }

  validateField(
      $("#txtPersonaidentificacion").val(),
      "#txtPersonaidentificacion",
      "#txtPersonaidentificacionError",
      "Campo obligatorio"
  );

  validateField(
      $("#txtPersonaNombre").val(),
      "#txtPersonaNombre",
      "#txtPersonaNombreError",
      "Campo obligatorio"
  );

  validateField(
      $("#txtPersonaApellido1").val(),
      "#txtPersonaApellido1",
      "#txtPersonaApellido1Error",
      "Campo obligatorio"
  );

  validateField(
      $("#txtPersonaApellido2").val(),
      "#txtPersonaApellido2",
      "#txtPersonaApellido2Error",
      "Campo obligatorio"
  );

  validateField(
      $("#cboPersonaNacionalidad").val(),
      "#cboPersonaNacionalidad",
      "#cboPersonaNacionalidadError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboPersonaPais").val(),
      "#cboPersonaPais",
      "#cboPersonaPaisError",
      "Campo obligatorio"
  );

  validateField(
      $("#txtPersonaFecNancimiento").val(),
      "#txtPersonaFecNancimiento",
      "#txtPersonaFecNancimientoError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboGenero").val(),
      "#cboGenero",
      "#cboGeneroError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboTipoDesembolso").val(),
      "#cboTipoDesembolso",
      "#cboTipoDesembolsoError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboTipoCuentas").val(),
      "#cboTipoCuentas",
      "#cboTipoCuentasError",
      "Campo obligatorio"
  );

  validateField(
      $("#txtNumCuenta").val(),
      "#txtNumCuenta",
      "#txtNumCuentaError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboPlazo").val(),
      "#cboPlazo",
      "#cboPlazoError",
      "Campo obligatorio"
  );

  validateField(
      $("#txtCuotaEstimada").val(),
      "#txtCuotaEstimada",
      "#txtCuotaEstimadaError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboMedio").val(),
      "#cboMedio",
      "#cboMedioError",
      "Campo obligatorio"
  );

  validateField(
      $("#txtsucursal_formaliza").val(),
      "#txtsucursal_formaliza",
      "#txtsucursal_formalizaError",
      "Campo obligatorio"
  );

  validateField(
      ($("#txtMontoAprobado").val() && $("#txtMontoAprobado").val() != "0.00") ? $("#txtMontoAprobado").val() : "",
      "#txtMontoAprobado",
      "#txtMontoAprobadoError",
      "Campo obligatorio"
  );

  validateField(
      ($("#txtMontoSolicitado").val() && $("#txtMontoSolicitado").val() != "0.00") ? $("#txtMontoSolicitado").val() : "",
      "#txtMontoSolicitado",
      "#txtMontoSolicitadoError",
      "Campo obligatorio"
  );

  validateField(
      $("#txtPersonaCorreo").val(),
      "#txtPersonaCorreo",
      "#txtPersonaCorreoError",
      "Campo obligatorio"
  );
  validateField(
      $("#txtConyuge").val(),
      "#txtConyuge",
      "#txtConyugeError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboPersonaActividadEconomica").val(),
      "#cboPersonaActividadEconomica",
      "#cboPersonaActividadEconomicaError",
      "Campo obligatorio"
  );

  validateField(
      $("#selPuesto").val(),
      "#selPuesto",
      "#selPuestoError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboLocalizacionProvincia").val(),
      "#cboLocalizacionProvincia",
      "#cboLocalizacionProvinciaError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboLocalizacionCanton").val(),
      "#cboLocalizacionCanton",
      "#cboLocalizacionCantonError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboLocalizacionDistrito").val(),
      "#cboLocalizacionDistrito",
      "#cboLocalizacionDistritoError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboLocalizacionBarrio").val(),
      "#cboLocalizacionBarrio",
      "#cboLocalizacionBarrioError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboLocalizacionPoblado").val(),
      "#cboLocalizacionPoblado",
      "#cboLocalizacionPobladoError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboTrabajoPrincipal").val(),
      "#cboTrabajoPrincipal",
      "#cboTrabajoPrincipalError",
      "Campo obligatorio"
  );

  validateField(
      $("#txtLugarTrabajo").val(),
      "#txtLugarTrabajo",
      "#txtLugarTrabajoError",
      "Campo obligatorio"
  );

  validateField(
      $("#txtTelefonoLaboral").val(),
      "#txtTelefonoLaboral",
      "#txtTelefonoLaboralError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboPuestoLaboral").val(),
      "#cboPuestoLaboral",
      "#cboPuestoLaboralError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboLocalizacionProvinciaLaboral").val(),
      "#cboLocalizacionProvinciaLaboral",
      "#cboLocalizacionProvinciaLaboralError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboLocalizacionCantonLaboral").val(),
      "#cboLocalizacionCantonLaboral",
      "#cboLocalizacionCantonLaboralError",
      "Campo obligatorio"
  );

  validateField(
      $("#txtJefeInmediato").val(),
      "#txtJefeInmediato",
      "#txtJefeInmediatoError",
      "Campo obligatorio"
  );

  validateField(
      $("#txtDireccionLaboral").val(),
      "#txtDireccionLaboral",
      "#txtDireccionLaboralError",
      "Campo obligatorio"
  );

  validateField(
      $("#cboLocalizacionDistritoLaboral").val(),
      "#cboLocalizacionDistritoLaboral",
      "#cboLocalizacionDistritoLaboralError",
      "Campo obligatorio"
  );

  if (tableRowCount <= 1) {
      validateField(
          $("#txtNombreReferencia").val(),
          "#txtNombreReferencia",
          "#txtNombreReferenciaError",
          "Campo obligatorio"
      );

      validateField(
          $("#txtApellido1Referencia").val(),
          "#txtApellido1Referencia",
          "#txtApellido1ReferenciaError",
          "Campo obligatorio"
      );

      validateField(
          $("#txtApellido2Referencia").val(),
          "#txtApellido2Referencia",
          "#txtApellido2ReferenciaError",
          "Campo obligatorio"
      );

      validateField(
          $("#txtTelefonoReferencia").val(),
          "#txtTelefonoReferencia",
          "#txtTelefonoReferenciaError",
          "Campo obligatorio"
      );

      validateField(
          $("#txtEmpresaReferencia").val(),
          "#txtEmpresaReferencia",
          "#txtEmpresaReferenciaError",
          "Campo obligatorio"
      );

      validateField(
          $("#cboParentescoReferencia").val(),
          "#cboParentescoReferencia",
          "#cboParentescoReferenciaError",
          "Campo obligatorio"
      );
  }

  return isValid;
}


function guardarReferencia() {

  var isValid = true;

  var nombre = $("#txtNombreReferencia").val();
  var apellido1 = $("#txtApellido1Referencia").val();
  var apellido2 = $("#txtApellido2Referencia").val();
  var parentesco = $("#cboParentescoReferencia").val();
  var telefono = $("#txtTelefonoReferencia").val();
  var empresa = $("#txtEmpresaReferencia").val();

  if (!$("#txtNombreReferencia").val()) {
      isValid = false;
  }

  if (!$("#txtApellido1Referencia").val()) {
      isValid = false;
  }

  if (!$("#txtApellido2Referencia").val()) {
      isValid = false;
  }

  if (!$("#cboParentescoReferencia").val()) {
      isValid = false;
  }

  if (!$("#cboParentescoReferencia").val()) {
      isValid = false;
  }

  if (isValid) {
      var table = document.getElementById('referencesTable');

      if (table.classList.contains('d-none')) {
          table.classList.remove('d-none');
      }

      var row = table.insertRow(-1);
      row.insertCell(0).innerHTML = nombre.value;
      row.insertCell(1).innerHTML = apellido1.value;
      row.insertCell(2).innerHTML = apellido2.value;
      row.insertCell(3).innerHTML = parentesco.value;
      row.insertCell(4).innerHTML = telefono.value;
      row.insertCell(5).innerHTML = empresa.value;

      var deleteCell = row.insertCell(6);
      deleteCell.innerHTML = '<button class="btn btn-danger deleteButton"><i class="fa fa-trash-o"></i></button>';

      nombre.value = '';
      apellido1.value = '';
      apellido2.value = '';
      parentesco.value = '';
      telefono.value = '';
      empresa.value = '';
  }
};

document.getElementById('referencesTable').addEventListener('click', function (e) {
  if (e.target && (e.target.classList.contains('deleteButton') || e.target.parentNode.classList.contains('deleteButton'))) {
      var row = e.target.closest('tr');
      row.parentNode.removeChild(row);

      if (document.getElementById('referencesTable').rows.length === 1) {
          document.getElementById('referencesTable').classList.add('d-none');
      }
  }
});


function obtenerReferencias() {
      var table = document.getElementById('referencesTable');
      var references = [];
      for (var i = 1, row; row = table.rows[i]; i++) {
          var reference = {
              nombre: row.cells[0].innerText,
              apellido1: row.cells[1].innerText,
              apellido2: row.cells[2].innerText,
              parentesco: row.cells[3].innerText,
              telefono: row.cells[4].innerText,
              empresa: row.cells[5].innerText
          };
          references.push(reference);
  }

  return references;
}

  function mostrarErrorAlert() {
      var errorSpanIds = [
          "txtPersonaidentificacionError",
          "txtPersonaNombreError",
          "txtPersonaApellido1Error",
          "txtPersonaApellido2Error",
          "cboPersonaNacionalidadError",
          "cboPersonaPaisError",
          "txtPersonaFecNancimientoError",
          "cboGeneroError",
          "cboTipoDesembolsoError",
          "cboTipoCuentasError",
          "txtNumCuentaError",
          "cboPlazoError",
          "txtCuotaEstimadaError",
          "cboMedioError",
          "txtsucursal_formalizaError",
          "txtMontoAprobadoError",
          "txtMontoSolicitadoError",
          "txtPersonaCorreoError",
          "txtConyugeError",
          "cboPersonaActividadEconomicaError",
          "selPuestoError",
          "cboLocalizacionProvinciaError",
          "cboLocalizacionCantonError",
          "cboLocalizacionDistritoError",
          "cboLocalizacionBarrioError",
          "cboLocalizacionPobladoError",
          "cboTrabajoPrincipalError",
          "txtLugarTrabajoError",
          "txtTelefonoLaboralError",
          "cboPuestoLaboralError",
          "cboLocalizacionProvinciaLaboralError",
          "cboLocalizacionCantonLaboralError",
          "txtJefeInmediatoError",
          "txtDireccionLaboralError",
          "txtNombreReferenciaError",
          "txtApellido1ReferenciaError",
          "txtApellido2ReferenciaError",
          "txtTelefonoReferenciaError",
          "txtEmpresaReferenciaError",
          "cboParentescoReferenciaError",
          "cboLocalizacionDistritoLaboralError"
      ];

      var hasErrors = false;

      for (var i = 0; i < errorSpanIds.length; i++) {
          var errorSpan = $("#" + errorSpanIds[i]);
          var errorMessage = errorSpan.text().trim();
          if (errorMessage) {
              var errorMessageToDisplay = errorMessage; 
              Swal.fire('\u00A1Atenci\u00F3n!', errorMessageToDisplay, 'warning');
              hasErrors = true;
              break;
          }
      }

      return !hasErrors;
  }


function guardarDatos() {
  var resultMostrarError = false;
  var referencias = [];
  resultMostrarError = mostrarErrorAlert();

  if (resultMostrarError) {
      referencias = obtenerReferencias();
      var data = {
          //id_m_solicitud: Number("1813014"),
          id_m_solicitud: Number($("#txtIdSolicitud").val()),
          //per_cedula: Number($("#txtPersonaidentificacion").val()),
          pais_nacimiento: Number($("#cboPersonaPais").val()),
          per_fecha_nac: $("#txtPersonaFecNancimiento").val().split("/").reverse().join("-"),
          id_nacionalidad: Number($("#cboPersonaNacionalidad").val()),
          id_genero: Number($("#cboGenero").val()),
          tipo_desembolso: Number($("#cboTipoDesembolso").val()),
          id_actividad_economica: Number($("#cboPersonaActividadEconomica").val()),
          id_puesto: Number($("#selPuesto").val()),
          id_medios: Number($("#cboMedio").val()),
          tipo_cuenta_banco: Number($("#cboTipoCuentas").val()),
          //num_cuenta_banco: $("#txtNumCuenta").val(),
          num_cuenta_banco: "",
          //conyuge: $("#txtConyuge").val(),
          conyuge: "",
          monto_solicitado: parseInt($("#txtMontoSolicitado").val().replace(/,/g, '')),
          sol_plazo: Number($("#cboPlazo").val()),
          sucursal_formaliza: Number($("#txtsucursal_formaliza").val()),
          //txtPersonaidentificacion: Number($("#txtPersonaidentificacion").val()),
          //txtPersonaNombre: $("#txtPersonaNombre").val(),
          //txtPersonaApellido1: $("#txtPersonaApellido1").val(),
          //txtPersonaApellido2: $("#txtPersonaApellido2").val(),
          //txtCuotaEstimada: Number($("#txtCuotaEstimada").val()),
          //txtMontoAprobado: Number($("#txtMontoAprobado").val()),
          //txtPersonaCorreo: $("#txtPersonaCorreo").val(),
          //cboLocalizacionProvincia: Number($("#cboLocalizacionProvincia").val()),
          //cboLocalizacionCanton: Number($("#cboLocalizacionCanton").val()),
          //cboLocalizacionDistrito: Number($("#cboLocalizacionDistrito").val()),
          //cboLocalizacionBarrio: Number($("#cboLocalizacionBarrio").val()),
          //cboLocalizacionPoblado: Number($("#cboLocalizacionPoblado").val()),
          //cboTrabajoPrincipal: Number($("#cboTrabajoPrincipal").val()),
          //txtLugarTrabajo: $("#txtLugarTrabajo").val(),
          //txtTelefonoLaboral: $("#txtTelefonoLaboral").val(),
          //cboPuestoLaboral: Number($("#cboPuestoLaboral").val()),
          //cboLocalizacionProvinciaLaboral: Number($("#cboLocalizacionProvinciaLaboral").val()),
          //cboLocalizacionCantonLaboral: Number($("#cboLocalizacionCantonLaboral").val()),
          //txtJefeInmediato: $("#txtJefeInmediato").val(),
          //txtDireccionLaboral: $("#txtDireccionLaboral").val(),
          //txtNombreReferencia: $("#txtNombreReferencia").val(),
          //txtApellido1Referencia: $("#txtApellido1Referencia").val(),
          //txtApellido2Referencia: $("#txtApellido2Referencia").val(),
          //txtTelefonoReferencia: $("#txtTelefonoReferencia").val(),
          //txtEmpresaReferencia: $("#txtEmpresaReferencia").val(),
          //cboParentescoReferencia: Number($("#cboParentescoReferencia").val()),
          //cboLocalizacionDistritoLaboral: Number($("#cboLocalizacionDistritoLaboral").val())

          referencias: JSON.stringify(referencias)

      };

      //console.log('Mostrando data', JSON.stringify(data));
      //Swal.fire({
      //    title: 'Enviando datos...',
      //    allowEscapeKey: false,
      //    allowOutsideClick: false,
      //    onOpen: () => {
      //        Swal.showLoading();
      //    }
      //});

      //$.ajax({
      //    url: 'http://localhost:5239/api/DataVerification/SaveClientData',
      //    type: 'POST',
      //    data: JSON.stringify(data),
      //    contentType: 'application/json; charset=utf-8',
      //    dataType: 'json',
      //    async: false
      //}).done(function (response) {
      //    console.log('Esta es la respuesta del servidor', response);
      //    setTimeout(function () {
      //        Swal.close();
      //        Swal.fire('\u00A1\u00C9xito!', 'Datos enviados correctamente', 'success');
      //    }, 3000);
      //}).fail(function (jqXHR, textStatus, errorThrown) {
      //    console.error("Error en la petición: ", textStatus, ", Detalles: ", errorThrown);
      //    console.error("Respuesta del servidor: ", jqXHR.responseText);
      //    Swal.close();
      //    Swal.fire('¡Error!', 'Hubo un error al enviar los datos', 'error');
      //});

  }
}

