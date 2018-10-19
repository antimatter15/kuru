import { Schema } from './schema'

// generates typescript file with type definitions from schema

for(let [ key, value ] of Object.entries(Schema)){
    console.log(`export type ${key} = {\n    ${
        Object.entries(value).map(([field, spec]) => {
            let s = Array.isArray(spec) ? spec[0] : spec;
            return `${field}: ${s[0] == '@' ? s.slice(1) : 'string'}${Array.isArray(spec) ? '[]' : ''}`
        }).join('\n    ')
    }\n}`)
}