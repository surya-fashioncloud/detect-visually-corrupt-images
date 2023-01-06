'use strict';

const Jimp = require("jimp")

/**
 * Check if image is corrupted
 * @param {path} string
 */
module.exports = function isCorruptedImage(path) {
    return new Promise((resolve, reject) => {
        Jimp.read(path)
            .then(image => {
                const height = image.getHeight();
                let greyPixels = 0;
                // get bottom left 5x5 pixels
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        const x = i;
                        const y = height - 5 + j;
                        const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(x, y));
                        // check if the rgb values are grey
                        if (r === g && g === b && b === 128)
                            ++greyPixels;
                    }
                }
                // if more than 50% pixels are grey pixels than the image is corrupt
                if (greyPixels > 12)
                    resolve(true)
                else
                    resolve(false)
            })
            .catch(error => {
                if (error.message.includes('marker was not found'))
                    return resolve(true)
                reject(error)
            });
    });
};
