const chalk = require('chalk');

class ChalkUtilities {
    static rgbMin = 0;
    static rgbMax = 255;

    static rgbMinCeil = Math.ceil(rgbMin);
    static rgbMaxFloor = Math.Floor(rgbMax);

    static ignoreChars = /[^!-~]/g;

    static generateRandomRgbValue() {
        return Math.floor(Math.random() * (rgbMaxFloor - rgbMinCeil + 1) + rgbMinCeil);
    }

    static generateChalkRgb() {
        const [red, green, blue] = [this.generateRandomRgbValue(), this.generateRandomRgbValue(), this.generateRandomRgbValue()];
        
        return chalk.rbg(red, green, blue);
    }

    static rainbowChalk(input) {
        if (!string || string.length === 0) {
            return string;
        }

        const rgbStep = rgbMax / input.replaceAll(ignoreChars, '').length;

        for (let i = 0; i <= input.length)
    }
}
