import axios from "axios";
import sects from "../../../../utils/sections";

import { dbUrl, dateDesc, noimage } from "../../../../utils/sections";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        if (req.headers.host != req.headers.referer?.split('/')[2]) {
            return res.end();
        }
        let reel = [];
        const { section } = req.params;

        const url = dbUrl(section);
        const newsSection = (await axios.get(url)).data;

        const sectionData = Object.values(newsSection)
            .sort(dateDesc)
            .sort(noimage)
            .slice(0, 100)
            .map((art) => ({ ...art, section, content: "" }));

        const featuresData = sects
            .filter((sect) => sect != section)
            .map((section) => axios.get(dbUrl(section, 10)));

        const features = (await Promise.all(featuresData)).map(
            ({ data }, index) => {
                const section = sects[index];
                data = Object.values(data).sort(noimage);
                if (section == "reel") {
                    reel = data.slice(1, 5).map((vid) => ({ ...vid, section }));
                }
                return { ...data[0], section, content: "" };
            }
        );

        res.status(200).send({
            data: sectionData,
            features,
            reel,
        });
    }
}
