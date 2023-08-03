document.getElementById('addReference').addEventListener('click', function () {
  var isValid = true;

  var nombre = document.getElementById('txtNombreReferencia');
  var apellido1 = document.getElementById('txtApellido1Referencia');
  var apellido2 = document.getElementById('txtApellido2Referencia');
  var parentesco = document.getElementById('cboParentescoReferencia');
  var telefono = document.getElementById('txtTelefonoReferencia');
  var empresa = document.getElementById('txtEmpresaReferencia');

  if (!nombre.value) {
      document.getElementById('txtNombreReferenciaError').textContent = 'Campo obligatorio';
      nombre.classList.add('border-danger');
      isValid = false;
  } 

  if (!apellido1.value) {
      document.getElementById('txtApellido1ReferenciaError').textContent = 'Campo obligatorio';
      apellido1.classList.add('border-danger');
      isValid = false;
  } 

  if (!apellido2.value) {
      document.getElementById('txtApellido2ReferenciaError').textContent = 'Campo obligatorio';
      apellido2.classList.add('border-danger');
      isValid = false;
  } 

  if (!telefono.value) {
      document.getElementById('txtTelefonoReferenciaError').textContent = 'Campo obligatorio';
      telefono.classList.add('border-danger');
      isValid = false;
  } 

  if (!empresa.value) {
      document.getElementById('txtEmpresaReferenciaError').textContent = 'Campo obligatorio';
      empresa.classList.add('border-danger');
      isValid = false;
  } 

  if (!parentesco.value) {
      document.getElementById('cboParentescoReferenciaError').textContent = 'Campo obligatorio';
      parentesco.classList.add('border-danger');
      isValid = false;
  } 
  

if (isValid) {
   var isValidRef = mostrarErrorReferenciaAlert();
   if (isValidRef) {
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

} else {
   Swal.fire('\u00A1Atenci\u00F3n!', 'Complete todos los campos antes de agregar la referencia', 'warning');
}
});


document.getElementById('referencesTable').addEventListener('click', function (e) {
if (e.target && (e.target.classList.contains('deleteButton') || e.target.parentNode.classList.contains('deleteButton'))) {
  var row = e.target.closest('tr');

  if (row && row.parentNode) {
      row.parentNode.removeChild(row);

      if (document.getElementById('referencesTable').rows.length === 1) {
          document.getElementById('referencesTable').classList.add('d-none');
      }
  }
}
});

function mostrarErrorReferenciaAlert() {
var errorSpanIds = [
  "txtNombreReferenciaError",
  "txtApellido1ReferenciaError",
  "txtApellido2ReferenciaError",
  "txtTelefonoReferenciaError",
  "txtEmpresaReferenciaError",
  "cboParentescoReferenciaError"
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



