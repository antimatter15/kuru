import React from 'react'
import ReactDOM from 'react-dom'

export function fetchable(
    schema: { [type:string]: {} }, 
    type: string, 
    fetcher: (query) => Promise<any>) {
    return [ schema, type, fetcher ] as any
}

export async function renderWithData(element, container){
    let newProps = {}
    let queries = {}

    for(let [key, value] of Object.entries(element.props)){
        let [ Schema, Type, fetcher ] = value as any;
        newProps[key] = MakeInstance(Schema[Type], Schema, queries[key] = {})
    }

    pseudoRender(React.cloneElement(element, newProps))

    let dataProps = {}
    for(let [key, value] of Object.entries(element.props)){
        let [ Schema, Type, fetcher ] = value as any;
        console.log(queries[key])
        dataProps[key] = await fetcher(queries[key])
    }

    ReactDOM.render(React.cloneElement(element, dataProps), container)
}

function pseudoRender(element){
    // dont bother if its not an object
    if(typeof element != 'object') return;
    if(Array.isArray(element)){
        // render all children
        for(let el of element) pseudoRender(el);
        return
    }
    if(element.props.children){
        pseudoRender(element.props.children)
    }
    if(typeof element.type === 'function'){
        if(element.type.prototype.render){
            // stateful react components
            let clone = React.cloneElement(element)
            let el = new (clone.type as any)(clone.props)
            el.render()
        }else{
            // stateless functional react components
            pseudoRender(element.type(element.props))    
        }
    }
}


function makeSingleInstance(field, def, types, queryOut){
    if(def[0] == '@'){
        if(!(field in queryOut)) queryOut[field] = {};
        return MakeInstance(types[def.slice(1)], types, queryOut[field])
    }else{
        queryOut[field] = 1
        return Math.random().toString()
    }
}

function MakeInstance(tableSchema, schema, queryOut){
    let instance = {}
    for(let [field, def] of Object.entries(tableSchema)){
        Object.defineProperty(instance, field, {
            get(){
                if(Array.isArray(def)){
                    return [ makeSingleInstance(field, def[0], schema, queryOut) ]
                }else{
                    return makeSingleInstance(field, def, schema, queryOut)
                }
            }
        })
    }
    return instance;
}