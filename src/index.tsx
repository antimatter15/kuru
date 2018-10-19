import React from 'react'
import ReactDOM from 'react-dom'

import { Data } from './data'
import { Schema } from './schema'
import { ResolveGraphQL } from './graphql'
import { renderWithData, fetchable } from './core'
import { User, Session, Comment, Photo, Post } from './types'
import { ValidateSchema } from './util'

ValidateSchema(Data, Schema)


function App({ user }: { user: User }){
    return <div>
        <p>Welcome, {user.name}</p>
        
        <h3>Friends, Romans, and Countrymen:</h3>
        <UserList users={user.friends} />
        
        <h3>Posts:</h3>
        <PostList posts={user.posts} />

        <h3>Photos:</h3>
        <PhotoList photos={user.photos} />
    </div>
}


class PhotoList extends React.Component<{photos: Array<Photo>}> {
    render(){
        return <>{
            this.props.photos.map(photo => 
                <img key={photo.id} src={photo.url} title={photo.caption} />)
        }</>
    }
}

function UserList({ users }: { users: User[] }){
    return <ol>{
        users.map(user => 
            <li key={user.id}>
                {user.name}
                <ol>{user.friends.map(foaf => <li key={foaf.id}>{foaf.name}</li>)}</ol>
            </li>)
    }</ol>
}


function PostList({ posts }: { posts: Post[] }){
    return <div>{
        posts.map(post => <fieldset key={post.id} style={{marginBottom: 20}}>
                <p>{post.message}</p>
                <p>by {post.creator.name} ({post.date})</p>
                <hr />
                {post.comments.map(comment => <div key={comment.id}>
                    {comment.message} — {comment.author.name}
                </div>)}
            </fieldset>)
    }</div>
}

function Me(): User {
    return fetchable(Schema, 'User', async (query) => 
        ResolveGraphQL(Data, Schema, Data.User[0], Schema.User, query))
}

renderWithData(
    <App user={Me()} />, 
    document.getElementById("root"))


