import CryptoJS from 'crypto-js'

//固定的密钥
const secretKey = "";
const data = ""
//加密数据
export function encryptString(data, secretKey) {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
}

// console.log(encryptString(data, secretKey ));

export function decryptString(encryptedData, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
// const aaa = ''
// console.log(encryptString(aaa, secretKey));
