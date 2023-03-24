import originf from "../../../../utils/originf";

export default async function handler(req,  res) {
    if (req.method === 'GET') {
        originf(req, res);
        
        // res.status(200).send((await axios.get(url)).data)
    }
}