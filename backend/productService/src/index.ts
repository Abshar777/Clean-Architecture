import "reflect-metadata";
import express from "express";
import { config } from "dotenv";
import produtRouter from "./infrastructure/routes/productRouter";
import dbConnect from "./database/dbConnect";
import {
  errorHandler,
  notFound,
} from "./infrastructure/middleware/errorMiddilware";
import { KafkaConfig2 } from "./infrastructure/util/kafka";
import { Consumer, Producer } from "kafkajs";

export const ExpressApp = async () => {
  config();
   dbConnect();
  const app = express();
  const port = process.env.PORT || 3001;
  const apiRoot = process.env.API_ROOT || "/api";

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(apiRoot, produtRouter);
  app.use(notFound);
  app.use(errorHandler);
  const producer = await KafkaConfig2.connectProducer<Producer>();
  producer.on("producer.connect", () => {
    console.log("producer connected");
  });

  const consumer = await KafkaConfig2.connectConsumer<Consumer>();
  consumer.on("consumer.connect", () => {
    console.log("consumer connected");
  });

  await KafkaConfig2.subscribe((meassge)=>{
    console.log("Recive Message",meassge)
  },'OrderEvent');

  app.listen(port, () => {
    console.log("user service running on " + port);
  });
};


ExpressApp()



