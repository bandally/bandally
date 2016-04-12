route.$inject = ['$stateProvider'];

function route ($stateProvider) {
  $stateProvider
    .state('main.spots', {
      url  : '/',
      views: {
        'content@main': {
          templateUrl: 'app/spots/index.html'
        }
      },
      auth : false
    });
}

export default route;
