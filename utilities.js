class ChalkUtilities {
    static rgbMin = 0;
    static rgbMax = 255;

    static rgbMinCeil = Math.ceil(this.rgbMin);
    static rgbMaxFloor = Math.floor(this.rgbMax);

    static ignoreChars = /[^!-~]/g;

    static generateRandomRgbValue() {
        return Math.floor(Math.random() * (this.rgbMaxFloor - this.rgbMinCeil + 1) + this.rgbMinCeil);
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

    }
}

const util = { ChalkUtilities };

export default util;
