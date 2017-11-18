angular.module('ArticulosService', []).factory('Articulos', ['$rootScope', '$http', '$localStorage', function($rootScope, $http, $localStorage) {

  return {
    getArticulos: function() {
      return $http.get('/api/eventos').then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    getArticulosDvds: function() {
      var params = {
        "where":{"tipo": "dvd"}

      }

      return $http.get('/api/eventos?filter=' + JSON.stringify(params)).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    getArticulosLibros: function() {
      var params = {
        "where":{"tipo": "libro"}

      }


      return $http.get('/api/eventos?filter=' + JSON.stringify(params)).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    getArticulosElectrodomesticos: function() {
      var params = {
        "where":{"tipo": "electrodomestico"}

      }

      return $http.get('/api/eventos?filter=' + JSON.stringify(params)).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    eliminarArticulo: function(articulo) {
      return $http.delete('/api/eventos/' + articulo.id).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    actualizarArticulo: function(articulo) {
      return $http.put('/api/eventos/' + articulo.id, articulo).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    agregarArticulo: function(articulo) {
      return $http.post('/api/eventos/', articulo).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    traerOrdenes: function(idUsuario) {
      // Ordenes para un cliente con id

      var query = {
        "where":{"cliente": idUsuario}
      }
      return $http.get('/api/ordenes?filter=' + JSON.stringify(query)).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;

      });
    },
    traerOrdenesTodas: function() {
      return $http.get('/api/ordenes').then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    }

  };

}]);
