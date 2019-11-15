const fetch = require('node-fetch');

exports.search = async function(req, res){
    try {
        
    } catch (error) {
        return res.status(error.status || 500).render('error', {message: error.message});
    }
}