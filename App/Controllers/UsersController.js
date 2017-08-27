'use strict'

import debug from 'debug'
import configs from '../../Configs'
import UsersService from '../Services/UsersService'
import UsersRepository from '../Repositories/UsersRepository'

export default class UserController {
  static async createOrGet (req, res) {
    const error = debug(`${configs.debugZone}:UserController:createOrGet`)

    const {accessToken, facebookUserId} = req.payload

    try {
      const {data, action} = await UsersService.findOrCreateUser(accessToken, facebookUserId)

      res({
        statusCode: 200,
        data,
        action
      }).code(200)
    } catch (e) {
      console.error(e)
      error(e.message)

      res({
        statusCode: 500,
        error: e.message
      }).code(500)
    }
  }

  static async profileUpdate (req, res) {
    const error = debug(`${configs.debugZone}:UserController:profileUpdate`)

    const {user} = req.auth.credentials
    const {attributes} = req.payload

    try {
      const data = await UsersService.updateUser(user.id, attributes)

      res({
        statusCode: 200,
        data
      }).code(200)
    } catch (e) {
      error(e.message)

      res({
        statusCode: 500,
        error: e.message
      }).code(500)
    }
  }

  static async getProfile (req, res) {
    const error = debug(`${configs.debugZone}:UserController:getProfile`)

    const {userId} = req.params

    try {
      const data = await UsersService.findUser(userId)

      if (!data) {
        return res({
          statusCode: 404,
          message: 'there is no user with requested id'
        }).code(404)
      }

      res({
        statusCode: 200,
        data
      }).code(200)
    } catch (e) {
      error(e.message)

      res({
        statusCode: 500,
        error: e.message
      }).code(500)
    }
  }
};
