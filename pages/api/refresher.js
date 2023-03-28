import axios from 'axios'
import { readFileSync, writeFileSync } from 'fs'

export default async function handler(req,  res) {
    if (req.method === 'POST' && req.headers.id === process.env.NEXT_SECRET_FIREBASE_APIKEY) {
        let timeKeeper;
        try {
            timeKeeper = JSON.parse(readFileSync('/tmp/timeKeeper.json'))
        } catch (error) { 
            try {
                writeFileSync('/tmp/timeKeeper.json', JSON.stringify([new Date()]));
            } catch (error) { console.log(error) }
        }
        let span = 1000 * 60 * 75;
        const interval = setInterval(() => {
    
            if (timeKeeper && timeKeeper.length) {
                const latest = timeKeeper[0];
                if ((new Date()) - (new Date(latest)) > (1000 * 60 * 70)) {
                    refresh()
                    timeKeeper.unshift(new Date())
                    writeFileSync('/tmp/timeKeeper.json', JSON.stringify(timeKeeper.slice(0,50)));
                } else {
                    console.log('cleared')
                    clearInterval(interval);
                }
            } else {
                writeFileSync('/tmp/timeKeeper.json', JSON.stringify([new Date()]));
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