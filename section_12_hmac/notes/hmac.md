# HMAC

HMAC is
> a mechanism for message authentication using cryptographic hash functions. HMAC can be used with any iterative cryptographic hash function, e.g., MD5, SHA-1, in combination with a secret shared key.  The cryptographic strength of HMAC depends on the properties of the underlying hash function.

[Source](https://datatracker.ietf.org/doc/html/rfc2104)

Before we dive deeper into it, let's have a quick reminder of what cryptographic hash functions are.

## Cryptographic hash functions

> A cryptographic hash function (CHF) is a mathematical algorithm that maps data of an arbitrary size (often called the "message") to a bit array of a fixed size (the "hash value", "hash", or "message digest"). It is a one-way function, that is, a function for which it is practically infeasible to invert or reverse the computation.

[Source](https://en.wikipedia.org/wiki/Cryptographic_hash_function)

Cryptographic hash functions can be used e.g. to safely store user passwords in a database:

>### Hashing vs Encryption
>
>Hashing and encryption both provide ways to keep sensitive data safe. However, in almost all circumstances, **passwords should be hashed, NOT encrypted**.
>
>**Hashing is a one-way function** (i.e., it is impossible to "decrypt" a hash and obtain the original plaintext value). Hashing is appropriate for password validation. Even if an attacker obtains the hashed password, they cannot enter it into an application's password field and log in as the victim.
>
>**Encryption is a two-way function**, meaning that the original plaintext can be retrieved.

[Source](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

> The storage of passwords in a recoverable format makes them subject to password reuse attacks by malicious users. In fact, it should be noted that recoverable encrypted passwords provide no significant benefit over plaintext passwords since they are subject not only to reuse by malicious attackers but also by malicious insiders. If a system administrator can recover a password directly, or use a brute force search on the available information, the administrator can use the password on other accounts.

[Source](http://cwe.mitre.org/data/definitions/257.html)
## The HMAC Flow

Let's say we have two parties - a client and a server - that want to exchange messages in a secure way. HMAC can be used to verify the integrity of the messages (i.e. that they have not been modified by some third-party) and their authenticity (i.e. that they [originated from their purported source](https://csrc.nist.gov/glossary/term/authenticity)).

HMAC works under the assumptions that:
- the client and the server share a single secret, which is unique for every client,
- the server is able to match the client with its corresponding secret based on some identifier that the client sends with every request.

If these conditions are met, the HMAC flow (for requests sent from the client to the server) looks as follows:
- before sending a request, the client generates an HMAC hash to sign it. The hash is created by applying a hash function to a combination of the shared secret and some information from the request:
  > HMAC = hashFunc(secret key + message)

  [Source](https://www.geeksforgeeks.org/what-is-hmachash-based-message-authentication-code/)

  You can find more details about this process in the [Generating the HMAC signature](#generating-the-hmac-signature) section below.

- the client sends a request with:
  - the HMAC hash as the request's signature
  - an identifier that the server will use to match the client with its corresponding secret

- the server receives the request and determines the client's secret based on its identifier

- the server generates its own HMAC hash, using the same hash function, request data and secret that the client used to sign the request

- the server compares the hash it computed with the one sent by the client and if they match, it means the request wasn't tampered with.

The whole flow is explained in more depth in [How API Request Signing Works (and how to implement HMAC in NodeJS)](https://blog.andrewhoang.me/how-api-request-signing-works-and-how-to-implement-it-in-nodejs-2/) by Andrew Hoang.

## Generating the HMAC signature
In order to generate the HMAC hash that will be used to sign a request, we need:
- a cryptographic hash function - the name of the function is often included in an HMAC-based algorithm name, e.g. *HMAC-SHA256* uses the SHA256 algorithm to generate the HMAC hashes
- a secret value shared between the client and the server - it could be stored in and retrieved from some secure secrets management tool, e.g. [HashiCorp Vault](https://www.vaultproject.io/)
- some information from the request itself. This can include for example:
  - HTTP method - `GET`, `POST`, `PUT` etc.
  - domain name of the server to which the request is being sent
  - a path of the request, e.g. `/test`
  - query string parameters
  - (some of) the request's headers
  - a hashed body/payload, which can be set to a hashed empty string for requests without payloads (e.g. `GET` requests)

Note that the exact process of generating the signature can differ between different implementations. [Here](https://docs.oracle.com/en/cloud/saas/marketing/crowdtwist-develop/Developers/HMACAuthentication.html) you can find a description of the implementation used by Oracle, and [here](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html) of the one used by AWS.

## Canonicalization
Because the request's data is used on both client and server side to calculate the signature, and these two signatures need to match, the client and the server need to use the same string representation of the request. The process of putting the request in an agreed-upon form for signing is called canonicalization ([source](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-header-based-auth.html)).
