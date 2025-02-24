import { ml_dsa87 } from '@noble/post-quantum/ml-dsa';
import { randomBytes } from '@noble/post-quantum/utils';
import { bytesToHex } from '@noble/hashes/utils';
import { writeFileSync } from 'fs';


(async function test() {
    const seed = randomBytes(32);

    const keys = ml_dsa87.keygen(seed); 
    const pkHex = bytesToHex(keys.publicKey);
    const skHex = bytesToHex(keys.secretKey);

    console.log("Pk hex", pkHex);
    console.log("\n\n\nSk hex", skHex);

    writeFileSync('./keys.json', JSON.stringify({'secretKey': skHex, 'publicKey': pkHex}));
})();