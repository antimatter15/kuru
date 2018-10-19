

function makeSingleInstance(field, def, types){
    if(field == 'name'){
        return faker.name.findName()
    }else if(def == 'date'){
        return faker.date.past()
    }else if(def == 'string'){
        return faker.lorem.text()
    }else if(def == 'uuid'){
        return faker.random.uuid()
    }else if(def[0] == '@'){
        return MakeInstance(types[def.slice(1)], types)
    }
}

function MakeInstance(objSchema, types){
    let instance = {}
    for(let [field, def] of Object.entries(objSchema)){
        Object.defineProperty(instance, field, {
            get(){
                if(Array.isArray(def)){
                    return [ makeSingleInstance(field, def[0], types) ]
                }else{
                    return makeSingleInstance(field, def, types)
                }
            }
        })
    }
    return instance;
}

function MakeORM(){
    let ORM = {}
    for(let [type, schema] of Object.entries(Schema)){
        Object.defineProperty(ORM, type, {
            get(){
                return MakeInstance(schema, Schema)
            }
        })
    }
    return ORM;
}

