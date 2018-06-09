const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OlaDriverLocationSchema = new Schema({
  coordinates: {type: [Number], index: '2dsphere'},
  type: {type: String, default: 'Point'}
  /*creating index for coordinates property type as 22dsphere
  (for ref : https://docs.mongodb.com/manual/geospatial-queries/#geospatial-indexes
  https://docs.mongodb.com/manual/core/2dsphere/)*/
});

const OlaDriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  OlaDriverLocation: OlaDriverLocationSchema
});

const OlaDriver = mongoose.model('oladriver', OlaDriverSchema);

module.exports = OlaDriver;
