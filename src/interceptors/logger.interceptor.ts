import { Injectable, Scope, Logger, Module } from '@nestjs/common'
import * as LogdnaWinston from 'logdna-winston'
import { createLogger, Logger as winston } from 'winston'

import { LOG_DNA } from '~/constants'

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends Logger {
  private winston: winston
  private readonly logger = new Logger()

  constructor() {
    super()
    const options = {
      key: LOG_DNA.key,
      hostname: LOG_DNA.hostname,
      app: LOG_DNA.app,
      env: LOG_DNA.env,
      handleExceptions: LOG_DNA.handleExceptions
    }

    this.winston = createLogger({
      transports: []
    })
    this.winston.add(new LogdnaWinston(options))
  }

  log(message: string) {
    this.logger.setContext(this.context)
    this.logger.log(message)
    this.winston.info(message, { context: this.context })
  }

  warn(message: string) {
    this.logger.setContext(this.context)
    this.logger.warn(message)
    this.winston.warn(message, { context: this.context })
  }

  error(message: string) {
    this.logger.setContext(this.context)
    this.logger.error(message)
    this.winston.error(message, { context: this.context })
  }

  debug(message: string) {
    this.logger.setContext(this.context)
    this.logger.debug(message)
    this.winston.debug(message, { context: this.context })
  }

  verbose(message: string) {
    this.logger.setContext(this.context)
    this.logger.verbose(message)
    this.winston.verbose(message, { context: this.context })
  }

  customLog() {
    this.logger.setContext(this.context)
    this.logger.verbose('This is a test log')
    this.winston.info('This is a test log', { meta: this.context })
  }
}

@Module({
  providers: [MyLogger],
  exports: [MyLogger]
})
export class LoggerModule {}
