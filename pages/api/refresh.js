import refresher from '../../utils/refresher';

export default async function handler(req,  res) {
    if (req.method !== 'POST' || req.headers.id !== process.env.NEXT_SECRET_FIREBASE_APIKEY) {
        return res.status(400).send();
    }
    res.status(200).send("success " + new Date());

    const section = req.query.section.split(",")[0];
    await refresher[section]();
}