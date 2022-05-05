import { ICart } from "../cart-model/cart";

export interface IPostOrder{
    hardwareStoreId : number;
    branchId : number;
    firstName : string;
    lastName : string;
    address : string;
    contactNo : string;
    email : string;
    deliver : boolean;
    products : ICart[];
    latitude : string;
    longtitude : string;
    // nbi : File;
    // barangayClearance : File;
    // governmentId : File;
    // bankStatement : File;
    // age : number;
    // birthDate : string;
}