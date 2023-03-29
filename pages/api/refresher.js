import axios from 'axios'
import { readFileSync, writeFileSync } from 'fs'

import sections from '../../utils/sections'

export default async function handler(req,  res) {
    if (req.method === 'POST' && req.headers.id === process.env.NEXT_SECRET_FIREBASE_APIKEY) {
        for (let section of sections) {
            const url = `http://${req.headers.host}/api/refresh?section=${section}`
            axios.post(url, null, {
                headers: {id: process.env.NEXT_SECRET_FIREBASE_APIKEY}
            }).then().catch(error => console.log(error));
        }
        res.status(200).send('refreshing...')
    }
}