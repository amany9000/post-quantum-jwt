import { ml_dsa44 } from '@noble/post-quantum/ml-dsa';
import { slh_dsa_sha2_128s } from '@noble/post-quantum/slh-dsa';
import { randomBytes } from '@noble/post-quantum/utils';
import { bytesToHex } from '@noble/hashes/utils';
import { writeFileSync } from 'fs';


(async function test() {
    let seed = randomBytes(32);

    const keys = ml_dsa44.keygen(seed); 
    const pkHex = bytesToHex(keys.publicKey);
    const skHex = bytesToHex(keys.secretKey);

    console.log("Dilithium Pk hex", pkHex);
    console.log("\n\nDilithium Sk hex", skHex);

    writeFileSync('./keysDilithium.json', JSON.stringify({'secretKey': skHex, 'publicKey': pkHex}));

    seed = randomBytes(48);

    const keysSphincs = slh_dsa_sha2_128s.keygen(seed); 
    const pkHexSphincs = bytesToHex(keysSphincs.publicKey);
    const skHexSphincs = bytesToHex(keysSphincs.secretKey);

    console.log("\n\n\nSphincs Pk hex", pkHexSphincs);
    console.log("\n\nSphincs Sk hex", skHexSphincs);

    writeFileSync('./keysSphincs.json', JSON.stringify({'secretKey': skHexSphincs, 'publicKey': pkHexSphincs}));
})();
