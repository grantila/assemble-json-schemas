'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var assemble_1 = require("./assemble");
var path_1 = require("path");
var fs_1 = require("fs");
var schemaDir = process.argv[2] || '';
var outFile = process.argv[3] || '';
function appendIndexIfFolder(file) {
    if (!fs_1.existsSync(file))
        return file;
    var result = fs_1.statSync(file);
    if (result.isDirectory())
        return path_1.normalize(file + "/index");
    return file;
}
var dir = path_1.normalize(schemaDir.charAt(0) === '/'
    ? schemaDir
    : process.cwd() + "/" + schemaDir);
var file = appendIndexIfFolder(path_1.normalize(outFile.charAt(0) === '/'
    ? outFile
    : process.cwd() + "/" + outFile));
assemble_1.assemble(dir, file)
    .catch(function (err) {
    console.error(err);
    process.exit(1);
});
