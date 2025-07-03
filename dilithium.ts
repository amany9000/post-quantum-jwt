import { ml_dsa44 } from '@noble/post-quantum/ml-dsa';
import { hexToBytes, utf8ToBytes } from '@noble/hashes/utils'

import { getSecretKey, AlgoType } from './kms'


export function signDilithium(msg: string) {
    const msgBytes = utf8ToBytes(msg);
    const sig = Buffer.from(
        ml_dsa44.sign(getSecretKey(AlgoType.DILITHIUM, true) as Uint8Array<ArrayBufferLike>,
            msgBytes)
    ).toString('hex');

    return sig;
}

export function verifyDilithium(payload: string, sig: string, publicKey: string) {
    const msgBytes = utf8ToBytes(payload);
    const sigBytes = hexToBytes(sig.slice(2));
    const publicKeyBytes = hexToBytes(publicKey);

    const verificationResult = ml_dsa44.verify(publicKeyBytes, msgBytes, sigBytes);
    return verificationResult;
}