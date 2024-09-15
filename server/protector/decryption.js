function decodeString(transformedString) {
    // Characters to use for random additions (letters, numbers, and symbols)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?/';

    // Function to check if a character is part of the random characters
    function isRandomChar(char) {
        return chars.includes(char);
    }

    // Extract only the original characters from the transformed string
    let originalChars = '';
    for (let i = 3; i < transformedString.length; i += 7) { // Skips 3 random chars before the original char
        if (i < transformedString.length) {
            originalChars += transformedString[i];
        }
    }

    // Reverse the originalChars to get the original reversed string
    let originalReversedString = originalChars.split('').reverse().join('');
    return originalReversedString;
}

export default decodeString;