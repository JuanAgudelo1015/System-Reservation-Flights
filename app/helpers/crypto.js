import CryptoJS from 'crypto-js';

// Función para encriptar
export function encryptData(data, key = '123') {
    return CryptoJS.AES.encrypt(data, key).toString();
}

// Función para desencriptar
export function decryptData(encryptedData, key = '123') {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
