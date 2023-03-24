// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import requestIp from 'request-ip'
import axios from 'axios'

export default async function handler( req, res ) {
  const detectedIp = requestIp.getClientIp(req)
  res.status(200).send((await axios.get(`https://ipapi.co/${detectedIp}/json/`)).data.city)
}