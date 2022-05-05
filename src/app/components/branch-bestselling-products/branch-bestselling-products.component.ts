import { Component, OnInit } from '@angular/core';
import { BestSellingReportModel } from 'src/app/models/bestsellingmodels/bestSellingReport';
import { SaleService } from 'src/app/services/sale.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-branch-bestselling-products',
  templateUrl: './branch-bestselling-products.component.html',
  styleUrls: ['./branch-bestselling-products.component.css']
})
export class BranchBestsellingProductsComponent implements OnInit {

  filterBy : string = 'daily'
  date : Date = new Date()
  bestSellingProducts : any[] = []
  isBtnShow : boolean;
  message : string = 'Loading...'
  bestSellingReports : BestSellingReportModel[] = []
  warehouses : any[] = []
  warehouseId : number = 0
  sendReportBtn : string = 'Send Report'
  constructor(private saleService : SaleService, private warehouseService : WarehouseService) { }

  ngOnInit(): void {
    console.log(this.date.toDateString())
    this.loadBestSellingProducts()
    this.loadWarehouses()
  }
  selectedWarehouse(event : any) {
    const value = Number(event.target.value);
    this.warehouseId = value
  }
  loadWarehouses() : void {
    this.warehouseService.getWarehouses()
      .subscribe((data) => {
        this.warehouses = data;
        console.log(this.warehouses)
      })
  }
  loadBestSellingProducts() : void {
    this.saleService.getBestSellingProducts(this.date.toDateString(), this.filterBy)
      .subscribe((data) => {
        this.bestSellingProducts = data
        if(this.bestSellingProducts.length < 1){
          this.message = 'No data found.'
        }
        console.log(this.bestSellingProducts)
      })
  }
  selectedFilter(event : any) : void{
    this.isBtnShow = true
    const value = event.target.value.toString();
    this.filterBy = value;
  }
  setDate(event : any) : void {
    this.isBtnShow = true
    this.date = new Date(event.target.value)
    console.log(this.date.toDateString())
  } 

  confirm() : void {
    this.isBtnShow = false
    this.bestSellingProducts = []
    this.message = 'Retrieving data...'
    this.loadBestSellingProducts()
  }
  onAddReport() : void {
    if(this.warehouseId > 0){
      const data : any = {
        warehouseId : this.warehouseId,
        bestSellingType : this.filterBy,
        bestSellingDetails : this.bestSellingReports
      } 
      console.log(data)
      this.onAdd(data)
    }else{
      alert('Please choose warehouse')
    }
  }
  onAdd(data : any) : void {
    this.sendReportBtn = 'Sending...'
    this.saleService.addReport(data)
      .subscribe((res) => {
        alert(res.message)
        this.sendReportBtn = 'Send Report'
        this.bestSellingReports = []
      },(err) => {
        alert('Something went wrong')
        this.sendReportBtn = 'Send Report'
      })
  }
  addAsReport() : void {
    if(this.bestSellingProducts.length > 0){
      const bestSellingReport = new BestSellingReportModel(this.date, this.bestSellingProducts);
      this.bestSellingReports.push(bestSellingReport)
      // this.bestSellingReports.push(bestSellingReport);
      console.log(this.bestSellingReports)
    }
  }
}
