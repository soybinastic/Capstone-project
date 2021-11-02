export interface IOrder{
    orderId:number;
    hardwareStoreId:number;
    customerId:number;
    customerName:string;
    orderDate:Date;
    total:number;
    deliver: boolean;
    isCustomerOrderRecieved: boolean
}