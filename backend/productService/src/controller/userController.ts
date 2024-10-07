import { NextFunction, Request, Response } from "express";
import { KafkaConfig2 } from "../infrastructure/util/kafka";
import { ProductEvent } from "../infrastructure/types/subscription";

export default class UserController {
//   private kafka: KafkaConfig;

  constructor() {
   
    // this.kafka.connectProducer();
    // this.sendMessageToken = this.sendMessageToken.bind(this); // Connect producer during initialization
  }

  async sendMessageToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { msg } = req.body;
      await KafkaConfig2.publish({
        topic:"ProductEvent",
        headers:{token:req.headers.authorization||"annananan"},
        event:ProductEvent.CREATE_PRODUCT || "aannn",
        message:{
          proId:1,
        }
      })
      
    //   await this.kafka.produce("test", [{ key: 'aajaj', value: msg }]);
      res.status(200).send({ success: true });
    } catch (err) {
      console.error("Error in sendMessageToken:", (err as Error).message);
      next(err);
    }
  }
}
