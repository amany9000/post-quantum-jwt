import { ml_dsa87 } from '@noble/post-quantum/ml-dsa';
import { hexToBytes} from '@noble/hashes/utils'
import { readFileSync } from 'fs';

type keysHex = {
    secretKey: string;
    publicKey: string;
}

function getKeys(): keysHex{    
    const keys = JSON.parse(readFileSync('./keys.json', 'utf-8'));
    
    // console.log("Pk hex", keys.publicKey);
    // console.log("Sk hex", keys.secretKey);
    
    return keys;
};

export function getPublicKey(returnU8a: boolean = false): string | Uint8Array {
    return returnU8a ? hexToBytes(getKeys().publicKey) : getKeys().publicKey;
}

export function getSecretKey(returnU8a: boolean = false): string | Uint8Array {
    return returnU8a ? hexToBytes(getKeys().secretKey) : getKeys().secretKey;
}
