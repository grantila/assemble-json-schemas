'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var path = require("path");
function compileFiles(filenames, options) {
    return new Promise(function (resolve, reject) {
        var program = ts.createProgram(filenames, options);
        var emitResult = program.emit();
        var allDiagnostics = ts.getPreEmitDiagnostics(program)
            .concat(emitResult.diagnostics);
        allDiagnostics.forEach(function (diagnostic) {
            var file = diagnostic.file, start = diagnostic.start, messageText = diagnostic.messageText;
            var fileName = (file || {}).fileName;
            var _a = file.getLineAndCharacterOfPosition(start), line = _a.line, character = _a.character;
            var diagMessage = ts.flattenDiagnosticMessageText(messageText, '\n');
            var message = fileName + " (" + (line + 1) + "," + (character + 1) + "): " + diagMessage;
            if (emitResult.emitSkipped)
                console.error(message);
            else
                console.warn(message);
        });
        if (emitResult.emitSkipped)
            reject();
        else
            resolve();
    });
}
function compile(filename) {
    var dir = path.parse(filename).dir;
    return compileFiles([filename], {
        declaration: true,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        outDir: dir,
        noEmitOnError: true,
        noImplicitAny: true,
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.CommonJS
    });
}
exports.compile = compile;
