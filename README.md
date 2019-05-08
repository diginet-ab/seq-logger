# Logging to a Seq log server

Logging to a Seq log server for both NodeJS and browser.

## Log level

The current log level determines how much detailed logging is sent to the server. Can be changed at any time using for example `log.level("debug")`. With "debug" log level all log items except "verbose" are sent to the log server.

Available log levels are:

​	`"off" | "fatal" | "error" | "warning" | "information" | "debug" | "verbose"`

## Logging

Create an instance of the SeqLogger class.

Use one of the SeqLogger methods to post a new log item to the server:

```typescript
fatal(arg: string | Error, ...properties: any[]): void
error(arg: string | Error, ...properties: any[]): void
warn(arg: string | Error, ...properties: any[]): void
info(arg: string | Error, ...properties: any[]): void
debug(arg: string | Error, ...properties: any[]): void
verbose(arg: string | Error, ...properties: any[]): void 
```

## Starting a Seq log server with Docker

Run a Seq instance with ephemeral storage and all services on port 5341:

`docker run -e ACCEPT_EULA=Y -p 5341:80 datalust/seq:latest`

## NodeJS and web browser application example

```typescript
import { log, SeqLogger } from "@diginet/seq-logger"

let logger = new SeqLogger("demo1", "test", "0.0.0", "debug", "http://localhost:5341")
logger.info("Hello {target}", "world")
log.debug("Using the one and only singleton logger")
```

## Logging from multiple hosts and applications

Log posts always include a host name, application name and an auto-generated instance GUID.

## Security

The Seq log server can be configured to accept log posts only when the log client includes an API key in the log request.

Generate an API key in the Seq server web interface and add as an additional argument when creating the SeqLogger instance.

## Supress default startup logging

The SeqLogger automatically logs default information at when the logger is created. Suppress this by adding a `false` argument after the API key.

