route.$inject = ['$stateProvider', '$urlRouterProvider'];

function route ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      abstract   : true,
      templateUrl: 'app/core/main.html',
      auth       : false
    });
}

export default route;
