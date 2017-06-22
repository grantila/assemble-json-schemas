'use strict';

import { assemble } from './assemble'
import { normalize } from 'path'
import { existsSync, statSync } from 'fs'


const schemaDir = process.argv[ 2 ] || '';
const outFile = process.argv[ 3 ] || '';


function appendIndexIfFolder( file: string ): string
{
	if ( !existsSync( file ) )
		return file;

	const result = statSync( file );
	if ( result.isDirectory( ) )
		return normalize( file + "/index" );
	return file;
}

const dir = normalize(
	schemaDir.charAt( 0 ) === '/'
	? schemaDir
	: process.cwd( ) + "/" + schemaDir
);

const file = appendIndexIfFolder( normalize(
	outFile.charAt( 0 ) === '/'
	? outFile
	: process.cwd( ) + "/" + outFile
) );

assemble( dir, file )
.catch( err =>
{
	console.error( err );
	process.exit( 1 );
} );
