<div align='center'>
  
<a href='https://github.com/amany9000/post-quantum-jwt/releases'>
  
  
</a>
  
<a href='https://github.com/amany9000/post-quantum-jwt/blob/main/LICENSE'>
  
<img src='https://img.shields.io/github/license/amany9000/post-quantum-jwt'>
  
</a>

</div>

<br />

# post-quantum-jwt
A POC for post-quantum JWT generation with the lib [djwt](https://github.com/amany9000/dJWT). The post-quantum digital signature algorithms are generated using [noble-post-quantum](https://github.com/paulmillr/noble-post-quantum).

It implements JWT using two algorithms
- DLITHIUM
- SPHINCS

## Installation 

```sh
npm install
```


## How to use 🛠️

Genrate Keys
```sh
tsx generateKeys.ts 
```

Create token 
```sh
tsx token.ts
```

---

## JWT Size 
- The smallest size of both algorithms is when `iss = id` with the id (primary key) being mapped to public_key in `keys.json`. This JWT size is 2.5 KB with DLITHIUM and 8KB with SPHINCS.
- id is the 128-bit Blake2s hash of the public_key.
- The implemenration with `iss = public_key` increases the size of the DLITHIUM JWT drastically to 5.1KB while SPHINCS JWT's size is not increased much as the SPHINCS public key is not too large in size: 32bytes.


## 🌟 Spread the word!

If you want to say thank you and/or show support for post-quantum-jwt:

- Star to the project!
- Tweet about the project on Twitter and tag me: [@amany_9000](https://twitter.com/amany_9000) 

---

### Developer 🧑🏻‍💻

- [Myself](https://github.com/amany9000)