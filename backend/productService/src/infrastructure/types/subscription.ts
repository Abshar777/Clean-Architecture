export enum ProductEvent {
  CREATE_PRODUCT = "create_product",
  DELETE_PRODUCT = "cancel_product",
}

export type TOPIC_TYPE="ProductEvent" | "CartEvent" | "OrderEvent"


export type MessageType={
    headers?:Record<string,any>;
    event:ProductEvent;
    data:Record<string,any>;
}

export type publishType={
    headers:Record<string,any>
    topic:TOPIC_TYPE,
    event:ProductEvent,
    message:Record<string,any>
  
}
export type MessageHandler=(input:MessageType)=>void