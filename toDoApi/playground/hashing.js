// const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');

var password = 'sometexthere';
// bcrypt.genSalt(nrRounds, (err, salt) => {bcrypt.has(password,salt,(err, hash) => {})})
// bcrypt.genSalt(15,(err, salt) => {
//     bcrypt.hash(password,salt, (err, hash) =>{
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$15$sMMBYTuQjTX/HPDJl9C0TewbLi9TGLxpn4TOwoFgo.bM/E.J1RKi2'

bcrypt.compare(password, hashedPassword, (err, res) =>{
    console.log(res);
});
// let message = 'I am user no1'
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

//return

// let data = {
//     id: 4
// };

// let token ={
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecretSalt').toString()
// };

// //a man in the middle might....

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();


// //testing validity of token
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecretSalt').toString();

// if(resultHash === token.hash){
//     console.log('Data was not changed.')
// } else {
//     console.log('data was changed');
// }

// This is implementation of JWT standard

// let data = {
//     id: 10
// }

// let token = jwt.sign(data, 'somesecret');
// console.log(`token: ${token}`);

// let decoded = jwt.verify(token, 'somesecret');
// console.log(`String decoded: ${JSON.stringify(decoded)})`);

