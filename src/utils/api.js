const api = 'https://hacker-news.firebaseio.com/v0';
const json = '.json?print=pretty';

const fetchItem = id => fetch(`${api}/item/${id}${json}`).then(res => res.json());

const removeDeletedAndDead = posts => posts.filter(({ deleted, dead }) => !deleted && !dead);

const onlyStories = posts => posts.filter(({ type }) => type === 'story');

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
        .then(posts => removeDeletedAndDead(onlyStories(posts)))
}

export const fetchUser = id => fetch(`${api}/user/${id}${json}`).then(res => res.json());

export const fetchPosts = ids => {
    return Promise.all(ids.map(fetchItem))
        .then(posts => removeDeletedAndDead(onlyStories(posts)))
}
