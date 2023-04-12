import axios from 'axios'

export default async function handler(req,  res) {
  if (req.headers.host != req.headers.referer?.split('/')[2]) {
      return res.end();
  }
  if (req.method == 'PUT') {
    const {uid, email, status} = req.query;
    await axios.put(`https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/newsletters/${uid}.json`, JSON.stringify({email, status}))
    res.status(200).send();
  } else if (req.method == 'GET') {
    const { uid } = req.query;
    const { data } = await axios.get(`https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/newsletters/${uid}.json`)
    res.status(200).send(data);
  }
}