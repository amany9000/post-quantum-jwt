<div align='center'>
  
<a href='https://github.com/amany9000/post-quantum-jwt/releases'>
  
  
</a>
  
<a href='https://github.com/amany9000/post-quantum-jwt/blob/main/LICENSE'>
  
<img src='https://img.shields.io/github/license/amany9000/post-quantum-jwt'>
  
</a>

</div>

<br />

# post-quantum-jwt

A POC for post-quantum JWT generation using [djwt](https://github.com/amany9000/dJWT). The post-quantum digital signatures are generated through [noble-post-quantum](https://github.com/paulmillr/noble-post-quantum).

Two algorithms from noble-post-quantum are used here:

- [DILITHIUM](https://pq-crystals.org/dilithium/index.shtml)
- [SPHINCS](https://sphincs.org/index.html)

## Installation

```sh
npm install
```

## How to use 🛠️

Generate Keys

```sh
tsx generateKeys.ts
```

Create token through script

```sh
tsx script.ts
```

### Run the express server

```sh
tsx server.ts
```

Call the API using curl:

- Call `/login` to receive the JWT

  ```sh
  curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}'
  ```

- Use the token to call the protected routes

  ```sh
  curl http://localhost:3000/protected \
  -H "Authorization: Bearer TOKEN_FROM_LOGIN_CALL"
  ```

---

## JWT Size

- The smallest size of both algorithms is when `iss = id` with the id (primary key) being mapped to public_key in `keys.json`. This JWT size is 2.5 KB with DLITHIUM and 8KB with SPHINCS.
- id is the 16 Byte Blake2s hash of the public_key.
- The implemenation with `iss = public_key` increases the size of the DLITHIUM JWT drastically to 5.1KB while the SPHINCS JWT's size is not increased much as the SPHINCS public key is not too large: 32 Bytes.
- `DLITHIUM is the better choice` for JWTs because of it's lower signature size and faster speed.

## 🌟 Spread the word!

If you want to say thank you and/or show support for post-quantum-jwt:

- Star to the project!
- Use it!
- Tweet about the project on Twitter and tag me: [@amany_9000](https://twitter.com/amany_9000)

---

### Developer 🧑🏻‍💻

- [Myself](https://github.com/amany9000)
