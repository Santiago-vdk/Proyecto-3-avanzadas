angular.module('AdministradoresCtrl', []).controller('AdministradoresController', ['$rootScope', '$scope', '$state', 'Administrador', 'Clientes', 'Articulos', '$localStorage', '$sessionStorage', 'toastr', function($rootScope, $scope, $state, Administrador, Clientes, Articulos, $localStorage, $sessionStorage, toastr) {
  $scope.params = {};
  $scope.catalogo = [];
  $scope.clientes = [];

  // Para todos
  $scope.modificarProductoCatalogo = function() {
    $state.go('modificarProductoCatalogo');
  }
  $scope.verProductosCatalogo = function() {
    $state.go('verProductosCatalogo');
  }
  $scope.promedioProductosClientes = function() {
    $state.go('promedioProductosClientes');
  }
  $scope.rangoProductosCompradosPorCliente = function() {
    $state.go('rangoProductosCompradosPorCliente');
  }
  $scope.topProductos = function() {
    $state.go('topProductos');
  }
  $scope.agregarProducto = function() {
    $state.go('agregarProducto');
  }
  $scope.agregarProductoDvd = function() {
    $state.go('agregarProductoDvd');
  }
  $scope.agregarProductoElectrodomestico = function() {
    $state.go('agregarProductoElectrodomestico');
  }

  $scope.cargarCatalogo = function() {
    Articulos.getArticulos().then(function(response) {
      angular.forEach(response.data, function(value) {
        $scope.catalogo.push(value);
      });

    }).catch(function(err) {
      alert("Error iniciando sesion");
    });
  }

  $scope.actualizarArticulo = function(articulo) {

    Articulos.actualizarArticulo(articulo).then(function(response) {
      toastr.success('Articulo actualizado exitosamente', 'Success');
      $state.reload();
    }).catch(function(err) {
      alert("Error actualizando");
    });


  }

  $scope.eliminarArticulo = function(articulo) {
    Articulos.eliminarArticulo(articulo).then(function(response) {
      toastr.success('Articulo eliminado exitosamente', 'Success');
      $state.reload();
    }).catch(function(err) {
      alert("Error eliminando");
    });
  }

  $scope.agregarArticulo = function(articulo) {
    Articulos.agregarArticulo(articulo).then(function(response) {
      toastr.success('Articulo agregado exitosamente', 'Success');
      $state.reload();
    }).catch(function(err) {
      alert("Error agregando");
    });
  }


  $scope.traerUsuarios = function() {

    Clientes.getClientes().then(function(response) {
      angular.forEach(response.data, function(value) {
        $scope.clientes.push(value)
      });


    }).catch(function(err) {
      alert("Error agregando");
    });
  }
  $scope.result = 0;

  var articulos = [];
  var cantidades = [];

  $scope.maximo = 0;
  $scope.minimo = 0;


  var rango_cantidades = [];

  $scope.calcularRango = function(idUsuario) {
    rango_cantidades = [];
    Articulos.traerOrdenes(idUsuario).then(function(response) {

      angular.forEach(response.data, function(orden) {
        angular.forEach(orden.productos, function(producto) {
          rango_cantidades.push(parseInt(producto.cantidad));
        });

      });
    }).catch(function(err) {
      console.log(err);
    });
  }




$scope.consultarRango = function() {

  $scope.maximo = Math.max.apply(Math,rango_cantidades);
  $scope.minimo = Math.min.apply(Math,rango_cantidades);


}



  $scope.consultarTop = function() {
    Articulos.traerOrdenesTodas().then(function(response) {

      angular.forEach(response.data, function(orden) {

        angular.forEach(orden.productos, function(producto) {

          if (articulos.indexOf(producto.nombre) === -1) {

            articulos.push(producto.nombre);
            cantidades.push(producto.cantidad);
          } else {
            cantidades[articulos.indexOf(producto.nombre)] = cantidades[articulos.indexOf(producto.nombre)] + producto.cantidad;
          }

        });
      });

    }).catch(function(err) {
      alert("Error agregando");
    });

  }
  $scope.result = [];
  $scope.calcular = function() {


    var elemento = Math.max(cantidades);
    var posicion = cantidades.indexOf(elemento);
    cantidades.splice(posicion, 1);
    var nombre = articulos.splice(posicion, 1);
    $scope.result.push(nombre[0]);

    elemento = Math.max(cantidades);
    posicion = cantidades.indexOf(elemento);
    cantidades.splice(posicion, 1);
    nombre = articulos.splice(posicion, 1);
    $scope.result.push(nombre[0]);

    elemento = Math.max(cantidades);
    posicion = cantidades.indexOf(elemento);
    cantidades.splice(posicion, 1);
    nombre = articulos.splice(posicion, 1);
    $scope.result.push(nombre[0]);

  }

  $scope.consultarUsuario = function(idUsuario) {
    Articulos.traerOrdenes(idUsuario).then(function(response) {
      var suma = 0;
      $scope.result = 0;
      angular.forEach(response.data, function(orden) {
        angular.forEach(orden.productos, function(producto) {
          suma = suma + producto.cantidad

          $scope.result = suma / response.data.length;
        });
      });
    }).catch(function(err) {
      alert("Error agregando");
    });
  }
  /*
    $scope.promedioProductos = function() {
      Articulos.traerOrdenes(articulo).then(function(response) {
        // Procesar




      }).catch(function(err) {
        alert("Error agregando");
      });
    }
    */

}]);
