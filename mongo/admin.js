import { Transaction } from './yourModelFile.js';

Transaction.find({}).sort({ date: -1 }).limit(10).exec((err, transactions) => {
    if (err) {
        // handle error
        console.error(err);
        return;
    }
    // Process transactions
    console.log(transactions);
});
