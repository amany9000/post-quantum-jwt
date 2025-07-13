import { signJWT, verifyJWT } from 'djwt';

import { getId, AlgoType } from './kms';
import { signDilithium, verifyDilithium } from './dilithium';
import { signSphincs, verifySphincs } from './sphincs';

(async function test() {
  /** Dilithium JWT **/

  /**
    ID is the BLAKE2s Hash of Issuer's Dilithium Public Key.
    Public Key size ~ 1.3kb
    Hash size = 16bytes
  **/
  const id = getId(AlgoType.DILITHIUM);
  const algorithm = 'MLDSA44';

  // Issued At timestamp
  const iat = Math.ceil(Date.now() / 1000);

  // Expiry timestamp
  const exp = iat + 3600;

  const payload = {
    nonce: 654321,
    iat,
    exp,
    iss: id,
    sub: 'user123',
    jti: '324221',
  };

  /** 
    signDilithium() from ./dilithium.ts is passed to signJWT(). It must
    adhere to the Signer interface of djwt.
  **/
  const token = await signJWT(payload, signDilithium, { algorithm });
  console.log(`JWT token Signed with Dilithium:\n${token}\n`);

  /** 
    verifyDilithium() from ./dilithium.ts is passed to verifyJWT(). It must
    adhere to the Verifier interface of djwt.
  **/
  const decodedToken = await verifyJWT(token, verifyDilithium, {
    complete: true,
    nonce: 654321,
    maxAge: exp,
    issuer: id,
    jwtid: '324221',
    subject: 'user123',
    algorithm,
  });
  console.log(
    `\n\nDecoded Dilithium JWT token returned after verification:\n`,
    decodedToken
  );

  /** Sphincs JWT */

  /**
    ID is the BLAKE2s Hash of Issuer's SPHINCS Public Key.
    Public Key size = 32 Bytes
    Hash size = 16 Bytes
  **/
  const idSphincs = getId(AlgoType.SPHINCS);
  const algorithmSphincs = 'SLH128';

  const payloadSphincs = {
    nonce: 654321,
    iat,
    exp,
    iss: idSphincs,
    sub: 'user123',
    jti: '324221',
  };

  /** 
    signSphincs() from ./sphincs.ts is passed to signJWT(). It must
    adhere to the Signer interface of djwt.
  **/
  const tokenSphincs = await signJWT(payloadSphincs, signSphincs, {
    algorithm: algorithmSphincs,
  });
  console.log(`\n\n\nJWT token Signed with Sphincs:\n${tokenSphincs}\n`);

  /** 
    verifySphincs() from ./sphincs.ts is passed to verifyJWT(). It must
    adhere to the Verifier interface of djwt.
  **/
  const decodeTokenSphincs = await verifyJWT(tokenSphincs, verifySphincs, {
    complete: true,
    nonce: 654321,
    maxAge: exp,
    issuer: idSphincs,
    jwtid: '324221',
    subject: 'user123',
    algorithm: algorithmSphincs,
  });
  console.log(
    `\n\nDecoded Sphincs JWT token returned after verification:\n`,
    decodeTokenSphincs
  );
})();
