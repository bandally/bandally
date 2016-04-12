import route from './route';
import run from './run';
import server from './config/server.dev';

export default angular.module('app.core', [])
  .config(route)
  .run(run)
  .value('serverData', server());
