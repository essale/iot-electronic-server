import SearchCtrl from './search';
import {logger} from '../helpers/logger';
import {modelTypeEnum} from '../commons/consts/enums';

export default class StatisticsCtrl extends SearchCtrl {

    fetchInvoicesByUser = (req, res) => {
        try {
            const data = this.groupBy(modelTypeEnum.INVOICE, req.params.name, 'supplierName');
            console.log(data);
            return res.status(200).json(data);
        } catch (ex) {
            console.error(ex);
            return res.status(400).json(ex);
        }
    }

    pluse = (req, res) => {
        const obj = req.body;
        console.log(obj);

        // if (err && err.code === 11000) {
        //     res.sendStatus(400);
        // }
        // if (err) {
        //     return console.error(err);
        // }

        res.status(200).json(obj);
    }
}
