var eve = require('evejs');
var InertiaProxy = require('./agents/inertiaProxy');

// configure eve
eve.system.init({
  transports: [
    {
      type:'local',
      default: true
    },
    {
      type: 'http',
      port: 3000,
      url: 'http://10.10.1.134:3000/agents/:id',
      localShortcut: false
    }
  ]
});

var derAgents = {};

// create an agent
var inertiaProxyAgent = new InertiaProxy('inertiaProxy',derAgents);
console.log("Created Agent 'inertiaProxy'.");
