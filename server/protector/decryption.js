function decodeString(transformedString) {

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?/';

    function isRandomChar(char) {
        return chars.includes(char);
    }


    let originalChars = '';
    for (let i = 3; i < transformedString.length; i += 7) { 
        if (i < transformedString.length) {
            originalChars += transformedString[i];
        }
    }


    let originalReversedString = originalChars.split('').reverse().join('');
    return originalReversedString;
}

export default decodeString;