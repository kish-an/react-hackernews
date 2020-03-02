const api = 'https://hacker-news.firebaseio.com/v0';
const json = '.json?print=pretty';

const fetchItem = id => {
    return fetch(`${api}/item/${id}${json}`)
        .then(res => res.json());
}

const removeDeletedAndDead = posts => {
    return posts.filter(({ deleted, dead }) => !deleted && !dead);

}

export const fetchStories = type => {
    return fetch(`${api}/${type}stories${json}`)
        .then(res => res.json())
        .then(ids => {
            if (!ids) {
                throw new Error(`Error fetching ${type} posts`);
            }

            return ids.splice(0, 50);
        })
        .then(ids => Promise.all(ids.map(fetchItem)))
        .then(posts => removeDeletedAndDead(posts))
}
