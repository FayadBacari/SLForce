import { Request, Response, NextFunction } from "express";

// part of type in Index.ts 
declare global {
  type Req = Request;
  type Res = Response;
  type Next = NextFunction;

  // types of server.ts
  type Port = number | string | false;
  type ServerError = NodeJS.ErrnoException;
}