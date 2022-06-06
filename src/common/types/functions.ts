import { Request, Response, NextFunction } from 'express';

export type CallbackFunction = () => void;
export type CallbackFunctionVariadic = (...args: any[]) => void;
