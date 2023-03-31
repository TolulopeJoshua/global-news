const axios = require("axios");


export default async function handler(req,  res) {
    if (req.headers.host != req.headers.referer?.split('/')[2]) {
        return res.end();
    }
    if (req.method == 'GET') {
        const options = {
          method: 'GET',
          url: 'https://free-football-soccer-videos.p.rapidapi.com/',
          headers: {
            'X-RapidAPI-Key': process.env.NEXT_SECRET_C1,
            'X-RapidAPI-Host': 'free-football-soccer-videos.p.rapidapi.com'
          }
        };
        axios.request(options).then(function ({ data }) {
            res.status(200).send(data);
        }).catch(function (error) {
            console.error(error);
            res.status(400).send();
        });
    }
}
  
