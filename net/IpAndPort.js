const os = require('os');
const port = 3000;
const ip = os.networkInterfaces().WLAN[1].address;

exports.port = port;
exports.ip = ip;