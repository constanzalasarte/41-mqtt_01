var config = {};

config.debug = process.env.DEBUG || true;

config.mqtt  = {};
config.mqtt.namespace = 'AustralFI/inel21/00/#';
config.mqtt.hostname  = '3.92.242.243';
config.mqtt.port      = 1883;

config.mongodb = {};
config.mongodb.hostname   = '54.166.215.192';
config.mongodb.port       = 27017;
config.mongodb.database   = 'vending-machine-db';
config.mongodb.collection = 'message';
config.mongodb.transactionsDB   = 'transactions';

module.exports = config;
