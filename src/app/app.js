import core from './core/module';
import spots from './spots/module';

angular.module('app', [
  'ionic',
  core.name,
  spots.name
]);
