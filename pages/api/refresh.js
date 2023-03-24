import axios from 'axios'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { v4 as uuid } from 'uuid';

import sections from '../../utils/sections'
import refresher from '../../utils/refresher';

export default async function handler(req,  res) {
    if (req.method !== 'POST' || req.headers.id !== process.env.NEXT_SECRET_FIREBASE_APIKEY) {
        return res.status(400).send();
    }
    await refresher();
    let count = 0;
    for (let section of sections) {
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
        const sectionPath = `newsData/${section.split(',')[0]}.json`;
        try {
            sectionData = JSON.parse(readFileSync(sectionPath)) || [];
        } catch (error) { writeFileSync(sectionPath, '[]') }
        try {
            let response = await axios.request(options)
            let { results } = response.data;
            if (results && results.length) {
                results = results.filter(article => !sectionData.map(data => data.title).includes(article.title))
                console.log(section, results.length)
                for (let result of results) {
                    let {title, link, description, content, pubDate, image_url, id} = result;
                    if (!description && !content) continue;
                    description = description || content.slice(0,50);
                    content = content || description;
                    id = uuid();
                    if (!image_url && !link.includes('cyprus-mail') && count < 20) {
                        const key = [
                            process.env.NEXT_SECRET_C1, process.env.NEXT_SECRET_C2,
                            process.env.NEXT_SECRET_C3, process.env.NEXT_SECRET_C4,
                        ][Math.floor(count / 5)]
                        const options = {
                            method: 'GET',
                            url: 'https://extract-news.p.rapidapi.com/v0/article',
                            params: { url: link },
                            headers: {
                                'X-RapidAPI-Key': key,
                                'X-RapidAPI-Host': 'extract-news.p.rapidapi.com'
                            }
                        };
                        try {
                            const response = await axios.request(options)
                            const {article} = response.data;
                            if (article) {
                                content = article.text || content; image_url = article.meta_image; 
                                description = article.meta_description || description;
                            }
                        } catch (error) { console.log(error) }
                        count += 1;
                    }
                    const dbPath = `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/${section.split(',')[0]}/${id}.json`
                    await axios.put(dbPath, JSON.stringify({title, link, description, content, pubDate, image_url, id}))
                    sectionData.unshift({title, link, description, content, pubDate, image_url, id});
                }
                if (results.length) {
                    try {
                        writeFileSync(sectionPath, JSON.stringify(sectionData.sort((a,b) => {
                            return (new Date(b.pubDate) - (new Date(a.pubDate)))
                        }).slice(0,100))); 
                    } catch (error) { console.log(error) }
                }
            }
        } catch (error) { console.log(error) }
    }
    res.status(200).send('success')
}