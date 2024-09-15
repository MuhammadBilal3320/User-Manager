function encryptString(input) {
    let reversedString = input.split('').reverse().join('');

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?/';

    function getRandomChars() {
        let randomChars = '';
        for (let i = 0; i < 3; i++) {
            randomChars += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return randomChars;
    }

    let result = '';
    for (let i = 0; i < reversedString.length; i++) {
        result += getRandomChars() + reversedString[i] + getRandomChars();
    }

    return result;
}

export default encryptString;
