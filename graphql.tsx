export function ResolveGraphQL(Data, Schema, rowData, tableSchema, query){
    let output = {}
    for(let key in query){
        console.assert(key in tableSchema, 
            `Unexpected key "${key}" in query on table"`)
        let colSchema = tableSchema[key];
        if(Array.isArray(colSchema)){
            if(colSchema[0][0] == '@'){
                output[key] = rowData[key].map(id => 
                    ResolveGraphQL(
                        Data, Schema, 
                        Data[colSchema[0].slice(1)]
                            .find(k => k.id == id), 
                        Schema[colSchema[0].slice(1)], 
                        query[key]))
            }else{
                output[key] = rowData[key]
            }
        }else{
            if(colSchema[0] == '@'){
                output[key] = ResolveGraphQL(Data, Schema, Data[colSchema.slice(1)]
                    .find(k => k.id == rowData[key]), Schema[colSchema.slice(1)],
                    query[key])
            }else{
                output[key] = rowData[key]
            }    
        }
    }
    return output
}


// const CustomQuery = {
//     name: 1,
//     joined: 1,
//     id: 1,
//     posts: {
//         creator: {
//             name: 1,
//             id: 1
//         },
//         date: 1,
//         id: 1,
//         message: 1,
//         comments: {
//             id: 1,
//             message: 1,
//             author: {
//                 name: 1
//             }
//         }
//     },
//     friends: {
//         name: 1,
//         id: 1,
//         friends: {
//             name: 1,
//             id: 1
//         }
//     }
// }

// let user = ResolveGraphQL(Data.User[0], Schema.User, queryOut)
