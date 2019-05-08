import { log, SeqLogger } from "../.."

let logger = new SeqLogger("demo1", "test", "0.0.0")
logger.info("Hello {target}", "world")
log.debug("Using the one and only singleton logger")
