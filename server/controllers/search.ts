import * as mongoose from 'mongoose';
import Invoice from '../models/invoice';
import Supplier from '../models/supplier';
import User from '../models/user';

abstract class SearchCtrl {
    model: any;

    // Get all
    groupBy = function (modelType, userName, groupParameter) {
        let retVal = null;

        switch (modelType) {
            case modelTypeEnum.INVOICE: {
                this.model = Invoice;
                break;
            }
            case modelTypeEnum.SUPPLIER: {
                this.model = Supplier;
                break;
            }
            case modelTypeEnum.USER: {
                this.model = User;
                break;
            }
        }

        this.model.aggregate(
            { $match: {$username: userName } },
            {
                $group: {
                    _id: groupParameter, // grouping key - group by field district
                    flatsCount: { $sum: 1 }
                }
            },
            function( err, data ) {

                if ( err ) {
                    throw err;
                }

                console.log( JSON.stringify( data, undefined, 2 ) );
                retVal = data;
            }
        );

        return retVal;
    };
}


export default SearchCtrl;
