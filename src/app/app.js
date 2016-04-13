import route from './core/route';
import run from './core/run';
import server from './core/config/server.dev';
import spots from './spots/module';

angular.module('app', [
  'ionic',
  spots.name
])
  .config(route)
  .run(run)
  .value('serverData', server());;
