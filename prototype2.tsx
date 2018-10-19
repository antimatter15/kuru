
function DeriveQuery(element){
    if(typeof element != 'object') return;
    if(Array.isArray(element)){
        for(let el of element){
            DeriveQuery(el)
        }
        return
    }
    if(element.props.children){
        DeriveQuery(element.props.children)
    }
    if(typeof element.type === 'function'){
        DeriveQuery(element.type(element.props))
    }else if(typeof element.type == 'string'){
        // console.log('simple element', element)
    }else{
        console.warn('stateful elmeent', element)
    }
    
}


function makeSingleInstance(field, def, types, path){
    if(def[0] == '@'){
        return MakeInstance(types[def.slice(1)], types, [...path, field])
    }else{
        console.log([...path, field])
    }
}

function MakeInstance(tableSchema, schema, path = []){
    let instance = {}
    for(let [field, def] of Object.entries(tableSchema)){
        Object.defineProperty(instance, field, {
            get(){
                if(Array.isArray(def)){
                    return [ makeSingleInstance(field, def[0], schema, path) ]
                }else{
                    return makeSingleInstance(field, def, schema, path)
                }
            }
        })
    }
    return instance;
}