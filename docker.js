/**
 * Created by alex on 24-10-14.
 */

var eve = require('evejs');
var dockerAgent = require('./agents/dockerAgent');

// configure eve
eve.system.init({
  transports: [
    {
      type: 'ws',
      url: 'ws://localhost:3001/agents/:id'
    }
  ]
});

// create an agent
var dockerAgent = new dockerAgent('dockerAgent');
console.log("Created Agent 'dockerAgent'.");
dockerAgent.rpc.request('ws://localhost:3000/agents/outsideAgent',{method:'hello', params:{}});
console.log("Sent message.");

