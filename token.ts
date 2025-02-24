import {signJWT, verifyJWT} from "djwt";


import { getPublicKey } from './kms'
import {signDilithium, verifyDilithium} from "./dilithium";

(async function test() {

    const pk = getPublicKey() as string;
    const algorithm = "ES256k";
    const payload = {
        nonce: 654321,
        iat: 1582062696,
        exp: 1782098690,
        iss: pk,
        nbf: 100000000,
        sub: "user123",
        jti: "324221"
      };
      const token = await signJWT(payload, signDilithium, { algorithm });

      console.log(`Signed JWT token: ${token}`)

      const receivedToken = await verifyJWT(token, verifyDilithium, {
        complete: true,
        nonce: 654321,
        maxAge: 10000000000,
        issuer: pk,
        jwtid: "324221",
        subject: "user123",
        algorithm,
      });

      console.log(`Decode JWT token JSON returned after verification:`, receivedToken)
})()