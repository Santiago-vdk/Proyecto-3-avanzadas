angular.module('ArticulosCtrl', []).controller('ArticulosController', ['$rootScope', '$scope', '$state', '$localStorage', '$sessionStorage', 'toastr', 'Clientes', 'Articulos', 'Ventas', function($rootScope, $scope, $state, $localStorage, $sessionStorage, toastr, Clientes, Articulos, Ventas) {

  $scope.dvds = [];
  $scope.electrodomesticos = [];
  $scope.libros = [];
  $scope.carrito = [];

  $scope.cargarCarrito = function() {
    angular.forEach($sessionStorage.carrito, function(value) {
      $scope.carrito.push(value);
    });
  }

  $scope.agregarArticulo = function(articulo) {
    articulo.cantidad = 1;
    $sessionStorage.carrito.push(articulo);
  }

  $scope.realizarCompra = function() {

    var orden = {
      "cliente": $localStorage.username,
      "productos": $sessionStorage.carrito
    }
    console.log(orden);

    Ventas.crearVenta(orden).then(function(response) {

      $sessionStorage.carrito = []

    }).catch(function(err) {
      toastr.error('Hubo un error mientras se solicitaban los articulos', 'Error');
    });

  }

  $scope.eliminarArticulo = function(articulo) {
    var i = 0;
    $sessionStorage.carrito.map((art) => {
      if (art.id == articulo.id) {
        $sessionStorage.carrito.splice(i, 1);
        $scope.carrito = $sessionStorage.carrito;
      }
      i += 1;
    });

  }

  $scope.actualizarCantidad = function(articulo) {

    $sessionStorage.carrito.map((art) => {
      if (art.id == articulo.id) {
        art.cantidad = articulo.cantidad;
      }

    });
  }

  $scope.getDvds = function() {
    Articulos.getArticulosDvds().then(function(response) {

      angular.forEach(response.data, function(value) {
        $scope.dvds.push(value);
      });

    }).catch(function(err) {
      toastr.error('Hubo un error mientras se solicitaban los articulos', 'Error');
    });
  }


  $scope.getElectrodomesticos = function() {
    Articulos.getArticulosElectrodomesticos().then(function(response) {

      angular.forEach(response.data, function(value) {
        $scope.electrodomesticos.push(value);
      });

    }).catch(function(err) {
      toastr.error('Hubo un error mientras se solicitaban los articulos', 'Error');
    });
  }

  $scope.getLibros = function() {
    Articulos.getArticulosLibros().then(function(response) {

      angular.forEach(response.data, function(value) {
        $scope.libros.push(value);
      });

    }).catch(function(err) {
      toastr.error('Hubo un error mientras se solicitaban los articulos', 'Error');
    });
  }

}]);
