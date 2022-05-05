import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-branch-sales',
  templateUrl: './branch-sales.component.html',
  styleUrls: ['./branch-sales.component.css']
})
export class BranchSalesComponent implements OnInit {

  saleItems : any[] = []
  allMonthSales : any = {}
  allMonthSalesDate : Date = new Date()
  allMonthSaleButtonIsShow : boolean = false
  message : string = "Loading..."
  salesDate : Date = new Date()
  saleBtnIsShow : boolean = false
  filterBy : string = 'daily'
  totalSale : number = 0
  saveBtnText : string = 'Save as Report'
  constructor(private saleService : SaleService) { }

  ngOnInit(): void {
    const defaultYear = document.getElementById('allMonthSale') as HTMLInputElement
    defaultYear.defaultValue = this.allMonthSalesDate.getMonth().toLocaleString()
    this.loadAllMonthSales()
    this.loadSales()
    this.loadSaleItems()
  }

  loadAllMonthSales() : void {
    this.saleService.getMonthlySales(this.allMonthSalesDate.getFullYear())
      .subscribe((data) => {
        this.allMonthSales = data
      })
  }
  loadSales() : void {
    this.saleService.getSales(this.salesDate.toDateString(), this.filterBy)
      .subscribe((data) => {
        console.log(data)
        this.totalSale = Number(data)
      })
  }
  loadSaleProducts() : void {
    this.saleService.getBestSellingProducts(this.salesDate.toDateString(), this.filterBy)
      .subscribe((data) => {
        console.log('Best Selling Products')
        console.log(data)
      })
  }
  setDate(event : any) : void {
    const value = new Date(event.target.value);
    console.log(value)
    this.allMonthSaleButtonIsShow = true
    this.allMonthSalesDate = value
  }
  selectedFilter(event : any) : void {
    const value = event.target.value.toString();
    this.filterBy = value
    this.saleBtnIsShow = true;
  }
  setSaleDate(event : any) : void {
    const value = new Date(event.target.value);
    console.log(value)
    this.saleBtnIsShow = true
    this.salesDate = value
  } 

  addReport() : void {
    const data : any = {
      saleType : this.filterBy,
      dateSale : this.salesDate,
      totalSale : this.totalSale
    }
    console.log(data)
    this.onAddSaleReport(data)
  }
  onAddSaleReport(data : any) : void {
    this.saveBtnText = 'Saving...'
    this.saleService.addSaleReport(data)
      .subscribe((res) => {
        alert(res.message)
        this.saveBtnText = 'Save as Report'
      }, (err) => {
        alert('Something went wrong')
        this.saveBtnText = 'Save as Report'
      })
  }
  loadSaleItems() : void {
    this.saleService.getSaleItem(this.allMonthSalesDate.toDateString(), 'yearly')
      .subscribe((data) => {
        this.saleItems = data
        console.log(this.saleItems)
        if(this.saleItems.length == 0){
          this.message = 'No Data Found!'
        }
      })
  }
  onClickSaleDate() : void {
    this.saleBtnIsShow = false
    this.loadSales()
    this.loadSaleProducts()
  }
  onSetYear() : void {
    this.allMonthSaleButtonIsShow = false
    this.loadAllMonthSales();
    this.loadSaleItems();
  }
}
