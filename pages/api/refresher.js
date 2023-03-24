import axios from 'axios'
import { readFileSync, writeFileSync } from 'fs'

import proxy from '../../utils/proxy';
console.log(proxy)

export default async function handler(req,  res) {
    if (req.method === 'POST' && req.headers.id === process.env.NEXT_SECRET_FIREBASE_APIKEY) {
        let timeKeeper;
        let span = 1000 * 60 * 65;
        const interval = setInterval(() => {
            try {
                timeKeeper = JSON.parse(readFileSync('utils/timeKeeper.json'))
            } catch (error) { console.log(error) }
    
            if (timeKeeper && timeKeeper.length) {
                const latest = timeKeeper[0];
                if ((new Date()) - (new Date(latest)) > (1000 * 60 * 62)) {
                    refresh()
                    timeKeeper.unshift(new Date())
                    writeFileSync('utils/timeKeeper.json', JSON.stringify(timeKeeper.slice(0,50)));
                } else {
                    console.log('cleared')
                    clearInterval(interval);
                }
            } else {
                writeFileSync('utils/timeKeeper.json', JSON.stringify([new Date()]));
                clearInterval(interval);
            }
        }, span);
        console.log('started')
        res.status(200).send(`refreshing at ${span / 60000} minutes interval`)
    }

    async function refresh () {
        try {
            const url = `http://${req.headers.host}/api/refresh`
            const { data } = await axios.post(url, null, {
                headers: {id: process.env.NEXT_SECRET_FIREBASE_APIKEY}
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
}