
export function ValidateSchema(database, schema){
    for(let [ table, rows ] of Object.entries(database)){
        console.assert(table in schema, 
            `Encountered table "${table}" not defined in schema.`)
        let tableSchema = schema[table];

        for(let row of (rows as Array<any>)){
            for(let [ colName, colValue ] of Object.entries(row)){
                console.assert(colName in tableSchema, 
                    `Unexpected column "${colName}" in table ${table}`)
                let colSchema = tableSchema[colName];
                const matchReference = (colSchema, colValue) => {
                    if(colSchema[0] == '@'){
                        console.assert(database[colSchema.slice(1)].some(k => k.id == colValue), 
                            `Expected "${colSchema.slice(1)}" with ID ${colValue} referenced by "${colName}" in table "${table}"`)
                    }
                }
                if(Array.isArray(colSchema)){
                    console.assert(colSchema.length == 1, 
                        `Array schema must have length of exactly 1`)
                    console.assert(Array.isArray(colValue), 
                        `Expected array for column "${colName}" found ${JSON.stringify(colValue)}`)
                    for(let el of (colValue as any)){
                        matchReference(colSchema[0], el)
                    }
                }else{
                    matchReference(colSchema, colValue)
                }
            }
        }
    }
}

