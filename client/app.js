var app = angular.module('app', [
  'ui.router',
  'appRoutes',
   'toastr',
   'ngStorage',

  // Controladores
  'MainCtrl',
  'AdministradoresCtrl',
  'AccessCtrl',
  'ArticulosCtrl',

  // Servicios
  , 'VentasService'
  , 'AdministradorService'
  , 'ArticulosService'
  , 'ClientesService'


]);


app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
