import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IHardwareStore } from '../models/hardware-store-models/hardwarestore';
import { IOrder } from '../models/order-models/order';
import { IOrderNotifNumber } from '../models/order-models/ordernotificationnumber';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private _hubConnection : HubConnection
  constructor() { } 

  public createConnection(){
    this._hubConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:44367/hardwarestorehub")
    .build() 

    this._hubConnection.start()
    .then(()=> console.log('Connected successfully.'))
    .catch(()=> console.log('Connection failed.'))
  } 
  public hubConnectionInstance() : HubConnection{
    return this._hubConnection;
  } 

  public modifiedOrderToAdmin(orders: IOrder[]){
    
    this._hubConnection.on("RecieveUpdateOrderToAdmin", (data : any = {})=>{
      // console.log('orders - '+orders)
      //const obj = {orderId: data.id, isCustomerOrderRecieved: data.isCustomerOrderRecieved}
      if(orders.length > 0){
        const index = orders.findIndex(o => o.orderId == data.id)
        if(orders[index].hardwareStoreId == data.hardwareStoreId){
          orders[index].isCustomerOrderRecieved = data.isCustomerOrderRecieved
          console.log(orders)
          //alert(data.customerName+"'s order is already recieve.");
        }
      }
    })
  } 
  public hardwareStoreStatus(hardwareStores: IHardwareStore[]){
    this._hubConnection.on('RecieveStoreStatus', (data)=>{

      const index = hardwareStores.findIndex(h => h.hardwareStoreId == data.id)
      hardwareStores[index].isOpen = data.isOpen
      console.log(hardwareStores)
    })
  } 
  public recieveOrders(orders : IOrder[], hardwareStoreId : number){
    this._hubConnection.on('RecieveOrder', (data)=>{
      if(hardwareStoreId == Number(data.hardwareStoreId)){
        const order : IOrder = {
          orderId : Number(data.id),
          hardwareStoreId : Number(data.hardwareStoreId),
          customerId : Number(data.customerId),
          customerName : data.customerName,
          isCustomerOrderRecieved : data.isCustomerOrderRecieved,
          orderDate : new Date(data.orderDate),
          total : data.total,
          deliver : data.deliver
        }
        orders.push(order)
        this.desc(orders,0)
        console.log(orders)
      }
    })
  }
  public recieveOrderNotif(orderNotif : IOrderNotifNumber){
    this._hubConnection.on('RecieveOrderNotif', (data)=>{
      if(Number(data.hardwareStoreId) == orderNotif.hardwareStoreId){
        orderNotif.numberOfOrderNotif = Number(data.numberOfOrder)
        console.log(orderNotif)
      }
    })
  } 
  private desc(orders:IOrder[], index : number){
    if(index == orders.length-1){
      return
    } 
    this.desc(orders,index+1)
    if(orders[index].orderId < orders[index+1].orderId){
      let temp = orders[index]
      orders[index] = orders[index+1]
      orders[index+1] = temp
    }
    this.desc(orders,index+1)
  }
}
