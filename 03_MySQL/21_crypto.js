const crypto = require('crypto');

// SHA: Secure Hash Algorithm
let shasum = crypto.createHash('sha256');       //sha256, sha512
shasum.update('1234');
let output = shasum.digest('base64');      // hex, base64

console.log('password:', output);
console.log(output.length);