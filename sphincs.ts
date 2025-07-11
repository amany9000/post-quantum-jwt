// SPHINCS implementation

import { slh_dsa_sha2_128s } from '@noble/post-quantum/slh-dsa';
import { hexToBytes, utf8ToBytes } from '@noble/hashes/utils'

import { getSecretKey, AlgoType, getPublicKeyFromId } from './kms'


export function signSphincs(msg: string) {
    const msgBytes = utf8ToBytes(msg);
    const sig = Buffer.from(
        slh_dsa_sha2_128s.sign(getSecretKey(AlgoType.SPHINCS, true) as Uint8Array<ArrayBufferLike>,
        msgBytes)
    ).toString('hex');

    return sig;
}

export function verifySphincs(payload: string, sig: string, id: string) {
    const msgBytes = utf8ToBytes(payload);
    const sigBytes = hexToBytes(sig.slice(2));
    const publicKeyBytes = hexToBytes(getPublicKeyFromId(id));

    const verificationResult = slh_dsa_sha2_128s.verify(publicKeyBytes, msgBytes, sigBytes);
    return verificationResult;
}