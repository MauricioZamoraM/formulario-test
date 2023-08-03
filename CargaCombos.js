function obtenerDatosDeAPI(apiUrl, parametros) {
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(parametros)
  };

  return fetch(apiUrl, options)
      .then(response => {
          if (!response.ok) {
              throw new Error('Error al obtener los datos');
          }
          return response.json();
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

function llenarSelectDesdeDatos(selectId, datos, tipo) {
  const selectElement = document.getElementById(selectId);

  selectElement.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.textContent = 'Seleccione una opci\u00F3n';
  defaultOption.value = '';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectElement.appendChild(defaultOption);

  const priorityCountryIds = [47, 158, 166];

  if (tipo === 'paises') {
      const priorityCountries = datos.filter(item => priorityCountryIds.includes(item.id_pais));
      const otherCountries = datos.filter(item => !priorityCountryIds.includes(item.id_pais));

      datos = [...priorityCountries, ...otherCountries];
  }

  datos.forEach(item => {
      const option = document.createElement('option');
      if (tipo === 'actividadEconomica') {
          option.value = item.id_actividad_economica;
          option.textContent = item.nombre_act_eco;
      } else if (tipo === 'tipoDesembolso') {
          option.value = item.id_tipo_desem;
          option.textContent = item.tipo_desembolso;
      } else if (tipo === 'generos') {
          option.value = item.id_parametro;
          option.textContent = item.nombre_parametro;
      } else if (tipo === 'medio') {
          option.value = item.id_parametro;
          option.textContent = item.nombre_parametro;
      } else if (tipo === 'plazo') {
          option.value = item.id_parametro;
          option.textContent = item.nombre_parametro;
      } else if (tipo === 'sucursalFormaliza') {
          option.value = item.id_sucursal_detalle;
          option.textContent = item.suc_det_nombre;
      } else if (tipo === 'puestos') {
          option.value = item.id;
          option.textContent = item.nombre;
      } else if (tipo === 'parentescos') {
          option.value = item.id;
          option.textContent = item.nombre;
      } else if (tipo === 'paises') {
          option.value = item.id_pais;
          option.textContent = item.pais_nombre;
      }

      selectElement.appendChild(option);
  });
}

const apiUrl = 'http://localhost:5239/api/DataVerification/GetData';

const parametros = {
  idSolicitud: 1
};

obtenerDatosDeAPI(apiUrl, parametros)
  .then(data => {
      llenarSelectDesdeDatos('cboTipoDesembolso', data.data.tipoDesembolso, 'tipoDesembolso');
      llenarSelectDesdeDatos('cboPersonaActividadEconomica', data.data.actividadEconomica, 'actividadEconomica');
      llenarSelectDesdeDatos('cboGenero', data.data.generos, 'generos');
      llenarSelectDesdeDatos('cboMedio', data.data.medio, 'medio');
      llenarSelectDesdeDatos('cboPlazo', data.data.plazo, 'plazo');
      llenarSelectDesdeDatos('txtsucursal_formaliza', data.data.sucursalFormaliza, 'sucursalFormaliza');
      llenarSelectDesdeDatos('cboPuestoLaboral', data.data.puestos, 'puestos');
      llenarSelectDesdeDatos('selPuesto', data.data.puestos, 'puestos');
      llenarSelectDesdeDatos('cboParentescoReferencia', data.data.parentescos, 'parentescos');
      llenarSelectDesdeDatos('cboPersonaPais', data.data.paises, 'paises');
      llenarSelectDesdeDatos('cboPersonaNacionalidad', data.data.paises, 'paises');
  })
  .catch(error => {
      console.error('Error:', error);
  });

function obtenerDatosLocalizacionDeAPI(apiUrl, parametros) {
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(parametros)
  };

  return fetch(apiUrl, options)
      .then(response => {
          if (!response.ok) {
              throw new Error('Error al obtener los datos');
          }
          return response.json();
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

function llenarSelectLocalizacionDesdeDatos(selectId, datos) {
  const selectElement = document.getElementById(selectId);

  selectElement.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.textContent = 'Seleccione una opci\u00F3n';
  defaultOption.value = '';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectElement.appendChild(defaultOption);

  datos.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id_localizacion;
      option.textContent = item.loc_nombre;

      selectElement.appendChild(option);
  });
}

const apiUrlLocalizacion = 'http://localhost:5239/api/DataVerification/GetDataLocalization';

const parametrosLocalizacion = {
  loc_nivel: 1,
  id_loc_padre: 0
};

obtenerDatosLocalizacionDeAPI(apiUrlLocalizacion, parametrosLocalizacion)
  .then(data => {
      llenarSelectLocalizacionDesdeDatos('cboLocalizacionProvincia', data.data);
      llenarSelectLocalizacionDesdeDatos('cboLocalizacionProvinciaLaboral', data.data);
  })
  .catch(error => {
      console.error('Error:', error);
  });


const selectProvincia = document.getElementById('cboLocalizacionProvincia');
const selectCanton = document.getElementById('cboLocalizacionCanton');
const selectDistrito = document.getElementById('cboLocalizacionDistrito');
const selectBarrio = document.getElementById('cboLocalizacionBarrio');
const selectPoblado = document.getElementById('cboLocalizacionPoblado');

const selectProvinciaLaboral = document.getElementById('cboLocalizacionProvinciaLaboral');
const selectCantonLaboral = document.getElementById('cboLocalizacionCantonLaboral');


selectProvincia.addEventListener('change', function () {
  const idProvincia = this.value;

  const parametrosCanton = {
      loc_nivel: 2,
      id_loc_padre: idProvincia
  };

  obtenerDatosLocalizacionDeAPI(apiUrlLocalizacion, parametrosCanton)
      .then(data => {
          llenarSelectLocalizacionDesdeDatos('cboLocalizacionCanton', data.data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
});

selectCanton.addEventListener('change', function () {
  const idCanton = this.value;

  const parametrosDistrito = {
      loc_nivel: 3,
      id_loc_padre: idCanton
  };

  obtenerDatosLocalizacionDeAPI(apiUrlLocalizacion, parametrosDistrito)
      .then(data => {
          llenarSelectLocalizacionDesdeDatos('cboLocalizacionDistrito', data.data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
});

selectDistrito.addEventListener('change', function () {
  const idDistrito = this.value;

  const parametrosBarrio = {
      loc_nivel: 4,
      id_loc_padre: idDistrito
  };

  obtenerDatosLocalizacionDeAPI(apiUrlLocalizacion, parametrosBarrio)
      .then(data => {
          llenarSelectLocalizacionDesdeDatos('cboLocalizacionBarrio', data.data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
});

selectBarrio.addEventListener('change', function () {
  const idBarrio = this.value;

  const parametrosPoblado = {
      loc_nivel: 5,
      id_loc_padre: idBarrio
  };

  obtenerDatosLocalizacionDeAPI(apiUrlLocalizacion, parametrosPoblado)
      .then(data => {
          llenarSelectLocalizacionDesdeDatos('cboLocalizacionPoblado', data.data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
});

selectProvinciaLaboral.addEventListener('change', function () {
  const idProvinciaLaboral = this.value;

  const parametrosCanton = {
      loc_nivel: 2,
      id_loc_padre: idProvinciaLaboral
  };

  obtenerDatosLocalizacionDeAPI(apiUrlLocalizacion, parametrosCanton)
      .then(data => {
          llenarSelectLocalizacionDesdeDatos('cboLocalizacionCantonLaboral', data.data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
});

selectCantonLaboral.addEventListener('change', function () {
  const idCantonLaboral = this.value;

  const parametrosDistrito = {
      loc_nivel: 3,
      id_loc_padre: idCantonLaboral
  };

  obtenerDatosLocalizacionDeAPI(apiUrlLocalizacion, parametrosDistrito)
      .then(data => {
          llenarSelectLocalizacionDesdeDatos('cboLocalizacionDistritoLaboral', data.data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
});




