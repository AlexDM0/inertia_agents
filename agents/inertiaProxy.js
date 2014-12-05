var eve = require('evejs');
var derAgent = require('./agents/derAgent');

function InertiaProxy(id, derAgents) {
  // execute super constructor
  eve.Agent.call(this, id);

  // extend the agent with RPC functionality
  this.rpc = this.loadModule('rpc', this.rpcFunctions);  // option 1

  // connect to all transports provided by the system
  this.connect(eve.system.transports.getAll());
  this.derAgents = derAgents;
  this.AIMid = 0;
  this.INERTIA_URL = ''
}

// extend the eve.Agent prototype
InertiaProxy.prototype = Object.create(eve.Agent.prototype);
InertiaProxy.prototype.constructor = InertiaProxy;

// define RPC functions, preferably in a separated object to clearly distinct
// exposed functions from local functions.
InertiaProxy.prototype.rpcFunctions = {};

InertiaProxy.prototype.rpcFunctions.minimize = function(params,sender) {
  if (this.derAgents[params.derRef] === undefined) {
    this.derAgents[params.derRef] = new derAgent(params.derRef, this.AIMid, params);
    this.AIMid += 1;
  }
  this.INERTIA_URL = sender;
};

InertiaProxy.prototype.rpcFunctions.getError = function(params,sender) {
  var me = this;
  return new Promise(function (resolve, reject) {
    me.rpc.request(me.INERTIA_URL, {method:'getError',params:params.msg})
      .then(function (reply) {
        resolve(reply);
      })
      .catch(function (error) {reject(error);})
  });
};

module.exports = InertiaProxy;
