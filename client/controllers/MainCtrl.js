angular.module('MainCtrl', []).controller('MainController', ['$rootScope', '$scope', '$location', 'Articulos', 'Clientes', '$state', '$localStorage', '$sessionStorage', 'toastr', function($rootScope, $scope, $location, Articulos, Clientes, $state, $localStorage, $sessionStorage, toastr) {

  $scope.articulos = [];
  if (!$sessionStorage.carrito) {
    $sessionStorage.carrito = [];
  }

  // $scope.irRegister = function() {
  //   $state.go('register');
  // }
  $scope.logout = function() {
    Clientes.logout().then(function(response) {}).catch(function(err) {
      alert("Error iniciando sesion");
    });
    $scope.loggedIn = false;
    $localStorage.$reset();
  }
  $scope.loggedIn = false;
  $scope.nombre = "";
  if ($localStorage.accessToken) {
    Clientes.getCliente().then(function(response) {

      $scope.loggedIn = true;
      $scope.nombre = response.data.nombre;
    }).catch(function(err) {
      alert("Error iniciando sesion");
    });
  } else {
    $location.path('/login');
  }


  Articulos.getArticulos().then(function(response) {
    angular.forEach(response.data, function(value) {
      $scope.articulos.push(value);
    });

  }).catch(function(err) {
    alert("Error iniciando sesion");
  });

  $scope.agregarArticuloM = function(articulo) {
    articulo.cantidad = 1;
    $sessionStorage.carrito.push(articulo);

  }

  $scope.isAdmin = function(){

    if($localStorage.username.localeCompare("admin") === 0){
      return true;
    } else {
      return false;
    }
  }


}]);
