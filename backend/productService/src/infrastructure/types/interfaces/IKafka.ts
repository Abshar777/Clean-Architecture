import { MessageHandler, MessageType, ProductEvent, publishType, TOPIC_TYPE } from "../subscription";


export interface IKafkaConfig {
  // producer
  connectProducer: <T>() => Promise<T>;
  disconnectProducer: () => Promise<void>;
  publish: (data: publishType) => Promise<boolean>;

  // consumer
  connectConsumer: <T>() => Promise<T>;
  disconnectConsumer: () => Promise<void>;
  subscribe: (messageHandler: MessageHandler, topic: TOPIC_TYPE) => Promise<void>;
}

