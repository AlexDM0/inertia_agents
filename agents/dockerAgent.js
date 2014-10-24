var eve = require('evejs');
var nodeModule = require('./TestModule');
var Promise = require('promise');

function dockerAgent(id) {
  // execute super constructor
  eve.Agent.call(this, id);

  // extend the agent with RPC functionality
  this.rpc = this.loadModule('rpc', this.rpcFunctions);               // option 1

  // connect to all transports provided by the system
  this.connect(eve.system.transports.getAll());


}

// extend the eve.Agent prototype
dockerAgent.prototype = Object.create(eve.Agent.prototype);
dockerAgent.prototype.constructor = dockerAgent;

// define RPC functions, preferably in a separated object to clearly distinct
// exposed functions from local functions.
dockerAgent.prototype.rpcFunctions = {};
dockerAgent.prototype.rpcFunctions.doAIM = function (params, sender) {
  var errorTimeout;
  return new Promise(function(resolve, reject) {
    var obj = new nodeModule.TestModule("0");
    errorTimeout = setTimeout(function () {
      obj.destroy();
      reject(new Error("Did not complete in time"));
    }, 200);
    var paramCallBack = function (msg) {
      clearTimeout(errorTimeout);
      obj.Destroy();
      resolve(msg);
    };
    obj.RegReadParam(paramCallBack);

    var paramDesc = "bla bla bla";
    var error = 0.3;

    obj.WriteParamDesc(paramDesc);
    obj.WriteError(error);


  });
};



module.exports = dockerAgent;
