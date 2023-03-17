import axios from 'axios'

export default async function handler(req,  res) {
  const location = req.query.location;
  res.status(200).send((await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.NEXT_SECRET_WEATHER_APPID}`)).data)
}
