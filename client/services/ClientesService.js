angular.module('ClientesService', []).factory('Clientes', ['$rootScope', '$http','$localStorage', function($rootScope, $http, $localStorage) {

  return {
    login: function(data) {
      return $http.post('/api/clientes/login', data).then(function(data) {
        $localStorage.accessToken = data.data.id;
        $localStorage.userId = data.data.userId;



        


        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    logout: function() {
      return $http.post('/api/clientes/logout?access_token=' + $localStorage.accessToken).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    register: function(data) {
      return $http.post('/api/clientes', data).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    getCliente: function() {
      return $http.get('/api/clientes/' + $localStorage.userId  + '?access_token=' + $localStorage.accessToken).then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    },
    getClientes: function() {
      return $http.get('/api/clientes').then(function(data) {
        return data;
      }).catch(function(err) {
        throw err;
      });
    }

  };

}]);
