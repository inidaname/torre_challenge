const fetch = require('node-fetch');

exports.search = async function (req, res, next) {
    try {
        const { query, connection } = req.params;

        let url = (connection) ? 
            `https://bio.torre.co/api/people/${query}/connections?q=${connection}&limit=10` :
            `https://torre.bio/api/people?q=${query}&limit=10`;

        const data = await fetch(url, { method: 'GET' })
            .then(result => result.json())
            .then(json => json);

        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
}