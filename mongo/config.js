var config = {};

config.debug = process.env.DEBUG || true;

config.mqtt  = {};
config.mqtt.namespace = 'AustralFI/inel21/00/#';
config.mqtt.hostname  = '54.224.56.200';
config.mqtt.port      = 1883;

config.mongodb = {};
config.mongodb.hostname   = '52.72.143.223';
config.mongodb.port       = 27017;
config.mongodb.database   = 'vending-machine-db';
config.mongodb.collection = 'message';
config.mongodb.transactionsDB   = 'transactions';

module.exports = config;
