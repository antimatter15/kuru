export const Schema = {
    User: {
        friends: ['@User'],
        photos: ['@Photo'],
        posts: ['@Post'],
        name: 'string',
        joined: 'date',
        id: 'uuid'
    },
    Session: {
        user: '@User',
        date: 'date',
        cookie: 'uuid'
    },
    Photo: {
        id: 'uuid',
        creator: '@User',
        caption: 'string',
        url: 'string',
        date: 'date',
        comments: ['@Comment']
    },
    Post: {
        creator: '@User',
        message: 'string',
        date: 'date',
        comments: ['@Comment'],
        id: 'uuid'
    },
    Comment: {
        id: 'uuid',
        author: '@User',
        date: 'date',
        message: 'string'
    }
}
