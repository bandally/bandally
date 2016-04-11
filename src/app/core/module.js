import route from './route';
import run from './run';

export default angular.module('app.core', [])
  .config(route)
  .run(run);
