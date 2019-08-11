import SearchCtrl from './search';
import {logger} from '../helpers/logger';
import {modelTypeEnum} from '../commons/consts/enums';

export default class StatisticsCtrl extends SearchCtrl {

    fetchInvoicesByUser = (req, res) => {
        try {
            const data = this.groupBy(modelTypeEnum.INVOICE, req.params.name, 'supplierName')
                .then(data => {
                    console.log('data from search: ', data);
                    return res.status(200).json(data);
                });
        } catch (ex) {
            console.error(ex);
            return res.status(400).json(ex);
        }
    }
}
