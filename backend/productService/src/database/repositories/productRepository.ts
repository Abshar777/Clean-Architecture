import { FilterQuery, Model, UpdateQuery } from "mongoose";
import IProductRepository from "../interface/IProductRepositryo";
import IProduct from "../interface/IProduct";
import prductModel from "../model/productModel";

export default class productRepository implements IProductRepository{
    private db:Model<IProduct>;
    constructor(){
        this.db=prductModel
    }
    async create(product: IProduct): Promise<IProduct> {
        return await this.db.create(product);
    }
    async read(condition:FilterQuery<IProduct>): Promise<IProduct | null> {
        return await this.db.findOne(condition)
    }
    async readAll(condition:FilterQuery<IProduct>,limit:number): Promise<IProduct[]> {
        return await this.db.find(condition).limit(limit)
    }
    async update(condition:FilterQuery<IProduct>, data: UpdateQuery<IProduct>): Promise<IProduct | null> {
        return await this.db.findOneAndUpdate(condition,data,{new:true})
    }
    async updateMany(condition: UpdateQuery<IProduct>,data:UpdateQuery<IProduct>): Promise<any> {
        return await this.db.updateMany(condition,data,{new:true})
    }
    async softDelete(condition:FilterQuery<IProduct>): Promise<void> {
        await this.db.findOneAndUpdate(condition,{isDeleat:true})
    }
}