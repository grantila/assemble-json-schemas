'use strict'

import * as ts from 'typescript'
import * as path from 'path'


function compileFiles( filenames: string[], options: ts.CompilerOptions )
: Promise< void >
{
	return new Promise< void >( ( resolve, reject ) =>
	{
		const program = ts.createProgram( filenames, options );
		const emitResult = program.emit( );

		const allDiagnostics =
			ts.getPreEmitDiagnostics( program )
			.concat( emitResult.diagnostics );

		allDiagnostics.forEach( diagnostic =>
		{
			const { file, start, messageText } = diagnostic;
			const { fileName }: any = file || { };

			const { line, character } =
				file.getLineAndCharacterOfPosition( start );
			const diagMessage =
				ts.flattenDiagnosticMessageText( messageText, '\n' );

			const message =
				`${fileName} (${line + 1},${character + 1}): ${diagMessage}`;

			if ( emitResult.emitSkipped )
				console.error( message );
			else
				console.warn( message );
		} );

		if ( emitResult.emitSkipped )
			reject( );
		else
			resolve( );
	} );
}

export function compile( filename ): Promise< void >
{
	const dir = path.parse( filename ).dir;

	return compileFiles(
		[ filename ],
		{
			declaration      : true,
			moduleResolution : ts.ModuleResolutionKind.NodeJs,
			outDir           : dir,
			noEmitOnError    : true,
			noImplicitAny    : true,
			target           : ts.ScriptTarget.ES5,
			module           : ts.ModuleKind.CommonJS
		}
	);
}
