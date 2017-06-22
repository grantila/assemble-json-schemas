export interface FindFilesOptions {
    followSymlinks?: boolean;
}
export declare function findFiles(dir: string, opts?: FindFilesOptions): Promise<string[]>;
