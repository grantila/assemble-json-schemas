import { FindFilesOptions } from './find-files';
export interface Options {
    interfaceNamer?: (filename: string) => string;
    findOptions?: FindFilesOptions;
}
export declare function assemble(schemaDir: string, outFile: string, options?: Options): Promise<void>;
