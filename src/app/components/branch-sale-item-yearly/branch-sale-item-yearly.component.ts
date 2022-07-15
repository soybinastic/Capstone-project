import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { onErrorResumeNext } from 'rxjs';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-branch-sale-item-yearly',
  templateUrl: './branch-sale-item-yearly.component.html',
  styleUrls: ['./branch-sale-item-yearly.component.css']
})
export class BranchSaleItemYearlyComponent implements OnInit {

  @Input() date : Date
  @Input() saleItems : any[] = []
  @Input() isInput : boolean = false;

  @Input() message : string = 'Loading...'

  @Input() source : any[] = []
  constructor(private saleService : SaleService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    if(!this.isInput){
      this.route.queryParamMap.subscribe((param : any) => {
        const date = new Date(param.params.date);
        this.date = date;
        this.saleService.getSaleItem(date.toDateString(), 'yearly')
          .subscribe((data) => {
            this.saleItems = data;
            console.log(this.saleItems)
            if(this.saleItems.length == 0){
              this.message = 'No data found!'
            }
          })
      })
    }
    console.log('Source')
    console.log(this.source)
    console.log(this.saleItems)
  }
  download(id : number, orderRefNo : string) {
    // this.saleService.download(id, orderRefNo)
    //   .subscribe((data) => {
    //     console.log(data)
    //   }, (err) => {
    //     console.log(err)
    //     alert("Something went wrong!.");
    //   })
    this.saleService.dowloadOr(id, orderRefNo);
  }
  onSearch(event : any) : void {
    const value : string = event.target.value.toString()

    this.saleItems = this.source.filter((val) => {
      return val.or.toString().includes(value)
    })

    if(this.saleItems.length == 0){
      this.message = 'No Data Found'
    }
    if(value.length == 0){
      this.saleItems = this.source
    }

  }

}
