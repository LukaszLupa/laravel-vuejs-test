/**
 * Convert bytes to format
 *
 * @param {number} bytes
 *
 * @return {string}
 */
export function convertBToFormat(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k: number = 1024;
    const sizes: Array<string> = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i: number = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
