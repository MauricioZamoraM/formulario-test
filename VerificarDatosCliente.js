document.getElementById("btnScrollToTop").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$(document).ready(function () {

  $('#expand-cliente').click(function () {
      $('#InfoCliente').show();
  });

  $('#minus-cliente').click(function () {
      $('#InfoCliente').hide();
  });

  $('#expand-solicitud').click(function () {
      $('#InfoSolicitud').show();
  });

  $('#minus-solicitud').click(function () {
      $('#InfoSolicitud').hide();
  });

  $('#expand-localizacion').click(function () {
      $('#InfoLocalizacion').show();
  });

  $('#minus-localizacion').click(function () {
      $('#InfoLocalizacion').hide();
  });

  $('#expand-laboral').click(function () {
      $('#InfoLaboral').show();
  });

  $('#minus-laboral').click(function () {
      $('#InfoLaboral').hide();
  });

  $('#expand-referencias').click(function () {
      $('#InfoReferencias').show();
  });

  $('#minus-referencias').click(function () {
      $('#InfoReferencias').hide();
  });

  $('#expand-desembolso').click(function () {
      $('#InfoDesembolso').show();
  });

  $('#minus-desembolso').click(function () {
      $('#InfoDesembolso').hide();
  });
});

