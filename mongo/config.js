var config = {};

config.debug = process.env.DEBUG || true;

config.mqtt  = {};
config.mqtt.namespace = 'AustralFI/inel21/00/#';
config.mqtt.hostname  = '54.162.154.117';
config.mqtt.port      = 1883;

config.mongodb = {};
config.mongodb.hostname   = '35.174.9.135';
config.mongodb.port       = 27017;
config.mongodb.database   = 'vending-machine-db';
config.mongodb.collection = 'message';
config.mongodb.transactionsDB   = 'transactions';

module.exports = config;