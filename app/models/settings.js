'use strict';

const BaseModel = require('../base-model');

module.exports = class SettingsModel extends BaseModel {
  constructor(env) {
    super(env);

    const ObjectId = this.mongoose.Types.ObjectId

    this.model = this.registerSchema('settings', 'settings', {
      userId: {
        type: this.mongoose.Schema.ObjectId,
        ref: 'users'
      },
      initFrontCameraByDefault: {
        type: Boolean,
        default: false
      },
      highVideoQualityRecord: {
        type: Boolean,
        default: false
      },
      deleteVideoAfterRecord: {
        type: Boolean,
        default: false
      },
    });
  }

  getSettingsByUserId(userId) {
    let base = this;

    const Model = this.model;

    return new Promise((fulfill, reject) => {
      Model.find({
        userId: base.mongoose.Types.ObjectId(userId)
      }, (err, res) => {
        if (err) {
          reject(err);

          return;
        }

        fulfill(res[0] || null);
      });
    });
  }

  saveSettingsByUserId(userId, data) {
    let base = this;

    const Model = this.model;

    return new Promise((fulfill, reject) => {
      Model.update({
        userId: base.mongoose.Types.ObjectId(userId),
      }, data, (err, res) => {
        if (err) {
          reject(err);

          return;
        }

        fulfill();
      });
    });
  }

  createSettings(data) {
    const Model = this.model;
    const Users = new Model(data);

    return new Promise((fulfill, reject) => {
      Users.save((err, res) => {
        if (err) {
          reject(err);

          return;
        }

        fulfill(res);
      });
    });
  }
}