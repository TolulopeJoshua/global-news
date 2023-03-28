export default (req, res) => {
    if (req.headers.host != req.headers.referer.split('/')[2]) {
        res.end();
    }
}