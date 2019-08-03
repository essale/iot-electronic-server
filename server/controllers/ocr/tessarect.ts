import { logger } from '../../helpers//logger';

const tesseract = require('node-tesseract');
const config = {
    lang: 'eng',
    oem: 1,
    psm: 3
};

const options = {
    // Use the english and german languages
    l: 'eng+heb'
};

export const all = {

    textFromImage: function (path, lang) {
        console.log(path);
        // logger.info('Start handling tessarect image conversion to text');
        tesseract.process(path, options, (err, text) => {
            if (err) {
                return console.log('An error occured: ', err);
            }

            console.log('Recognized text:');
            // the text variable contains the recognized text
            console.log(text);
        });
    }
};
