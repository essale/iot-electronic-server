import SearchCtrl from './search';
import {logger} from '../helpers/logger';

export default class StatisticsCtrl extends SearchCtrl {

    fetchInvoicesByUser = (req, res) => {
        try {
            const data = this.groupBy(modelTypeEnum.INVOICE, req.params.name, 'username');
            return res.status(200).json(data);
        } catch (ex) {
            logger.error(ex);
            return res.status(400).json(ex);
        }
    }
}
