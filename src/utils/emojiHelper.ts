/**
 * The code exports two functions, one to convert a base64 string to UTF-8 and another to convert a
 * Unicode string to an emoji.
 * @param {string} str - A base64 encoded string that needs to be converted to UTF-8 format.
 * @returns The `b64_to_utf8` function returns a decoded string in UTF-8 format from a base64 encoded
 * string. The `unicodeToEmoji` function returns an emoji character as a string from a Unicode code
 * point in hexadecimal format.
 */
export function b64_to_utf8(str: string) {
    return decodeURIComponent(escape(window.atob(str)));
}

export function unicodeToEmoji(unicode: string): string {
    return String.fromCodePoint(parseInt(unicode, 16));
}