import refresher from '../../../utils/refresher';
import originf from '../../../utils/originf';

export default async function handler(req,  res) {
    if (req.method === 'GET') {
        originf(req, res);
        await refresher();
        res.status(200).send([req.headers.host, req.headers.referer])
    }
}