import { ICart } from "../cart-model/cart";

export interface IPostOrder{
    hardwareStoreId : number;
    firstName : string;
    lastName : string;
    address : string;
    contactNo : string;
    email : string;
    deliver : boolean;
    products : ICart[]
}