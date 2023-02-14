const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());



const balances = {
  "0xe34c3360a31ebf8cd378f942141d553a38833371": 100,
  "0xd1099bef9db653661174e0cc8c68241183abeb2b": 50,
  "0x0a0185650bb9bad66abc56253b67cb503d346dd5": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  const { sender, recipient, amount } = req.body;
  const message = {sender, amount,recipient};
  const messageHash = hashMessage(JSON.stringify(message));
  const recovered = secp.recoverPublicKey(messageHash, hexToBytes(sign), recoveryBit);

  const addressOfSign = toHex(addressFromPublicKey(recovered));
  console.log('addressOfSign:',addressOfSign)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  return keccak256(bytes);

}

function addressFromPublicKey(publicKey){
  const addrBytes = publicKey.slice(1);
  const hash = keccak256(addrBytes);
  return hash.slice(-20);
}











/* 
Test Keys/Address

Balance 1

private key: 2b4d6c4dc3a2b81f1a1f905a55b21e940be4e811b5de817b38c44ff613e6f829
public key: 04886c02de84f2abe0a4c213d828e7457a0c347edca75ba2138e570a4de1dc98ef1fcb82981430bba02d36429cf8cb810e02bb5cb533de79a599635a06a806609c
address:  0xe34c3360a31ebf8cd378f942141d553a38833371

Balance 2

private key: e42b046370b08d19c214ecb79239fae1435465073c4e70c8c047d079b553d0bd
public key: 049d6fd488d53b967011156c67c54c207a882a8204a962fac0ab7831d6b37e01ec39a02ace6b3d066b0b29e9d20842c8ca4d6bde5e76a052b6519b99dd33754181
address:  0xd1099bef9db653661174e0cc8c68241183abeb2b

Balance 3

private key: bb23db5d0123b9455dbbbb4caa69812b68e7a80693a5388f22a69a82b651cc62
public key: 04fa6bb14b3bb31bb6d7328a39d3cb2e7bfd058e7b007e629ed5f6e2acbc5b6b0e95e58d0494a4fde0095071a93ffe6e212fcbe189bb9bb6a2259f52a5b7c954b9
address:  0x0a0185650bb9bad66abc56253b67cb503d346dd5

*/
