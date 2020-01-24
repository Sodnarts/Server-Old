module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Forbidden - Insufficient Credits!' });
    }
    next();
};
