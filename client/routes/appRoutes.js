angular.module('appRoutes', []).config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'views/home.html'
  }).state('crearclientes', {
    parent: 'home',
    views: {
      'crud@home': {
        templateUrl: 'views/crud/crear_clientes.html',
        controller: 'CRUDClientesController'
      }
    }
  }).state('register', {
    url: '/register',
    templateUrl: 'views/register.html',
    controller: 'AccessController'
  }).state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'AccessController'
  }).state('libros', {
    url: '/libros',
    templateUrl: 'views/libros.html',
    controller: 'ArticulosController'
  }).state('electrodomesticos', {
    url: '/electrodomesticos',
    templateUrl: 'views/electrodomesticos.html',
    controller: 'ArticulosController'
  }).state('dvds', {
    url: '/dvds',
    templateUrl: 'views/dvds.html',
    controller: 'ArticulosController'
  }).state('carrito', {
    url: '/carrito',
    templateUrl: 'views/carrito.html',
    controller: 'ArticulosController'
  });

  $stateProvider.state('administradores', {
    url: '/administradores',
    templateUrl: 'views/administradores.html',
    controller: 'AdministradoresController'

  }).state('modificarProductoCatalogo', {
    parent: 'administradores',
    views: {
      'consultas@administradores': {
        templateUrl: 'views/administrativo/modificarProductoCatalogo.html',
        controller: 'AdministradoresController'
      }
    }
  }).state('promedioProductosClientes', {
    parent: 'administradores',
    views: {
      'consultas@administradores': {
        templateUrl: 'views/administrativo/promedioProductosClientes.html',
        controller: 'AdministradoresController'
      }
    }
  }).state('rangoProductosCompradosPorCliente', {
    parent: 'administradores',
    views: {
      'consultas@administradores': {
        templateUrl: 'views/administrativo/rangoProductosCompradosPorCliente.html',
        controller: 'AdministradoresController'
      }
    }
  }).state('topProductos', {
    parent: 'administradores',
    views: {
      'consultas@administradores': {
        templateUrl: 'views/administrativo/topProductos.html',
        controller: 'AdministradoresController'
      }
    }
  }).state('agregarProducto', {
    parent: 'administradores',
    views: {
      'consultas@administradores': {
        templateUrl: 'views/administrativo/agregarProducto.html',
        controller: 'AdministradoresController'
      }
    }
  }).state('agregarProductoDvd', {
    parent: 'administradores',
    views: {
      'consultas@administradores': {
        templateUrl: 'views/administrativo/agregarProductoDvd.html',
        controller: 'AdministradoresController'
      }
    }
  }).state('agregarProductoElectrodomestico', {
    parent: 'administradores',
    views: {
      'consultas@administradores': {
        templateUrl: 'views/administrativo/agregarProductoElectrodomestico.html',
        controller: 'AdministradoresController'
      }
    }
  });

  $urlRouterProvider.otherwise("/");
  $locationProvider.html5Mode(true);
}]);
