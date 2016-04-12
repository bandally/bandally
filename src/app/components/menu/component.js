export default baMenu;

function baMenu() {
  return {
    scope           : {},
    templateUrl     : 'app/components/menu/component.html',
    controller      : MenuController,
    controllerAs    : '$ctrl',
    bindToController: {}
  };
}

class MenuController {
  constructor() {
    console.log('ok');
  }
}
