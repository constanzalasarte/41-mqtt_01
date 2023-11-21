var config = {};

config.debug = process.env.DEBUG || true;

config.mqtt  = {};
config.mqtt.namespace = 'AustralFI/inel21/00/#';
config.mqtt.hostname  = '35.173.235.21';
config.mqtt.port      = 1883;

config.mongodb = {};
config.mongodb.hostname   = '18.232.159.210';
config.mongodb.port       = 27017;
config.mongodb.database   = 'vending-machine-db';
config.mongodb.collection = 'message';
config.mongodb.transactionsDB   = 'transactions';

module.exports = config;