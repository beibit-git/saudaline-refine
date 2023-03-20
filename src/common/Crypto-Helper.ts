import CryptoJS from "crypto-js";

export function AESEncrypt(pureText: string) {
  const privateKey = process.env.REACT_APP_LOCALSTORAGE_KEY;
  var ciphertext = encodeURIComponent(
    CryptoJS.AES.encrypt(JSON.stringify(pureText), privateKey).toString()
  );
  return ciphertext;
}

export function AESDecrypt(encryptedText: string) {
  const privateKey = process.env.REACT_APP_LOCALSTORAGE_KEY;
  var bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(encryptedText),
    privateKey
  );
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}
