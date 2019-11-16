const fetch = require('node-fetch');

exports.mainPage = async function (req, res, next) {
  try {
    let { username } = req.params;
    username = (username) ? username : 'inidaname';

    const person = await fetch(`https://bio.torre.co/api/bios/${username}`)
      .then(re => re.json())
      .then(json => json);

    if (person.code === '011002') {
      throw { message: person.message, status: 404 };
    }

    res.render('home', { title: 'Welcome', person: person.person });

  } catch (error) {
    return next(error);
  }
};
