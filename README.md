# Spongiform

Being a modern react developer is repetitive and repetitive. 

You have to specify your schema once for your database. Write it again as a GraphQL schema. Write it again to bind your database to your GraphQL resolvers. You've gotta write part of it again to define a GraphQL query. And you've got to restate it in your own words in code to read from the query object. And if you've decided to use TypeScript, then you've got to write everything out one more time.

Congrats, you've basically done the same mindless and tedious task six times. Might as well have some brain-eating prion disease or something. 

## Prior Art

Probably the most similar prior art out there is Babel Blade (https://babel-blade.netlify.com/docs/index.html), which is a babel plugin that automatically generates GraphQL queries from statically analyzing your code. As such, it doesn't work across function boundaries and requires special transpilation steps. 

Spongiform takes a different approach. We render the DOM twice— initially with a virtual virtual pass where we keep track of which fields are accessed, we construct the appropriate GraphQL query, fetch the data, and then render with the actual data. 

## Gotchas
    
In the following code snippet, even if `posts` is an empty list, the generated query will never include `name` as it never evaluates the branch were `props.post.length` might be 1. 

In fact during the pseudo-rendering pass of spongiform, `.length` of any array will be exactly `1`, and any valid field found in the schema will always be present. Any logic which is conditioned otherwise may not work.

    function Special(props){
        if(props.posts.length == 0){
            return props.name
        }else{
            return props.post.map(k => k.message)
        }
    }