import axios from "axios";

export default async function handler(req, res) {
    const res = await axios.post('https://godinprints.org/weeklyMails', null, {
        headers: {'pass': '08162008'}
    })
    console.log(res.data);
    res.status(200).send(res.data.toString());
  }