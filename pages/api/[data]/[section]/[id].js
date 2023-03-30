import axios from "axios";
import { readFileSync } from "fs";
import originf from "../../../../utils/originf";
import refresher from "../../../../utils/refresher";

export default async function handler(req,  res) {
    if (req.method === 'GET') {
        if (req.headers.host != req.headers.referer?.split('/')[2]) {
            return res.end();
        }
        await refresher();
        let sectionData = [];
        const { section, id } = req.query
        const sectionPath = `/tmp/${section?.split(',')[0]}.json`;
        try {
            sectionData = JSON.parse(readFileSync(sectionPath)) || [];
        } catch (error) { console.log(error) }
        let data = sectionData.find(art => art.id == id);
        if (!data) {
            if (section == 'reel') {
                const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=player&part=snippet&part=contentDetails&part=status&id=${id}&key=${process.env.NEXT_SECRET_YOUTUBE_API_KEY}`;
                let response = await axios.get(url)
                let { items } = response.data;
                data = items.map(video => {
                    const {
                        id, snippet: {title, description, publishedAt: pubDate, 
                        thumbnails:{standard}}, player: {embedHtml: content}
                    } = video;
                    return ({title, description, content, pubDate, image_url: standard?.url, id});
                })[0];
            } else {
                const url = `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/${section.split(',')[0]}/${id}.json`
                data = (await axios.get(url)).data;
            }
        }
        sectionData = sectionData.concat(sectionData.splice(0,sectionData.indexOf(data)))
            .filter(dat => (dat.id != data?.id) && dat.image_url).map(data => ({...data, section}))
        res.status(200).send({data: data ? {...data, section}:null, list: sectionData })
    }
}