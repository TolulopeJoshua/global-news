import axios from 'axios'
import originf from '../../utils/originf';

export default async function handler(req,  res) {
  if (req.headers.host != req.headers.referer?.split('/')[2]) {
      return res.end();
  }
  const location = req.query.location;
  res.status(200).send((await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.NEXT_SECRET_WEATHER_APPID}`)).data)
}
