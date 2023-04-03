import refresher from '../../../utils/refresher';
import originf from '../../../utils/originf';
import sections from '../../../utils/sections';
import { readFileSync, writeFileSync } from 'fs';
import axios from 'axios';

export default async function handler(req,  res) {
    if (req.method === 'GET') {
        // if (req.headers.host != req.headers.referer?.split('/')[2]) {
        //     return res.end();
        // }

        const data = {};
        for (let section of sections) {
            let sectionData = [];
            let sectionPath = `/tmp/${section?.split(',')[0]}.json`;
            try {
                // throw ' '
                sectionData = JSON.parse(readFileSync(sectionPath)) || [];
                data[section] = sectionData;
            } catch (error) { 
                console.log('db get');
                const urls = sections.slice(0,7).map(sec => `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/${sec.split(',')[0]}.json?orderBy="pubDate"&limitToLast=100`)
                urls.push(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=player&part=contentDetails&part=status&chart=mostPopular&maxResults=50&videoCategoryId=17&key=${process.env.NEXT_SECRET_YOUTUBE_API_KEY}`);
                urls.push(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=player&part=contentDetails&part=status&chart=mostPopular&maxResults=50&videoCategoryId=24&key=${process.env.NEXT_SECRET_YOUTUBE_API_KEY}`);
                urls.push(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=player&part=contentDetails&part=status&chart=mostPopular&maxResults=50&videoCategoryId=25&key=${process.env.NEXT_SECRET_YOUTUBE_API_KEY}`);
                urls.push(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=player&part=contentDetails&part=status&chart=mostPopular&maxResults=50&videoCategoryId=28&key=${process.env.NEXT_SECRET_YOUTUBE_API_KEY}`);
                // const newsSection = (await axios.get(url)).data;
                const newsSections = (await Promise.all(urls.map(url => axios.get(url)))).map(res => res.data);
                for (let newsSection of newsSections.slice(0,7)) {
                    section = sections[newsSections.indexOf(newsSection)];
                    sectionPath = `/tmp/${section?.split(',')[0]}.json`;
                    sectionData = [];
                    for (let key in newsSection) {
                        sectionData.push(newsSection[key]);
                    }
                    data[section] = sectionData.sort((a,b) => (new Date(b.pubDate) - (new Date(a.pubDate))))
                        .sort((a,b) => {
                            const val = (a.image_url && !b.image_url) ? -1 :
                                        (b.image_url && !a.image_url) ? 1 : 0
                            return val;
                        }).map(art => ({...art, section}));
                    try {
                        writeFileSync(sectionPath, JSON.stringify(data[section])); 
                    } catch (error) { console.log('could not write to file') }
                }
                section = 'reel';
                sectionPath = `/tmp/reel.json`;
                sectionData = [];
                let items = newsSections.slice(7).reduce((it, data) => it.concat(data.items), [])
                console.log(items.length);
                sectionData = items.filter(({contentDetails}) => !contentDetails.regionRestriction).map(video => {
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
                break;
            }
        }
        res.status(200).send(data)
    }
}