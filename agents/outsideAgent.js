var eve = require('evejs');

function outsideAgent(id) {
  // execute super constructor
  eve.Agent.call(this, id);

  // extend the agent with RPC functionality
  this.rpc = this.loadModule('rpc', this.rpcFunctions);               // option 1

  // connect to all transports provided by the system
  this.connect(eve.system.transports.getAll());

  this.callback = null;
  this.connectedSlave = null;
}

// extend the eve.Agent prototype
outsideAgent.prototype = Object.create(eve.Agent.prototype);
outsideAgent.prototype.constructor = outsideAgent;

// define RPC functions, preferably in a separated object to clearly distinct
// exposed functions from local functions.
outsideAgent.prototype.rpcFunctions = {};

outsideAgent.prototype.rpcFunctions.hello = function (params, sender) {
  this.connectedSlave = sender;
  if (this.callback !== undefined) {
    this.callback();
  }
};

outsideAgent.prototype.sendOnceConnected = function(callback) {
  this.callback = callback;
}


module.exports = outsideAgent;
