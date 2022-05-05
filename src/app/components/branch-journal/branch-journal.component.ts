import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepositSlipService } from 'src/app/services/deposit-slip.service';

@Component({
  selector: 'app-branch-journal',
  templateUrl: './branch-journal.component.html',
  styleUrls: ['./branch-journal.component.css']
})
export class BranchJournalComponent implements OnInit {

  isInvalid : boolean = false;
  errorMessage : string = ''
  isFormShow : boolean = false;
  btnSaveText : string = 'Save'
  depositSlips : any[] = []
  form : FormGroup

  constructor(private fb : FormBuilder, private depositSlipService : DepositSlipService) {
    this.form = fb.group({
      dateDeposited : ['', Validators.required],
      depositor : ['', Validators.required],
      amountDeposited : ['', Validators.required],
      bankName : ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.loadDepositSlips()
  }

  onToggle() : void {
    this.isFormShow = !this.isFormShow
  } 

  onSave() : void {
    this.isInvalid = false;

    if(this.form.valid){
      const data = JSON.stringify(this.form.value)
      const parsedData = JSON.parse(data)
      console.log(parsedData)
      this.save(data)
    }else{
      this.isInvalid = true;
      this.errorMessage = 'Invalid Input'
    }
  } 

  save(data : any) : void{
    this.btnSaveText = 'Saving...'
    this.depositSlipService.saveData(data)
      .subscribe((res) => {
        alert(res.message)
        this.btnSaveText = 'Save'
        this.loadDepositSlips()
      })
  }

  loadDepositSlips() : void {
    this.depositSlipService.getDepositSlips()
      .subscribe((data) => {
        this.depositSlips = data
        console.log(this.depositSlips)
      })
  }
}
