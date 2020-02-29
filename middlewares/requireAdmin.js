module.exports = (req, res, next) => {
    let hasAdminAccess = false;
    for (let i = 0; i < req.user.roles.length; i++) {
        if (req.user.roles[i] === 'Owner' || req.user.roles[i] === 'Admin') {
            hasAdminAccess = true;
        }
    }

    if (!hasAdminAccess) {
        return res.status(401).send({ error: ' - Unauthorized Access!' });
    }

    next();
};
