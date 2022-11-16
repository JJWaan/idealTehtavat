// JSON Web Token Verification function

const jwt = require('jsonwebtoken'); // npm i jsonwebtoken

const verifyToken = (request, response, next) =>{
    const token = request.headers.authorization?.split(' ')[1]; 
    // set headers to: Authorization: 'bearer TOKEN'
    if (!token) {
        response.status(200).json(
            {
                success: false,
                message: "Error: Token was not provided."
            }
        );
    };
    // Decoding the token
    const decodedToken = jwt.verify(token, "secretkeyappearshere");
    request.decoded = decodedToken;
    next(); // this is needed here, otherwise code processing gets stuck
};

module.exports = verifyToken;