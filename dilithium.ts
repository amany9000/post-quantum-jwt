import { ml_dsa87 } from '@noble/post-quantum/ml-dsa';
import {randomBytes } from '@noble/post-quantum/utils';
import { hexToBytes, utf8ToBytes, bytesToHex} from '@noble/hashes/utils'

const seed = randomBytes(32); // seed is optional
const keys = ml_dsa87.keygen(seed);

export function signDilithium(msg: string) {
    console.log("signDilithium msg", msg);
    const msgBytes = utf8ToBytes(msg);
    return Buffer.from(ml_dsa87.sign(keys.secretKey, msgBytes)).toString('hex');
}

export function verifyDilithium(payload: string, sig: string, publicKey: string) {
    const msgBytes = utf8ToBytes(payload);
    const sigBytes = hexToBytes(sig);
    const publicKeyBytes = hexToBytes(publicKey);
    
    return ml_dsa87.verify(publicKeyBytes, msgBytes, sigBytes);
}


(function abc(){
    console.log("seed", seed);

    const msg = "Good morning vietnam";
    const sig = signDilithium(msg);
    
    console.log("\n msg", msg);
    console.log("\nSig", sig, "\nSize sig", sig.length);
    
    const isValid = verifyDilithium(msg, sig,  Buffer.from(keys.publicKey).toString('hex'))
    console.log("\nisValid", isValid);
})()