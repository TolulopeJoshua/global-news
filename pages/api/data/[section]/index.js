import refresher from "../../../../utils/refresher";
import originf from "../../../../utils/originf";
import sections from "../../../../utils/sections";

import { readFileSync } from "fs";

export default async function handler(req,  res) {
    if (req.method === 'GET') {
        if (req.headers.host != req.headers.referer?.split('/')[2]) {
            return res.end();
        }
        await refresher();
        let sectionData = [];
        let reel = [];
        const { section } = req.query
        let sectionPath = `/tmp/${section.split(',')[0]}.json`;
        try {
            sectionData = JSON.parse(readFileSync(sectionPath)) || [];
        } catch (error) { console.log(error) }
        const features = sections.filter(sect => sect != section).map(section => {
            sectionPath = `/tmp/${section.split(',')[0]}.json`;
            try {
                let data = JSON.parse(readFileSync(sectionPath)) || [{}];
                data = sortByImage(data)
                if (section == 'reel') {
                    reel = data.slice(1,10).map(vid => ({...vid, section}))
                }
                return {...data[0], section}
            } catch (error) { 
                return {};
             }
        })
        res.status(200).send({data: sortByImage(sectionData).map(data => ({...data, section})), features, reel})
    }

    function sortByImage(data) {
        return data.sort((a,b) => {
            if (a.image_url && !b.image_url) return -1;
            if (b.image_url && !a.image_url) return 1;
            return 0;
        })
    }
}