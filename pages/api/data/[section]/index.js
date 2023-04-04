import refresher from "../../../../utils/refresher";
import originf from "../../../../utils/originf";
import sections from "../../../../utils/sections";

import { readFileSync, writeFileSync } from "fs";

export default async function handler(req,  res) {
    if (req.method === 'GET') {
        if (req.headers.host != req.headers.referer?.split('/')[2]) {
            return res.end();
        }
        // await refresher();
        let sectionData = [];
        let reel = [];
        const { section } = req.query
        let sectionPath = `/tmp/${section.split(',')[0]}.json`;
        try {
            sectionData = JSON.parse(readFileSync(sectionPath)) || [];
        } catch (error) { 
            if (section == 'reel') {
                const urls = [17,24,25,28].map(id => `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=player&part=contentDetails&part=status&chart=mostPopular&maxResults=50&videoCategoryId=${id}&key=${process.env.YOUTUBE_API_KEY}`)
                const newsSection = (await Promise.all(urls.map(url => axios.get(url)))).map(res => res.data);
                let items = newsSection.reduce((it, data) => it.concat(data.items), [])
                sectionData = items.filter(({contentDetails}) => !contentDetails.regionRestriction).map(video => {
                    const {
                    id, snippet: {title, description, publishedAt: pubDate, 
                        thumbnails:{standard}}, player: {embedHtml: content}
                    } = video;
                    return ({title, description, content, pubDate, image_url: standard?.url, id});
                })
            } else {
                const url = `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/${section.split(',')[0]}.json?orderBy="pubDate"&limitToLast=100`;
                const newsSection = (await axios.get(url)).data;
                for (let key in newsSection) {
                    sectionData.push(newsSection[key]);
                }
            }
            sectionData = sectionData.sort((a,b) => (new Date(b.pubDate) - (new Date(a.pubDate))))
            .sort((a,b) => {
                const val = (a.image_url && !b.image_url) ? -1 :
                            (b.image_url && !a.image_url) ? 1 : 0
                return val;
            }).slice(0,100).map(art => ({...art, section}));
            try {
                writeFileSync(sectionPath, JSON.stringify(sectionData)); 
            } catch (error) { console.log('could not write to file') }
         }
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