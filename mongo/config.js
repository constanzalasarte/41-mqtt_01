var config = {};

config.debug = process.env.DEBUG || true;

config.mqtt  = {};
config.mqtt.namespace = 'AustralFI/inel21/00/#';
config.mqtt.hostname  = '54.146.49.53';
config.mqtt.port      = 1883;

config.mongodb = {};
config.mongodb.hostname   = '54.81.244.87';
config.mongodb.port       = 27017;
config.mongodb.database   = 'vending-machine-db';
config.mongodb.collection = 'message';

module.exports = config;
