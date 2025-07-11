// Key Management Service (KMS) implementation

import { hexToBytes } from '@noble/hashes/utils'
import { readFileSync } from 'fs';

type keysHex = {
    secretKey: string;
    publicKey: string;
    id: string;
}

export enum AlgoType {
    DILITHIUM,
    SPHINCS
}

function getKeys(algoType: AlgoType): keysHex {
    const keysObj = JSON.parse(readFileSync('./keys.json', 'utf-8'));
    return keysObj['keys'][algoType.toString()];
};

export function getId(algoType: AlgoType): string {
    return getKeys(algoType).id;
}

export function getSecretKey(algoType: AlgoType, returnU8a: boolean = false): string | Uint8Array {
    return returnU8a ? hexToBytes(getKeys(algoType).secretKey) : getKeys(algoType).secretKey;
}

export function getPublicKeyFromId(id: string): string {
    const keysObj = JSON.parse(readFileSync('./keys.json', 'utf-8'));
    return keysObj['ids'][id];
}