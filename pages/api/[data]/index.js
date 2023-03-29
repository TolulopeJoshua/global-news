import refresher from '../../../utils/refresher';
import originf from '../../../utils/originf';
import sections from '../../../utils/sections';
import { readFileSync } from 'fs';

export default async function handler(req,  res) {
    if (req.method === 'GET') {
        originf(req, res);
        await refresher();

        const data = {};
        for (let section of sections) {
            let sectionData = [];
            const sectionPath = `/tmp/${section?.split(',')[0]}.json`;
            try {
                sectionData = JSON.parse(readFileSync(sectionPath)) || [];
            } catch (error) { console.log(error) }
            data[section] = sectionData.filter(data => {
                data.section = section;
                return data.image_url;
            }).slice(0,20);
        }
        res.status(200).send(data)
    }
}