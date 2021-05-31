const os = require('os');
const ip = os.platform() === 'win32' ? 'localhost':'106.75.167.111'; 
const port = 5200;                                         

exports.port = port;
exports.ip = ip;