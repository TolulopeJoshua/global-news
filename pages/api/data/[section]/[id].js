import axios from "axios";

import { dbUrl, dateDesc } from "../../../../utils/sections";

export default async function handler(req,  res) {
    if (req.method === 'GET') {
        if (req.headers.host != req.headers.referer?.split('/')[2]) {
            return res.end();
        }
        const { section, id } = req.params;
        const url = dbUrl(section, 105);
        const newsSection = (await axios.get(url)).data;
    
        let sectionData = Object.values(newsSection).sort(dateDesc);
    
        const data = sectionData.find((art) => art.id == id);
        sectionData = !data ? sectionData : sectionData
          .concat(sectionData.splice(0, sectionData.indexOf(data) + 1))
          .filter((dat) => dat.image_url)
          .map((data) => ({ ...data, section, content: "" }));
    
        res
          .status(200)
          .send({ data: data && { ...data, section }, list: sectionData });
    }
}