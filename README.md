[![npm version][npm-image]][npm-url]

# assemble-json-schemas

If you're building a repo with your JSON schemas, and want automatic creation of TypeScript interfaces (as well as the schemas as objects), this package is probably for you.

The easiest way to use this, is to add a `scripts` entry in your `package.json`, which runs `node_modules/.bin/ajs schema-dir out-file`. The `schema-dir` should point to a directory (which could have sub-directories) where the json schemas are located, and `out-file` is a base file **name** (without extension) which will be generated. The generated files will be `out-file.js`, `out-file.ts` and `out-file.d.ts`. If the `out-file` is left blank, it will default to `index` in the current working directory and if set to the name of an existing directory, `/index` will be appended automatically.

Let's say you put your schemas in a `schemas/` directory, and you want to automatically have `index.ts`, `index.js` and `index.d.ts` created for you, the command will be `node_modules/.bin/ajs schemas`.

# Using as an API

The following is an example of how to use `assemble-json-schemas` given a directory of schemas, and an output file (to which `.js`, `.ts` and `.d.ts` will be appended):

```ts
import { assemble } from 'assemble-json-schemas'

assemble( __dirname + "/schemas", __dirname + "/index" )
.catch( err => console.error( err ) );
```

[npm-image]: https://img.shields.io/npm/v/assemble-json-schemas.svg
[npm-url]: https://npmjs.org/package/assemble-json-schemas
