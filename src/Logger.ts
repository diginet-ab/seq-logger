export type LogLevel = "off" | "fatal" | "error" | "warning" | "information" | "debug" | "verbose"

export abstract class Logger {
    public static setLogSingleton(aLog: Logger) {
        if (!(log as IndirectLogger).logger) {
            (log as IndirectLogger).logger = aLog
        }
    }
    public abstract level(level: LogLevel): void
    public abstract fatal(arg: string | Error, ...properties: any[]): void
    public abstract error(arg: string | Error, ...properties: any[]): void
    public abstract warn(arg: string | Error, ...properties: any[]): void
    public abstract info(arg: string | Error, ...properties: any[]): void
    public abstract debug(arg: string | Error, ...properties: any[]): void
    public abstract verbose(arg: string | Error, ...properties: any[]): void
    public abstract createLogger(hostName: string, appName: string, version: string, level: LogLevel): Logger | undefined
}

// tslint:disable-next-line: max-classes-per-file
class IndirectLogger extends Logger {
    constructor(public logger: Logger | null) {
        super()
    }
    public level(level: LogLevel): void {
        if (this.logger) {
            this.logger.level(level)
        }
    }
    public fatal(arg: string | Error, ...properties: any[]): void {
        if (this.logger) {
            this.logger.fatal(arg as string, ...properties)
        }
    }
    public error(arg: string | Error, ...properties: any[]): void {
        if (this.logger) {
            this.logger.error(arg as string, ...properties)
        }
    }
    public warn(arg: string | Error, ...properties: any[]): void {
        if (this.logger) {
            this.logger.warn(arg as string, ...properties)
        }
    }
    public info(arg: string | Error, ...properties: any[]): void {
        if (this.logger) {
            this.logger.info(arg as string, ...properties)
        }
    }
    public debug(arg: string | Error, ...properties: any[]): void {
        if (this.logger) {
            this.logger.debug(arg as string, ...properties)
        }
    }
    public verbose(arg: string | Error, ...properties: any[]): void {
        if (this.logger) {
            this.logger.verbose(arg as string, ...properties)
        }
    }
    public createLogger(hostName: string, appName: string, version: string, level: LogLevel): Logger | undefined {
        return
    }
}

export let log: Logger = new IndirectLogger(null)

// tslint:disable-next-line: max-classes-per-file
export class RemoteLogger extends Logger {
    protected logger?: Logger
    constructor(protected hostName: string = "<host>", protected appName: string = "<app>", version: string = "<version>", level: LogLevel = "debug") {
        super()
        this.logger = log.createLogger(hostName, appName, version, level)
        Logger.setLogSingleton(this)
    }
    // tslint:disable-next-line: no-empty
    public level(level: LogLevel): void {
        if (this.logger) {
            this.logger.level(level)
        }
    }
    // tslint:disable-next-line: no-empty
    public fatal(arg: string | Error, ...properties: any[]): void {
        if (this.logger) {
            this.logger.fatal(arg as string, ...properties)
        }
    }
    // tslint:disable-next-line: no-empty
    public error(arg: string | Error, ...properties: any[]): void {
        if (this.logger) {
            this.logger.error(arg as string, ...properties)
        }
    }
    // tslint:disable-next-line: no-empty
    public warn(arg: string | Error, ...properties: any[]): void {
        if (this.logger) {
            this.logger.warn(arg as string, ...properties)
        }
    }
    // tslint:disable-next-line: no-empty
    public info(arg: string | Error, ...properties: any[]): void {
        if (this.logger) {
            this.logger.info(arg as string, ...properties)
        }
    }
    // tslint:disable-next-line: no-empty
    public debug(arg: string | Error, ...properties: any[]): void {
        if (this.logger) {
            this.logger.debug(arg as string, ...properties)
        }
    }
    // tslint:disable-next-line: no-empty
    public verbose(arg: string | Error, ...properties: any[]): void {
        if (this.logger) {
            this.logger.verbose(arg as string, ...properties)
        }
    }
    public createLogger(hostName: string, appName: string, version: string, level: LogLevel): Logger | undefined {
        return
    }
}
