run.$inject = ['$ionicPlatform', 'serverData'];

export default function run ($ionicPlatform, serverData) {

  return activate();

  function activate() {
    parseInit();
  }

  function parseInit() {
    Parse.initialize(serverData.appId);
    Parse.serverURL = serverData.serverUrl;
  }
}
