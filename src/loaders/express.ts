import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import routes from "../api";
import config from "../config";
import { NotFound } from "http-errors";
import uuid from "node-uuid";
import cls from "continuation-local-storage";
const myRequest = cls.createNamespace("my request");

export default ({ app }: { app: express.Application }) => {
  app.use(cors());

  app.use(express.json({}));

  // Assigning UUID for each request
  app.use((req, res, next) => {
    myRequest.run(() => {
      myRequest.set("transactionId", uuid.v1());
      next();
    });
  });

  // Load API routes
  app.use(config.api.prefix, routes());

  app.use(async (req, res, next) => {
    next(new NotFound());
  });

  app.use(((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      statusCode: err.status || 500,
      message: err.message,
    });
  }) as ErrorRequestHandler);
};
