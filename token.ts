import {sign, verify} from "djwt";

import {signDilithium, verifyDilithium} from "./dilithium";

(async function test() {

    const seed = randomBytes(32); // seed is optional
    const keys = ml_dsa87.keygen(seed);

    const pk = "0x145831eba8085d78c1d30A9C108aAD8A1501d6e0";
    const algorithm = "ES256k";

    const payload = {
        nonce: 654321,
        iat: 1582062696,
        exp: 1782098690,
        iss: pk,
        nbf: 100000000,
        sub: pk,
        jti: "324221",
        aud: ["0x75FaBc80c774614C424ffC1d7017b4a534607935"]
      };
      const token = await sign(payload, signDilithium, { algorithm });

      console.log(`Signed JWT token: ${token}`)

      const receivedToken = verify(token, verifyDilithium, {
        complete: true,
        nonce: 654321,
        maxAge: 10000000000,
        issuer: pk,
        jwtid: "324221",
        subject: pk,
        audience: "0x75FaBc80c774614C424ffC1d7017b4a534607935",
        algorithm,
      });

      console.log(`Decode JWT token JSON returned after verification:`, receivedToken)
})()