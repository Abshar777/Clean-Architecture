import { Kafka, logLevel, Producer, Consumer, Partitioners } from "kafkajs";
import { IKafkaConfig } from "../types/interfaces/IKafka";
import { publishType, MessageHandler, MessageType, ProductEvent, TOPIC_TYPE } from "../types/subscription";
import { config } from "dotenv";
config()
// export default class KafkaConfig {
//   private kafka: Kafka;
//   private producer: Producer;
//   private consumer: Consumer;

//   constructor() {
//     this.kafka = new Kafka({
//       brokers: ["localhost:9092"],
//       logLevel: logLevel.ERROR,
//     });

//     this.producer = this.kafka.producer();
//     this.consumer = this.kafka.consumer({ groupId: "test" });
//   }

//   async connectProducer() {
//     await this.producer.connect();
//   }

//   async disconnectProducer() {
//     await this.producer.disconnect();
//   }

//   async produce(topic: string, messages: { key: string; value: string }[]) {
//     try {
//       await this.producer.send({
//         topic: topic,
//         messages: messages.map(msg => ({ key: msg.key, value: Buffer.from(msg.value) })),
//       });
//     } catch (error) {
//       console.error("Error producing message:", error);
//     }
//   }

//   async consume(topic: string, callback: (value: string) => void) {
//     try {
//       await this.consumer.connect();
//       await this.consumer.subscribe({ topic: topic });

//       await this.consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//           const value = message.value?.toString();
//           if (value) {
//             callback(value);
//           }
//         },
//       });
//     } catch (error) {
//       console.error("Error consuming message:", error);
//     }
//   }
// }
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || "product-service";
const KAFKA_BROKERS = [process.env.KAFKA_BROKER_1 || "localhost:9092"];
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || "";
const KAFKA_GROUP_ID = process.env.KAFKA_GROUP_ID || "";


const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: KAFKA_BROKERS,
  logLevel: logLevel.INFO,
});

let producer: Producer;
let consumer: Consumer;

const createTopic = async (topic: string[]) => {
  const topics = topic.map((e) => ({
    topic: e,
    numPartitions: 2,
    replicationFactor: 1, //based on available broker
  }));
  const admin = kafka.admin();
  await admin.connect();
  const topicExist = await admin.listTopics();
  for (const key of topics) {
    if (!topicExist.includes(key.topic)) {
      await admin.createTopics({
        topics: [key],
      });
    }
    await admin.disconnect();
  }
};

export const KafkaConfig2: IKafkaConfig = {
  // producer
  connectProducer: async function <T>(): Promise<T> {
    await createTopic(["OrderEvents"]);

    if(producer) return producer as unknown as T

    producer=kafka.producer({
      createPartitioner:Partitioners.DefaultPartitioner,
    })
    await producer.connect();
    return producer as unknown as T
  },
  disconnectProducer: async function (): Promise<void> {
    if(producer) return producer.disconnect()
  },
  publish: async function (data: publishType): Promise<boolean> {
    const producer=await this.connectProducer<Producer>();
    const result=await producer.send({
      topic:data.topic,
      messages:[{
        value:JSON.stringify(data.message),
        key:data.event,
        headers:data.headers
        
      }]
    })
    console.log(result)
    return !result
  },

  // consumer
  connectConsumer: async function <T>(): Promise<T> {
    if(consumer) return  consumer as unknown as T;
     consumer= kafka.consumer({
      groupId:KAFKA_GROUP_ID
    })
    await consumer.connect()
    return consumer as unknown as T;
  },
  disconnectConsumer: async function(): Promise<void> {
    if(consumer) await consumer.disconnect()
  },
  subscribe: async function (
    messageHandler: MessageHandler,
    topic: TOPIC_TYPE
  ): Promise<void> {
    const consumer=await this.connectConsumer<Consumer>();
    await consumer.subscribe({topic:topic,fromBeginning:true});
    await consumer.run({
      eachMessage:async({topic,partition,message})=>{
        if(message.key && message.value){
          const inputMessage:MessageType={
            headers:message.headers,
            event:message.key.toString() as ProductEvent,
            data:message.value?JSON.parse(message.value.toString()):null  
          }
          console.log(inputMessage,'input')
          await messageHandler(inputMessage);
          await consumer.commitOffsets([
            {topic,partition,offset:(Number(message.offset)+1).toString()}
          ])
        }
      }
    })
  },
};




