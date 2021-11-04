import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/models/category-models/category';
import { ICreateCategory } from 'src/app/models/category-models/createcategory';
import { IHardwareStore } from 'src/app/models/hardware-store-models/hardwarestore';
import { IOrder } from 'src/app/models/order-models/order';
import { IOrderDetails } from 'src/app/models/order-models/orderdetails';
import { IOrderNotifNumber } from 'src/app/models/order-models/ordernotificationnumber';
import { IOrderProduct } from 'src/app/models/order-models/orderproducts';
import { IUpdateOrder } from 'src/app/models/order-models/updateorder';
import { IAddProduct } from 'src/app/models/product-models/addproduct';
import { IProduct } from 'src/app/models/product-models/products';
import { IUpdateProduct } from 'src/app/models/product-models/updateproduct';
import { IAddTrasportAgent } from 'src/app/models/transport-agent/addtransportagent';
import { CategoryService } from 'src/app/services/category.service';
import { HardwareStoreService } from 'src/app/services/hardware-store.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { TransportagentService } from 'src/app/services/transportagent.service';

@Component({
  selector: 'app-main-store-admin',
  templateUrl: './main-store-admin.component.html',
  styleUrls: ['./main-store-admin.component.css']
})
export class MainStoreAdminComponent implements OnInit { 
  hardwareStore : IHardwareStore
  
  selectedMenu: string = 'default';
  categoryName : string
  categoryId : number;
  isClickedCategory : boolean
  detailToggle: boolean
  viewProductsToggle: boolean
  modifiedToggle: boolean 
  addCategToggle : boolean; 
  addProductToggle : boolean
  updateProductToggle : boolean
  addTransportAgtToggle : boolean
  deleteToggle: boolean

  orders: IOrder[] = []
  orderDetail : IOrderDetails 
  order: IOrder
  orderProducts: IOrderProduct[] = []
  categories: ICategory[] = [] 
  products : IProduct[] = []
  getProductToUpdate : IUpdateProduct
  orderNotif : IOrderNotifNumber
  total: number; 
  isCustomerOrderRecieved : boolean
  productId : number 

  dateTime : Date = new Date 
  transportAgentValidate : boolean = true 
  transportAgentMessage : string 
  transportAgentBtnText : string;
  constructor(private hardwareStoreService : HardwareStoreService ,private orderService: OrderService, private categoryService : CategoryService,private signalRService: SignalrService, private productService : ProductService, private transportAgentService : TransportagentService) { }

  ngOnInit(): void { 
    this.signalRService.createConnection(); 

    this.hardwareStoreService.getHardwareStoreInfo()
    .subscribe((data) => {
        this.hardwareStore = data 
        this.categoryService.getCategories(this.hardwareStore.hardwareStoreId)
        .subscribe((categs) => {
          this.categories = categs
          console.log(this.categories)
        }) 
        
      })

    this.orderService.getAllOrders()
    .subscribe((data)=>{
      this.orders = data
      this.signalRService.modifiedOrderToAdmin(this.orders)
      this.signalRService.recieveOrders(this.orders, this.hardwareStore.hardwareStoreId)
      this.desc(this.orders,0)
      console.log(this.orders)
      console.log('Hardware store info: '+this.hardwareStore.hardwareStoreId)
    }) 
    this.orderService.getOrderNotifNumber()
    .subscribe((data)=>{
      this.orderNotif = data
      this.signalRService.recieveOrderNotif(this.orderNotif)
    })   
  }
  private desc(orders : IOrder[], index : number){
    if(index == orders.length-1){
      return
    } 
    this.desc(orders, index+1)
    if(orders[index].orderId < orders[index+1].orderId){
      let temp = orders[index]
      orders[index] = orders[index+1]
      orders[index+1] = temp
    }
    this.desc(orders, index+1)
  }
  selected(val:string){
    this.selectedMenu = val
    this.detailToggle = false
    this.modifiedToggle = false
    this.viewProductsToggle = false
    this.addCategToggle = false
    this.addProductToggle = false;
    this.updateProductToggle = false 
    this.addTransportAgtToggle = false;
    if(this.selectedMenu == 'orders'){
      this.orderNotif.numberOfOrderNotif = 0
      this.orderService.getAllOrders().subscribe()
    }
  } 
  detailClick(orderId: number){ 
    this.detailToggle = true;
    this.selectedMenu = '' 
    this.orderService.getOrderDetails(orderId)
    .subscribe((data)=>{
      this.orderDetail = data;
    })
  } 

  getTotal(total: number){
    this.total = total;
  }
  back(){
    this.detailToggle = false;
    this.viewProductsToggle = false
    this.modifiedToggle = false
    this.selectedMenu = 'orders'
  } 
  viewProductsClick(orderId:number){
    this.selectedMenu = ''
    this.viewProductsToggle = true;
    this.orderService.getOrderProducts(orderId)
    .subscribe((data)=>{
      this.orderProducts = data
    })
  } 
  modifiedClick(order: IOrder){
    this.selectedMenu = ''
    this.modifiedToggle = true 
    this.isCustomerOrderRecieved = order.isCustomerOrderRecieved
    this.orderService.getOrderDetails(order.orderId)
    .subscribe((data)=>{
      this.orderDetail = data;
    }) 
  } 

