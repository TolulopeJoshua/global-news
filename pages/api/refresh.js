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
    let count = 0, ins = 0;
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
        const sectionPath = `/tmp/${section.split(',')[0]}.json`;
        try {
            sectionData = JSON.parse(readFileSync(sectionPath)) || [];
        } catch (error) { writeFileSync(sectionPath, '[]') }
        try {
            if (section == 'reel') {
                const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=player&part=snippet&part=contentDetails&part=status&chart=mostPopular&maxResults=50&videoCategoryId=25&key=${process.env.NEXT_SECRET_YOUTUBE_API_KEY}`;
                axios.get(url).then(response => {
                    let { items } = response.data;
                    console.log(section, items.length)
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
                }).catch(error => console.log(error))
                continue;
            }
            axios.request(options).then(async response => {
                let { results } = response.data;
                if (results && results.length) {
                    results = results.filter(article => {
                        if (!(article.description || article.content)) return false;
                        if (!article.image_url && article.content?.length < 1000) return false;
                        if (['cyprus-mail','pakistantoday','manicapost','scripts.24','Snl24','pajhwok','hmetro'
                            ].filter(src => article.link.includes(src)).length) return false;
                        return (!(sectionData.map(data => data.title).includes(article.title)));
                    }).sort((a,b) => (new Date(b.pubDate) - (new Date(a.pubDate)))).slice(0,2);
                    console.log(section, results.length)
                    for (let result of results) {
                        let {title, link, description, content, pubDate, image_url, id} = result;
                        description = description || content.slice(0,100);
                        content = content || description;
                        id = uuid();
                        if (count < 16) {
                            const key = [
                                process.env.NEXT_SECRET_C1, process.env.NEXT_SECRET_C2,
                                process.env.NEXT_SECRET_C3, process.env.NEXT_SECRET_C4,
                            ][Math.floor(count / 4)]
                            const options = {
                                method: 'GET',
                                url: 'https://extract-news.p.rapidapi.com/v0/article',
                                params: { url: link },
                                headers: {
                                    'X-RapidAPI-Key': key,
                                    'X-RapidAPI-Host': 'extract-news.p.rapidapi.com'
                                }
                            };
                            axios.request(options).then(response => {
                                const {article} = response.data;
                                if (article) {
                                    content = article.text || content; image_url = article.meta_image || image_url; 
                                    description = article.meta_description || description;
                                }
                                const dbPath = `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/${section.split(',')[0]}/${id}.json`
                                axios.put(dbPath, JSON.stringify({title, link, description, content, pubDate, image_url, id}))
                                sectionData.unshift({title, link, description, content, pubDate, image_url, id});
                                writeFileSync(sectionPath, JSON.stringify(sectionData.sort((a,b) => {
                                    return (new Date(b.pubDate) - (new Date(a.pubDate)))
                                }).slice(0,100))); 
                                console.log(`${ins += 1} - ${section}`)
                            }).catch(error => {
                                console.log(error.response.statusText + ': ' + link.split('/')[2])
                                // const dbPath = `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/${section.split(',')[0]}/${id}.json`
                                // axios.put(dbPath, JSON.stringify({title, link, description, content, pubDate, image_url, id}))
                                // sectionData.unshift({title, link, description, content, pubDate, image_url, id});
                                // writeFileSync(sectionPath, JSON.stringify(sectionData.sort((a,b) => {
                                //     return (new Date(b.pubDate) - (new Date(a.pubDate)))
                                // }).slice(0,100))); 
                                // console.log(ins += 1)
                            })
                            count += 1;
                        } else {
                            // const dbPath = `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}/${section.split(',')[0]}/${id}.json`
                            // axios.put(dbPath, JSON.stringify({title, link, description, content, pubDate, image_url, id}))
                            // sectionData.unshift({title, link, description, content, pubDate, image_url, id});
                            // writeFileSync(sectionPath, JSON.stringify(sectionData.sort((a,b) => {
                            //     return (new Date(b.pubDate) - (new Date(a.pubDate)))
                            // }).slice(0,100))); 
                            console.log('Escaped insertion: ' + section)
                        }
                    }
                }
            }).catch(error => console.log(error));
        } catch (error) { console.log(error) }
    }
    res.status(200).send('success ' + new Date())
}