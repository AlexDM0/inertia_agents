var eve = require('evejs');

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


InertiaProxy.prototype.rpcFunctions.getError = function(params,sender) {
  console.log("got error request")
  return "hello Bart"
};

InertiaProxy.prototype.test = function() {
  this.rpc.request("http://10.10.1.134:3000/agents/inertiaProxy", {method:'minimize', params:{"derRef" : "HVAC_01",
    "derAttribute" : [ {
      "range" : [ ],
      "name" : "attr01",
      "type" : "RATIO",
      "min" : 1.5,
      "max" : 4.01004
    } ]}}).done()
}

module.exports = InertiaProxy;
