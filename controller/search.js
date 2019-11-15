const fetch = require('node-fetch');

exports.search = async function (req, res) {
    try {
        const { query, connection } = req.params;
        
        let url = (connection) ? `https://torre.bio/api/people/${query}/connections?q=${connection}&limit=10` : `https://torre.bio/api/people?q=${query}&limit=10`;

        const data = await fetch(url, { method: 'GET' })
            .then(result => result.json())
            .then(json => json);

        res.status(200).json(data);
    } catch (error) {
        return res.status(error.status || 500).render('error', { message: error.message });
    }
}