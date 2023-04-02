import axios from 'axios'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { v4 as uuid } from 'uuid';

import sects from '../../utils/sections'
import refresher from '../../utils/refresher';

export default async function handler(req,  res) {
    if (req.method !== 'POST' || req.headers.id !== process.env.NEXT_SECRET_FIREBASE_APIKEY) {
        return res.status(400).send();
    }
    // await refresher();
    let count = 0, ins = 0;
    let {section} = req.query;
    // for (let section of sections) {
        const options = {
            method: 'GET',
            url: 'https://newsdata2.p.rapidapi.com/news',
            params: {category: section, language: 'en'},
            headers: {
                'X-RapidAPI-Key': process.env.NEXT_SECRET_C1,
                'X-RapidAPI-Host': 'newsdata2.p.rapidapi.com'
            }
        };
        let sectionData = [];
        const sectionPath = `/tmp/${section.split(',')[0]}.json`;
        try {
            if (section == 'reel') {
                const ids = [17,24,25,28]
                const urls = ids.map(id => `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=player&part=contentDetails&part=status&chart=mostPopular&maxResults=50&videoCategoryId=${id}&key=${process.env.NEXT_SECRET_YOUTUBE_API_KEY}`);
                const responses = await Promise.all(urls.map(url => axios.get(url))) 
                let items = responses.reduce((res, sec) => res.concat(sec.data.items), []);
                sectionData = items.filter(({contentDetails}) => !contentDetails.regionRestriction).map(video => {
                    const {
                        id, snippet: {title, description, publishedAt: pubDate, 
                            thumbnails:{standard}}, player: {embedHtml: content}
                        } = video;
                        return ({title, description, content, pubDate, image_url: standard?.url, id});
                    })
                console.log(section, sectionData.length);
                writeFileSync(sectionPath, JSON.stringify(sectionData.sort((a,b) => {
                    return (new Date(b.pubDate) - (new Date(a.pubDate)))
                }).slice(0,100)));
            } else {
                try {
                    sectionData = JSON.parse(readFileSync(sectionPath)) || [];
                } catch (error) { 
                    const url = `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/${section.split(',')[0]}.json?orderBy="pubDate"&limitToLast=100`
                    const newsSection = (await axios.get(url)).data;
                    for (let key in newsSection) {
                        sectionData.push(newsSection[key]);
                    }
                 }
                let response = await axios.request(options)
                let { results } = response.data;
                if (results && results.length) {
                    results = results.filter(article => {
                        if (!(article.description || article.content)) return false;
                        if (!article.image_url && article.content?.length < 1000) return false;
                        if (['cyprus-mail','pakistantoday','manicapost','scripts.24','Snl24','pajhwok','hmetro',
                                'colombopage','sportti','orissapost','herald','allbanaadir','sundaymail','sundaynews'
                            ].filter(src => article.link.includes(src)).length) return false;
                        return (!(sectionData.map(data => data.title).includes(article.title)));
                    }).sort((a,b) => (new Date(b.pubDate) - (new Date(a.pubDate)))).slice(0,1);
                    console.log(section, results.length)
                    for (let result of results) {
                        let {title, link, description, content, pubDate, image_url, id} = result;
                        description = description || content.slice(0,100);
                        content = content || description;
                        id = uuid();
                        if (count < 2) {
                            const key = [
                                process.env.NEXT_SECRET_C1, process.env.NEXT_SECRET_C2,
                                process.env.NEXT_SECRET_C3, process.env.NEXT_SECRET_C4,
                            ][sects.indexOf(section) % 4]
                            const options = {
                                method: 'GET',
                                url: 'https://extract-news.p.rapidapi.com/v0/article',
                                params: { url: link },
                                headers: {
                                    'X-RapidAPI-Key': key,
                                    'X-RapidAPI-Host': 'extract-news.p.rapidapi.com'
                                }
                            };
                            console.log(link.split('/')[2]);
                            console.log(title);
                            response = await axios.request(options)
                            const {article} = response.data;
                            if (article) {
                                content = article.text || content; image_url = article.meta_image || image_url; 
                                description = article.meta_description || description;
                            }
                            const dbPath = `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/${section.split(',')[0]}/${id}.json`
                            await axios.put(dbPath, JSON.stringify({title, link, description, content, pubDate, image_url, id}))
                            sectionData.unshift({title, link, description, content, pubDate, image_url, id});
                            writeFileSync(sectionPath, JSON.stringify(sectionData.sort((a,b) => {
                                return (new Date(b.pubDate) - (new Date(a.pubDate)))
                            }).slice(0,100))); 
                            console.log(`${ins += 1} - ${section}`)
                            count += 1;
                        } else {
                            console.log('Escaped insertion: ' + section)
                        }
                    }
                }
            }
        } catch (error) { console.log(error) }
    // }
    res.status(200).send('success ' + new Date())
}