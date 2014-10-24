var eve = require('evejs');
var outsideAgent = require('./agents/outsideAgent');

// configure eve
eve.system.init({
  transports: [
    {
      type: 'ws',
      url: 'ws://localhost:3000/agents/:id'
    }
  ]
});

// create an agent
var outsideAgent = new outsideAgent('outsideAgent');
console.log("Created Agent 'outsideAgent'.");

outsideAgent.sendOnceConnected(function() {
  this.rpc.request(this.connectedSlave, {method:'doAIM',params:{a:1}})
    .done(function(reply) {
      console.log("REPLIED:", reply);
    })});
