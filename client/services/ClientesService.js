angular.module('ClientesService', []).factory('Clientes', ['$rootScope', '$http','$localStorage', function($rootScope, $http, $localStorage) {

  return {
    login: function(data) {
      return $http.post('/api/usuarios/login', data).then(function(data) {
        $localStorage.accessToken = data.data.id;
        $localStorage.userId = data.data.userId;






        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    logout: function() {
      return $http.post('/api/usuarios/logout?access_token=' + $localStorage.accessToken).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    register: function(data) {
      return $http.post('/api/usuarios', data).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    getCliente: function() {
      return $http.get('/api/usuarios/' + $localStorage.userId  + '?access_token=' + $localStorage.accessToken).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    getClientes: function() {
      return $http.get('/api/usuarios').then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    }

  };

}]);
