const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const tripSchema = new Schema(
  {
    tripText: {
      type: String,
      required: 'You need to leave a trip!',
      minlength: 1,
      maxlength: 500
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

tripSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;
