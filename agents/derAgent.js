var eve = require('evejs');
var nodeModule = require('./build/Release/SimulatedAnnealingModule');

function derAgent(id, AIMid, searchSpace) {
  // execute super constructor
  eve.Agent.call(this, id);

  // extend the agent with RPC functionality
  this.rpc = this.loadModule('rpc', this.rpcFunctions);  // option 1

  // connect to all transports provided by the system
  this.connect(eve.system.transports.getAll());

  var me = this;
  var candidateCallBack = function(msg){
    me.rpc.request('inertiaProxy',{method:'getError', params:{msg:msg}})
      .then(function(reply) {
        me.AIMmodule.WriteCost(JSON.stringify(reply));
      }).done();;
  };
  obj.RegReadCandidate(candidateCallBack);

  this.AIMmodule = new nodeModule.SimulatedAnnealingModule(AIMid); // 0 is the ID of the aim module, should be a positive integer
  this.AIMmodule.WriteSearchspace(JSON.stringify(searchSpace)); // Initialize the search space
}

// extend the eve.Agent prototype
derAgent.prototype = Object.create(eve.Agent.prototype);
derAgent.prototype.constructor = derAgent;

// define RPC functions, preferably in a separated object to clearly distinct
// exposed functions from local functions.
derAgent.prototype.rpcFunctions = {};

module.exports = derAgent;