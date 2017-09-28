'use strict'

import debug from 'debug'
import configs from '../../Configs'
import ComService from '../Services/ComService'
import MessagesRepository from '../Repositories/MessagesRepository'
import MessageTypesEnum from '../Enums/MessageTypesEnum'

export default class MessagesService {
  static async newMessage (senderUserId, receiverUserId, type, message) {
    const log = debug(`${configs.debugZone}:MessagesService:newMessage`)

    log('newMessage')

    let resultData

    switch (type) {
      case MessageTypesEnum.text:
        resultData = await this.newTextMessage(senderUserId, receiverUserId, message)
        break
      default:
        throw new Error('this feature has not implemented yet')
    }

    return resultData
  }

  static async newTextMessage (senderUserId, receiverUserId, message) {
    const log = debug(`${configs.debugZone}:MessagesService:newTextMessage`)

    log('newTextMessage')

    const resultData = await MessagesRepository.newMessage(senderUserId, receiverUserId, MessageTypesEnum.text, message)

    try {
      await ComService.directMessageToUser(senderUserId, receiverUserId, resultData)
    } catch (err) {
      log(err.message)
      // TODO: check if message has failed delete the message and return exception
    }

    return resultData
  }
};
