const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
    const token = req.header('Authorization');
    if(!token) return res.status(401).send({message: 'Access Denied!'})
    try {
        const verified = jwt.verify(token,'nesto')
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({message: 'Invalid Token!'})
    }
}