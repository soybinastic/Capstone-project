export class BestSellingReportModel{
    bestSellingDate : Date;
    bestSellingProducts : any[];

    constructor(date : Date, products : any[]){
        this.bestSellingDate = date
        this.bestSellingProducts = products
    }
}