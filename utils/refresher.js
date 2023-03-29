import axios from "axios";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

import sections from "./sections";

export default async () => {
    if (!existsSync('/tmp')){
        mkdirSync('/tmp');
    }
    for (let section of sections) {
        let sectionData = [];
        const sectionPath = `/tmp/${section.split(',')[0]}.json`
        try {
            sectionData = JSON.parse(readFileSync(sectionPath)) || [];
        } catch (error) { console.log('db get') }
        if (sectionData.length < 40) {
            sectionData = [];
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
                try {
                    writeFileSync(sectionPath, JSON.stringify(sectionData.sort((a,b) => {
                        return (new Date(b.pubDate) - (new Date(a.pubDate)))
                    }))); 
                } catch (error) { console.log(error) }
                continue;
            }
            const url = `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/${section.split(',')[0]}.json?orderBy="pubDate"&limitToLast=100`
            const newsSection = (await axios.get(url)).data;
            for (let key in newsSection) {
                sectionData.push(newsSection[key]);
            }
        }
        writeFileSync(sectionPath, JSON.stringify(sectionData.sort((a,b) => {
            return (new Date(b.pubDate) - (new Date(a.pubDate)))
        }).slice(0,100)))
    }
}