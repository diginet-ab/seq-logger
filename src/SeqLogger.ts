const fetch = require("node-fetch");
import * as structuredLog from "structured-log"
import seqSink from "structured-log-seq-sink"
import { DynamicLevelSwitch } from "structured-log/src/dynamicLevelSwitch"
import { Logger as StructuredLogger } from "structured-log/src/logger"
import { Logger, LogLevel } from "./Logger"
import uuidv4 from "uuid/v4"

export class SeqLogger extends Logger {
    protected seqLogger: StructuredLogger
    protected levelSwitch: DynamicLevelSwitch
    protected instanceId = uuidv4()
    constructor(protected hostName: string, protected appName: string, version: string, level: LogLevel = "debug", protected logUrl: string = "http://localhost:5341", protected apiKey: string = "PZL7HqC7ix64EPvqXGkO", skipStartLogging: boolean = false) {
        super()
        if (!(global as any).fetch)
            (global as any).fetch = fetch
        this.levelSwitch = new structuredLog.DynamicLevelSwitch()
        this.seqLogger = structuredLog
            .configure()
            .enrich({ hostName, appName, version, instance: this.instanceId })
            .writeTo(new structuredLog.ConsoleSink())
            .writeTo(
                seqSink({
                    apiKey: this.apiKey,
                    levelSwitch: this.levelSwitch,
                    url: logUrl,
                }),
            )
            .create()
        if (!skipStartLogging) {
            this.info("Started application \"{appName}\" version {version} on host \"{hostName}\"", appName, version, hostName)
            this.level(level)
        }
        SeqLogger.setLogSingleton(this)
    }

    public createLogger(hostName: string, appName: string, version: string, level: LogLevel = "debug"): Logger | undefined {
        return new SeqLogger(hostName, appName, version, level, this.logUrl)
    }
    public level(level: LogLevel) {
        const lev = level.toLowerCase()
        if (lev.indexOf("fat") >= 0) {
            this.levelSwitch.fatal()
        } else if (lev.indexOf("err") >= 0) {
            this.levelSwitch.error()
        } else if (lev.indexOf("war") >= 0) {
            this.levelSwitch.warning()
        } else if (lev.indexOf("inf") >= 0) {
            this.levelSwitch.information()
        } else if (lev.indexOf("deb") >= 0) {
            this.levelSwitch.debug()
        } else if (lev.indexOf("ver") >= 0) {
            this.levelSwitch.verbose()
        }
        this.info("Set log level for application \"{appName}\" on host \"{hostName}\" to {logLevel}", this.appName, this.hostName, level)
    }
    public fatal(arg: string | Error, ...properties: any[])  {
        this.seqLogger.fatal(arg as string, ...properties)
    }
    public error(arg: string | Error, ...properties: any[])  {
        this.seqLogger.error(arg as string, ...properties)
    }
    public warn(arg: string | Error, ...properties: any[])  {
        this.seqLogger.warn(arg as string, ...properties)
    }
    public info(arg: string | Error, ...properties: any[])  {
        this.seqLogger.info(arg as string, ...properties)
    }
    public debug(arg: string | Error, ...properties: any[]) {
        this.seqLogger.debug(arg as string, ...properties)
    }
    public verbose(arg: string | Error, ...properties: any[])  {
        this.seqLogger.verbose(arg as string, ...properties)
    }
}
