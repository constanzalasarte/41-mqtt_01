import { Transaction } from './schema.js';

import { Transaction } from './yourModelFile.js';

const getLatestTransactions = (callback) => {
    Transaction.find({})
        .sort({ date: -1 })
        .limit(10)
        .exec((err, transactions) => {
            if (err) {
                // handle error
                console.error(err);
                callback(err, null);
                return;
            }
            // Process transactions
            callback(null, transactions);
        });
};

export { getLatestTransactions };


