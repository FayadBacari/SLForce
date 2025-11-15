import { Request, Response, NextFunction } from "express";
declare global {
    type Req = Request;
    type Res = Response;
    type Next = NextFunction;
    type Port = number | string | false;
    type ServerError = NodeJS.ErrnoException;
}
//# sourceMappingURL=type.d.ts.map