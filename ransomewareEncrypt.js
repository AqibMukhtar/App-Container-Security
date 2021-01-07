const crypto = require('crypto');
const fs = require('fs');
const filePath = './data.txt';

const algorithm = 'aes-256-ctr';
let key = 'MySuperSecretKey';
key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);

const encrypt = (buffer) => {
    // Create an initialization vector
    const iv = crypto.randomBytes(16);
    // Create a new cipher using the algorithm, key, and iv
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    // Create the new (encrypted) buffer
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return result;
};


const plain = fs.readFileSync(filePath);

const encrypted = encrypt(plain);
fs.writeFileSync(filePath, encrypted);

// console.log('Encrypted:', encrypted.toString());

// const decrypted = decrypt(encrypted);
// console.log('Decrypted:', decrypted.toString());