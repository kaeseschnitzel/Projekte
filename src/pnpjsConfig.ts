import { WebPartContext } from "@microsoft/sp-webpart-base";
import { LogLevel, PnPLogging } from "@pnp/logging";
import { SPFI, SPFx, spfi } from "@pnp/sp";

import "@pnp/sp/webs"
import "@pnp/sp/lists"
import "@pnp/sp/items"
import "@pnp/sp/batching"

let _sp: SPFI;

export const getSP = (context?: WebPartContext): SPFI => {
    if (_sp === undefined && context != undefined) {
        _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning))
    }
    return _sp;
};