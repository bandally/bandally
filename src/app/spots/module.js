import route from './route';
import baMenu from '../components/menu/component';

export default angular.module('app.spots', [])
  .config(route)
  .directive('baMenu', baMenu);
