'use strict'

import HealthCheckRoutes from './Routes/HealthCheckRoutes'
import AuthRoutes from './Routes/AuthRoutes'
import UsersRoutes from './Routes/UsersRoutes'
import StreamRoutes from './Routes/StreamRoutes'
import HashtagsRoutes from './Routes/HashtagsRoutes'
import SearchRoutes from './Routes/SearchRoutes'
import MessagesRoutes from './Routes/MessagesRoutes'
import LocationRoutes from './Routes/LocationRoutes'

export default class Routes {
  constructor (router) {
    this.router = router

    HealthCheckRoutes.setRoutes(this.router, 'health-check')
    AuthRoutes.setRoutes(this.router)
    UsersRoutes.setRoutes(this.router)
    StreamRoutes.setRoutes(this.router)
    HashtagsRoutes.setRoutes(this.router)
    SearchRoutes.setRoutes(this.router)
    MessagesRoutes.setRoutes(this.router)
    LocationRoutes.setRoutes(this.router)
  }
};