  modified(orderUpdate: IUpdateOrder){
    this.orderService.updateOrder(orderUpdate.orderId,orderUpdate)
    .subscribe((res)=>{
      if(res.success == 1){
        alert(res.message) 
        const index = this.orders.findIndex((o => 
          o.orderId == orderUpdate.orderId)) 
          this.orders[index].isCustomerOrderRecieved = orderUpdate.isCustomerOrderRecieved
      }
    },(err)=>{
      alert(err.errors)
    })
  } 

  addCateg(){
    this.selectedMenu = ''
    this.addCategToggle = true;
  } 
  addCategoryClick(addCateg : ICreateCategory){
    this.categoryService.createCategory(addCateg)
    .subscribe((res)=> {
      if(res.success == 1){
        alert(res.message)
        const category : ICategory = {
          categoryName : addCateg.categoryName,
          categoryId: 0,
          hardwareStoreId : 0
        }
        this.categories.push(category);
      }
    })
  } 

  selectedCategory(category : ICategory){
    alert(category.categoryName + ' - ' + category.categoryId)  
    this.categoryName = category.categoryName
    this.categoryId = category.categoryId
    this.isClickedCategory = true
    this.productService.getProductsByCategory(category.hardwareStoreId,category.categoryId)
    .subscribe((data)=>{
      this.products = data
      console.log(this.products)
    })

  } 

  addProduct(){
    this.addProductToggle = true;
    this.selectedMenu = ''
  } 

  addProductClick(addProduct: IAddProduct){
    addProduct.categoryId = Number(addProduct.categoryId)
    addProduct.price = Number(addProduct.price)
    addProduct.stockNumber = Number(addProduct.stockNumber)

    this.productService.addProduct(addProduct)
    .subscribe((res)=>{
      if(res.success == 1){
        alert(res.message) 
        const product : IProduct = {
          name: addProduct.name,
          price: addProduct.price,
          description: addProduct.description,
          brand: addProduct.brand,
          quality: addProduct.quality,
          stockNumber: addProduct.stockNumber,
          categoryId: addProduct.categoryId,
          hardwareStoreId : 0,
          productId:0,
          isAvailable: addProduct.stockNumber > 0 ? true : false
        } 
        if(this.isClickedCategory && this.categoryId == addProduct.categoryId){
          this.products.push(product)
        }
      }
    },(err)=>{
      console.log(err)
    })
    console.log(addProduct)
  }

  update(product : IProduct){
    this.updateProductToggle = true
    this.selectedMenu = ''
    this.productService.getProductToUpdate(product.hardwareStoreId,product.productId)
    .subscribe((data)=> {
      this.getProductToUpdate = data
      console.log(this.getProductToUpdate)
    })
  }

  updateClick(updatedProduct: IUpdateProduct){
    this.productService.updateProduct(updatedProduct.productId,updatedProduct)
    .subscribe((res)=> {
      if(res.success == 1){
        alert(res.message) 
        const index = this.products.findIndex(p => p.productId == updatedProduct.productId)
        this.products[index].name = updatedProduct.name;
        this.products[index].price = updatedProduct.price;
        this.products[index].description = updatedProduct.description;
        this.products[index].brand = updatedProduct.brand;
        this.products[index].quality = updatedProduct.quality
        this.products[index].stockNumber = updatedProduct.stockNumber
      }
    },(err)=>{ console.log(err)})
  }

  delete(product: IProduct){
    alert(product.productId)
    this.productId = product.productId
    this.deleteToggle = true
    this.selectedMenu = ''
  }
  cancelDelete(){
    this.deleteToggle = false
    this.selectedMenu = 'products'
    alert('Cancel Delete')
  }
  onDelete(productId: number){
    this.productService.deleteProduct(productId)
    .subscribe((res)=>{
      if(res.success == 1){
        alert(res.message)
        this.products = this.products.filter(p => p.productId !== productId)
        this.deleteToggle = false
        this.selectedMenu = 'products'
      }
    })
  } 
  transpAgentToggle(){ 
    this.selectedMenu = ''
    this.addTransportAgtToggle = !this.addTransportAgtToggle;
  } 
  addTransportAgent(transportAgent : IAddTrasportAgent){
    this.transportAgentBtnText = 'Processing...'
    this.transportAgentMessage = ''
    this.transportAgentValidate = true
    this.transportAgentService.addTransportAgent(transportAgent)
    .subscribe((res)=> {
      if(res.success == 1){
          this.transportAgentValidate = true 
          this.transportAgentBtnText = 'Register'
          alert(res.message);
      } 
      console.log(res)
    },(err)=>{
      this.transportAgentValidate = false;
      this.transportAgentBtnText = 'Register'
      this.transportAgentMessage = err.error.message.toString();
    })
  }
}
