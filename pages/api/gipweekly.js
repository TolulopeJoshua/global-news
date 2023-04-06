import axios from "axios";

export default async function handler(req, res) {
    const response = await axios.post('https://godinprints.org/weeklyMails', null, {
        headers: {'pass': req.query.pass}
    })
    console.log(response.data);
    res.status(200).send(response.data.toString());
  }