import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
@Component({
  selector: 'product-config',
  templateUrl: './product-config.component.html',
  styleUrls: ['./product-config.component.less']
})
export class ProductConfigComponent implements OnInit {
  // formGroup: FormGroup
  constructor(private fb: FormBuilder) { 
    // this.formGroup = this.fb.group({
    //   configList: this.fb.array([])
    // })
    // this.configList.push( this.newConfig())
    // console.log(this.configList);
  }
  // get configList() {
  //   return this.formGroup.get('configList') as FormArray
  // }
  // getConfigvalueList(index: number) {
  //   return this.configList.at(index) as FormArray
  // }

  // newConfig() {
  //   return this.fb.group({
  //     name: ['', Validators.required],
  //     configvalueList: this.fb.array([]),
  //     isMulti: [false]
  //   })
  // }
  // newConfigvalue() {
  //   return this.fb.group({
  //     value: [''],
  //   })
  // }
  ngOnInit(): void {
  }

  // addConfig() {
  //   this.configList.controls.push(this.newConfig())
  // }
}
