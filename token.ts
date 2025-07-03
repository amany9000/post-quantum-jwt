import {signJWT, verifyJWT} from "djwt";


import { getId, AlgoType } from './kms'
import {signDilithium, verifyDilithium} from "./dilithium";
import { signSphincs, verifySphincs } from "./sphincs";

(async function test() {

  /** Dilithium JWT */

  const id = getId(AlgoType.DILITHIUM);
  const algorithm = "PQDI3";
  
  const payload = {
      nonce: 654321,
      iat: 1582062696,
      exp: 1782098690,
      iss: id,
      nbf: 100000000,
      sub: "user123",
      jti: "324221"
    };
    const token = await signJWT(payload, signDilithium, { algorithm });
    console.log(`JWT token Signed with Dilithium:\n${token}\n`)
    
    const decodedToken = await verifyJWT(token, verifyDilithium, {
      complete: true,
      nonce: 654321,
      maxAge: 10000000000,
      issuer: id,
      jwtid: "324221",
      subject: "user123",
      algorithm,
    });
    console.log(`\n\nDecoded Dilithium JWT token returned after verification:\n`, decodedToken);

  /** Sphincs JWT */
  const idSphincs = getId(AlgoType.SPHINCS);
  const algorithmSphincs = "PQDI3";
  
  const payloadSphincs = {
      nonce: 654321,
      iat: 1582062696,
      exp: 1782098690,
      iss: idSphincs,
      nbf: 100000000,
      sub: "user123",
      jti: "324221"
    };
    const tokenSphincs = await signJWT(payloadSphincs, signSphincs, { algorithm: algorithmSphincs });
    console.log(`\n\n\nJWT token Signed with Sphincs:\n${tokenSphincs}\n`)
    
    const decodeTokenSphincs = await verifyJWT(tokenSphincs, verifySphincs, {
      complete: true,
      nonce: 654321,
      maxAge: 10000000000,
      issuer: idSphincs,
      jwtid: "324221",
      subject: "user123",
      algorithm: algorithmSphincs,
    });
    console.log(`\n\nDecoded Sphincs JWT token returned after verification:\n`, decodeTokenSphincs);
})();