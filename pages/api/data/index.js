import axios from "axios";
import sects from "../../../utils/sections";

import { dbUrl, dateDesc, noimage } from "../../../utils/sections";

export default async function handler(req,  res) {
    if (req.method === 'GET') {
        if (req.headers.host != req.headers.referer?.split('/')[2]) {
            return res.end();
        }
        const data = {};
        const urls = sects.map((sec) => dbUrl(sec));
        // console.log(urls);
        const newsSections = (
          await Promise.all(urls.map((url) => axios.get(url)))
        ).map((res) => res.data);
        for (const newsSection of newsSections) {
          const section = sects[newsSections.indexOf(newsSection)];
          const sectionData = Object.values(newsSection);
          data[section] = sectionData
            .sort(dateDesc)
            .sort(noimage)
            .map((art) => ({ ...art, section }));
        }
        res.status(200).send(data);
    }
}
