import { ml_dsa87 } from '@noble/post-quantum/ml-dsa';
import { hexToBytes, utf8ToBytes, bytesToHex } from '@noble/hashes/utils'

import { getSecretKey } from './kms'


export function signDilithium(msg: string) {
    const msgBytes = utf8ToBytes(msg);
    const sig = Buffer.from(
        ml_dsa87.sign(getSecretKey(true) as Uint8Array<ArrayBufferLike>,
        msgBytes)
    ).toString('hex');

    return sig;
}

export function verifyDilithium(payload: string, sig: string, publicKey: string) {
    const msgBytes = utf8ToBytes(payload);
    const sigBytes = hexToBytes(sig.slice(2));
    const publicKeyBytes = hexToBytes(publicKey);

    const verificationResult = ml_dsa87.verify(publicKeyBytes, msgBytes, sigBytes);
    return verificationResult;
}