// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
import axios from 'axios'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const detectedIp = requestIp.getClientIp(req)
  res.status(200).send((await axios.get(`https://ipapi.co/${detectedIp}/json/`)).data.city)
}
