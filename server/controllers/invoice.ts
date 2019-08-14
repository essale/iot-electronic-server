import BaseCtrl from './base';
import Invoice from '../models/invoice';
import * as tessarect from './ocr/tessarect';
const fs = require('fs');


export default class InvoiceCtrl extends BaseCtrl {
    model = Invoice;

    saveInvoice = (req, res) => {
        console.log(req.body.username);
        const mkdirp = require('mkdirp');

        const base64Data = req.body.image.replace(/^data:image\/png;base64,/, '');
        const folderPath = 'server/assets/invoices/' + req.body.username;

        if (fs.existsSync(folderPath) === false) {
            mkdirp(folderPath, function (err) {
                console.log(err);
            });
        }

        const imagePath = folderPath + '/' + req.body.imageName;

        fs.writeFile(imagePath, base64Data, 'base64', function (err) {
            if (err != null) {
                return res.status(400);
            }
            tessarect.all.textFromImage(imagePath, req.body.lang);
            // logger.info('Image as text: ' + textStr);
            return res.status(200);
        });
    }
}
