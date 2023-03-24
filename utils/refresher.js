import { existsSync, mkdirSync, writeFileSync } from "fs";

export default async () => {
    if (!existsSync('newsData')){
        mkdirSync('newsData');
        const url = `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY}.json`
        const newsData = (await axios.get(url)).data;
        for (let section in newsData) {
            const sectionData = [];
            for (let key in newsData[section]) {
                sectionData.push(newsData[section][key]);
            }
            const sectionPath = `newsData/${section}.json`
            writeFileSync(sectionPath, JSON.stringify(sectionData.sort((a,b) => {
                return (new Date(b.pubDate) - (new Date(a.pubDate)))
            }).slice(0,100)))
        }
    }
}