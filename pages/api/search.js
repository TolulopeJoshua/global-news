import axios from "axios";
import originf from '../../utils/originf';

export default async function handler(req,  res) {
    if (req.method === 'POST') {
        originf(req, res);
        let c = 0;
        search();
        function search() {
            if (c > 3) return res.status(400).send();
            const key = [
                process.env.NEXT_SECRET_C1,process.env.NEXT_SECRET_C2,
                process.env.NEXT_SECRET_C3,process.env.NEXT_SECRET_C4
            ][c]
            const options = {
                method: 'GET',
                url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
                params: {
                    q: req.body.query,
                    pageNumber: '1',
                    pageSize: '50',
                    autoCorrect: 'true',
                    safeSearch: 'true',
                    withThumbnails: 'true',
                    fromPublishedDate: 'null',
                    toPublishedDate: 'null'
                },
                headers: {
                    'X-RapidAPI-Key': key,
                    'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
                }
            };
            axios.request(options).then(function (response) {
                res.status(200).send(response.data)
            }).catch(function (error) {
                c += 1;
                search();
            });
        }
    }
}
