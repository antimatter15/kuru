export type User = {
    friends: User[]
    photos: Photo[]
    posts: Post[]
    name: string
    joined: string
    id: string
}

export type Session = {
    user: User
    date: string
    cookie: string
}

export type PostComment = {
    id: string
    author: User
    date: string
    message: string
}

export type Photo = {
    id: string
    creator: User
    caption: string
    url: string
    date: string
    comments: PostComment[]
}

export type Post = {
    creator: User
    message: string
    date: string
    comments: PostComment[]
    id: string
}


