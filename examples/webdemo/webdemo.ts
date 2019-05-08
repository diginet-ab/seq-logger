import { log, SeqLogger } from "../../index-web"

let logger = new SeqLogger("my computer", "my app", "1.2.3")
let n = 0
setInterval(() => {
    log.info("Hello from web {n}", n++)
}, 1000)
