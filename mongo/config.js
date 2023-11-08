var config = {};

config.debug = process.env.DEBUG || true;

config.mqtt  = {};
config.mqtt.namespace = process.env.MQTT_NAMESPACE || 'AustralFI/inel21/00/#';
config.mqtt.hostname  = process.env.MQTT_HOSTNAME  || '54.146.49.53';
config.mqtt.port      = process.env.MQTT_PORT      || 1883;

config.mongodb = {};
config.mongodb.hostname   = process.env.MONGODB_HOSTNAME   || '3.87.179.153';
config.mongodb.port       = process.env.MONGODB_PORT       || 27017;
config.mongodb.database   = process.env.MONGODB_DATABASE   || 'test';
config.mongodb.collection = process.env.MONGODB_COLLECTION || 'message';

module.exports = config;
