var localtunnel = require('localtunnel');
localtunnel(
    5000,
    {
        subdomain: 'oeiwqdcnxdasdasdadwdswoi',
    },
    function(err, tunnel) {
        console.log('LT running');
    }
);
