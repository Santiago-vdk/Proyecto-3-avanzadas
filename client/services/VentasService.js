angular.module('VentasService', []).factory('Ventas', ['$rootScope', '$http','$localStorage', function($rootScope, $http, $localStorage) {

  return {
    crearVenta: function(venta) {
      return $http.post('/api/compras', venta).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    }


  };

}]);
