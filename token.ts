import { signJWT, verifyJWT, Payload } from 'djwt';

import { getId, AlgoType } from './kms';
import { signDilithium, verifyDilithium } from './dilithium';
import { signSphincs, verifySphincs } from './sphincs';

export async function generateJwtDilithium(user: string): Promise<string> {
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
    sub: user,
  };

  /** 
    signDilithium() from ./dilithium.ts is passed to signJWT(). It must
    adhere to the Signer interface of djwt.
  **/
  const token = await signJWT(payload, signDilithium, { algorithm });
  console.log(`JWT token Signed with Dilithium:\n${token}\n`);

  return token;
}

export async function verifyJwtDilithium(token: string): Promise<Payload> {
  const id = getId(AlgoType.DILITHIUM);
  const algorithm = 'MLDSA44';

  /** 
    verifyDilithium() from ./dilithium.ts is passed to verifyJWT(). It must
    adhere to the Verifier interface of djwt.
  **/
  const decodedToken = await verifyJWT(token, verifyDilithium, {
    complete: true,
    nonce: 654321,
    issuer: id,
    algorithm,
  });
  console.log(
    `\n\nDecoded Dilithium JWT token returned after verification:\n`,
    decodedToken
  );

  return decodedToken.payload as Payload;
}

export async function generateJwtSphincs(user: string): Promise<string> {
  /**
    ID is the BLAKE2s Hash of Issuer's SPHINCS Public Key.
    Public Key size = 32 Bytes
    Hash size = 16 Bytes
  **/
  const idSphincs = getId(AlgoType.SPHINCS);
  const algorithmSphincs = 'SLH128';

  // Issued At timestamp
  const iat = Math.ceil(Date.now() / 1000);

  // Expiry timestamp
  const exp = iat + 3600;

  const payloadSphincs = {
    nonce: 654321,
    iat,
    exp,
    iss: idSphincs,
    sub: user,
  };

  /** 
    signSphincs() from ./sphincs.ts is passed to signJWT(). It must
    adhere to the Signer interface of djwt.
  **/
  const tokenSphincs = await signJWT(payloadSphincs, signSphincs, {
    algorithm: algorithmSphincs,
  });
  console.log(`\n\n\nJWT token Signed with Sphincs:\n${tokenSphincs}\n`);

  return tokenSphincs;
}

export async function verifyJwtSphincs(token: string): Promise<Payload> {
  const idSphincs = getId(AlgoType.SPHINCS);
  const algorithmSphincs = 'SLH128';

  /** 
    verifySphincs() from ./sphincs.ts is passed to verifyJWT(). It must
    adhere to the Verifier interface of djwt.
  **/
  const decodeTokenSphincs = await verifyJWT(token, verifySphincs, {
    complete: true,
    nonce: 654321,
    issuer: idSphincs,
    algorithm: algorithmSphincs,
  });
  console.log(
    `\n\nDecoded Sphincs JWT token returned after verification:\n`,
    decodeTokenSphincs
  );

  return decodeTokenSphincs.payload as Payload;
}
