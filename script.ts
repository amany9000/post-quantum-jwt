import {
  generateJwtDilithium,
  generateJwtSphincs,
  verifyJwtDilithium,
  verifyJwtSphincs,
} from './token';

(async function test() {
  const user = 'user1234';

  const dilithiumJwt = await generateJwtDilithium(user);
  await verifyJwtDilithium(dilithiumJwt);

  const sphincsJwt = await generateJwtSphincs(user);
  await verifyJwtSphincs(sphincsJwt);
})();
