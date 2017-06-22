'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var findit = require("findit2");
function findFiles(dir, opts) {
    if (opts === void 0) { opts = {}; }
    return new Promise(function (resolve, reject) {
        var finder = findit(dir, opts);
        var files = [];
        finder.on('file', function (file, stat, linkPath) {
            files.push(file);
        });
        finder.on('end', function () { return resolve(files); });
        finder.on('error', function (err) { return reject(err); });
    });
}
exports.findFiles = findFiles;
