import refresher from '../../../utils/refresher';
import originf from '../../../utils/originf';
import sections from '../../../utils/sections';
import { readFileSync, writeFileSync } from 'fs';

export default async function handler(req,  res) {
    if (req.method === 'GET') {
        if (req.headers.host != req.headers.referer?.split('/')[2]) {
            return res.end();
        }

        const data = {};
        for (let section of sections) {
            let sectionData = [];
            const sectionPath = `/tmp/${section?.split(',')[0]}.json`;
            try {
                sectionData = JSON.parse(readFileSync(sectionPath)) || [];
            } catch (error) { 
                console.log('db get');
                if (section == 'reel') {
                    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=player&part=snippet&part=contentDetails&part=status&chart=mostPopular&maxResults=50&videoCategoryId=25&key=${process.env.NEXT_SECRET_YOUTUBE_API_KEY}`;
                    let response = await axios.get(url)
                    let { items } = response.data;
                    sectionData = items.map(video => {
                        const {
                            id, snippet: {title, description, publishedAt: pubDate, 
                            thumbnails:{standard}}, player: {embedHtml: content}
                        } = video;
                        return ({title, description, content, pubDate, image_url: standard?.url, id});
                    })
                    data[section] = sectionData.sort((a,b) => {
                        return (new Date(b.pubDate) - (new Date(a.pubDate)))
                    }).map(art => ({...art, section}));
                    try {
                        writeFileSync(sectionPath, JSON.stringify(data[section])); 
                    } catch (error) { console.log('could not write to file') }
                    continue;
                }
                const url = `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/${section.split(',')[0]}.json?orderBy="pubDate"&limitToLast=100`
                const newsSection = (await axios.get(url)).data;
                for (let key in newsSection) {
                    sectionData.push(newsSection[key]);
                }
            }
            data[section] = sectionData.sort((a,b) => {
                const val = (a.image_url && !b.image_url) ? -1 :
                            (b.image_url && !a.image_url) ? 1 : 0
                return val;
            }).map(art => ({...art, section}));
            try {
                writeFileSync(sectionPath, JSON.stringify(data[section])); 
            } catch (error) { console.log('could not write to file') }
        }
        res.status(200).send(data)
    }
}