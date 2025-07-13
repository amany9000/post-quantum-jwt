// Key Generation implementation

import { ml_dsa44 } from '@noble/post-quantum/ml-dsa';
import { slh_dsa_sha2_128s } from '@noble/post-quantum/slh-dsa';
import { randomBytes } from '@noble/post-quantum/utils';
import { bytesToHex } from '@noble/hashes/utils';
import { blake2s } from '@noble/hashes/blake2s';
import { writeFileSync } from 'fs';

import { AlgoType } from './kms';

(async function test() {
  // Dilithium
  let seed = randomBytes(32);

  const keys = ml_dsa44.keygen(seed);
  const pkHex = bytesToHex(keys.publicKey);
  const skHex = bytesToHex(keys.secretKey);

  const hash = bytesToHex(blake2s(keys.publicKey, { dkLen: 16 }));

  console.log('Dilithium Pk hex', pkHex);
  console.log('\n\nID (blake2s-126bit hash of pk) ', hash);
  console.log('\n\nDilithium Sk hex', skHex);

  // Sphincs
  seed = randomBytes(48);
  const keysSphincs = slh_dsa_sha2_128s.keygen(seed);
  const pkHexSphincs = bytesToHex(keysSphincs.publicKey);
  const skHexSphincs = bytesToHex(keysSphincs.secretKey);

  const hashSphincs = bytesToHex(
    blake2s(keysSphincs.publicKey, { dkLen: 16 })
  );

  console.log('\n\n\nSphincs Pk hex', pkHexSphincs);
  console.log('\n\nID (blake2s-126bit hash of pk) ', hashSphincs);
  console.log('\n\nSphincs Sk hex', skHexSphincs);

  writeFileSync(
    './keys.json',
    JSON.stringify({
      keys: {
        [AlgoType.DILITHIUM]: {
          secretKey: skHex,
          publicKey: pkHex,
          id: hash,
        },
        [AlgoType.SPHINCS]: {
          secretKey: skHexSphincs,
          publicKey: pkHexSphincs,
          id: hashSphincs,
        },
      },
      ids: {
        [hash]: pkHex,
        [hashSphincs]: pkHexSphincs,
      },
    })
  );
})();
