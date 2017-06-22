'use strict'

import * as findit from 'findit2'

export interface FindFilesOptions
{
	followSymlinks?: boolean;
}

export function findFiles( dir: string, opts: FindFilesOptions = { } )
: Promise< string[] >
{
	return new Promise< string[] >( ( resolve, reject ) =>
	{
		const finder = findit( dir, opts );

		const files: string[] = [ ];

		finder.on( 'file', ( file, stat, linkPath ) =>
		{
			files.push( file );
		} );

		finder.on( 'end', ( ) => resolve( files ) );

		finder.on( 'error', err => reject( err ) );
	} );
}
