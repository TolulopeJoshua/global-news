export default ['world', 'sports', 'business', 'health', 'top', 'science,technology', 'entertainment', 'reel']

export function dbUrl(section, limit = 100, id) {
    return `https://gipnews-default-rtdb.firebaseio.com/${process.env.NEXT_SECRET_FIREBASE_APIKEY
        }/${section.split(",")[0]}${id ? "/" + id : ""}.json?orderBy="pubDate"&limitToLast=${limit}`;
}

export const dateDesc = (a, b) => new Date(b.pubDate) - new Date(a.pubDate);

export const noimage = (a, b) =>
    a.image_url && !b.image_url ? -1 : b.image_url && !a.image_url ? 1 : 0