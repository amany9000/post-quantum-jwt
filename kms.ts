import { hexToBytes } from '@noble/hashes/utils'
import { readFileSync } from 'fs';

type keysHex = {
    secretKey: string;
    publicKey: string;
}

export enum AlgoType {
    DILITHIUM,
    SPHINCS
}

function getKeys(algoType: AlgoType): keysHex {
    const keys = algoType === AlgoType.SPHINCS ? JSON.parse(readFileSync('./keysSphincs.json', 'utf-8')) :
        JSON.parse(readFileSync('./keysDilithium.json', 'utf-8'));

    // console.log("Pk hex", keys.publicKey);
    // console.log("Sk hex", keys.secretKey);

    return keys;
};

export function getPublicKey(algoType: AlgoType, returnU8a: boolean = false): string | Uint8Array {
    return returnU8a ? hexToBytes(getKeys(algoType).publicKey) : getKeys(algoType).publicKey;
}

export function getSecretKey(algoType: AlgoType, returnU8a: boolean = false): string | Uint8Array {
    return returnU8a ? hexToBytes(getKeys(algoType).secretKey) : getKeys(algoType).secretKey;
}
