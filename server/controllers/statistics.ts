import SearchCtrl from './search';
import {modelTypeEnum} from '../commons/consts/enums';
import {app} from '../app';
import {get, set, values} from '@typed/hashmap';


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
    };

    pluse = (req, res) => {
        const obj = req.body;
        console.log(obj);
        console.log(app.userSig);

        if (req.body.usr && req.body.sig) {
            let sig = app.userSig.get(req.body.usr);
            console.log(sig);

            if (sig == null) {
                sig = 0;
            }

            sig++;
            console.log(sig);
            console.log(req.body.usr);
            console.log(app.userSig);

            app.userSig.set(req.body.usr, sig);
        }

        res.status(200).json(app.userSig.get(req.body.usr));
    };
}
