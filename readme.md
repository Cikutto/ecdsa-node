## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

The best way to deeply understand blockchain is to put yourself into development mode. What would it be like to build your own blockchain? Let's start by applying our knowledge of hashes and digital signatures to our very first project: ECDSA Node.

In this project you'll have a simple react front-end which will communicate with a single server. This server will be responsible for transferring balances between accounts. Since it's a single server, it is centralized, so we'll need to trust that the server operator is not malicious for this exercise (more on this later!).

## 🏁 Your Goal: ECDSA
This project begins with a client that is allowed to transfer any funds from any account to another account. That's not very secure. By applying digital signatures we can require that only the user with the appropriate private key can create a signature that will allow them to move funds from one account to the other. Then, the server can verify the signature to move funds from one account to another.

Incorporate Public Key Cryptography so transfers can only be completed with a valid signature
The person sending the transaction should have to verify that they own the private key corresponding to the address that is sending funds

Once you get up and running you'll notice a few components that we're given to start:

Wallet addresses - there are three pre-defined wallet addresses and balances in our server index.js file
The lefthand side of the UI shows us our wallet and account balance
The righthand side of the UI is where we can send an amount to a specified wallet address
## Tips (Helpful Resources)

We're going to be incorporating the concepts we learned from this week into the final project. Here are a few resources you'll find helpful when working on this project:

Public Key Exercises in the Digital Signatures lesson (Recover Keys, Sign Message, Hash Messages)
The Ethereum Cryptography library - specifically random private key generation
