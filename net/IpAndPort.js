const os = require('os');
const port = 80;
const ip = os.networkInterfaces().WLAN[1].address;

exports.port = port;
exports.ip = ip;