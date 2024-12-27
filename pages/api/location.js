// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import requestIp from 'request-ip'

const token = process.env.IP_Token;

export default async function handler( req, res ) {
  if (req.headers.host != req.headers.referer?.split('/')[2]) {
      return res.end();
  }
  const clientIp = requestIp.getClientIp(req)
  const url = `https://ipinfo.io/${clientIp}?token=${token}`;
  const location = (await axios.get(url)).data;
  
  res.status(200).send(location.city)
}
