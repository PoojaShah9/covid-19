var cacheVal = require('memory-cache')

let duration = 100;
let cache = (req, res, next) => {

    let key = '__express__' + req.originalUrl || req.url;
    let cacheBody = cacheVal.get(key);
    if (cacheBody) {
        console.log('from cache');
        res.send(cacheBody);
    } else {
        console.log('create cache');
        res.sendResponse = res.send
        res.send = (body) => {
            cacheVal.put(key, body, duration * 1000)
            res.sendResponse(body)
        }
        next();
    }
}

module.exports = {
    cache: cache
}