import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Apartment } from './apartment';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss']
})

export class ApartmentComponent implements OnInit {
  apartment:any = {}
  private observerRef: any = {}
  selectedId:number
  rForm: FormGroup
  Alert:string = 'This field is required';
  token:string
  errorMessage:string = '';

  constructor(private route:ActivatedRoute, private dataService:DataService, private fb: FormBuilder) { 
    this.rForm = fb.group({
      'email' : [null, Validators.compose([Validators.required, Validators.email])],
      'move_in_date' : [null, Validators.required],
      'street' : [null, Validators.required],
      'town' : [null, Validators.required],
      'post_code' : [null, Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(5)])],
      'country' : [null, Validators.required]
    });
    this.observerRef = route.params.subscribe((parameters) => {
      this.selectedId = parameters['id'];
    });
    this.observerRef = route.queryParams.subscribe((queryparams) =>{
      this.token = queryparams['token'];
    });
  }

  ngOnInit() {
    this.dataService.getApartment(this.selectedId, this.token).subscribe((apartment) => {
      this.apartment = apartment
      let date = new Date(apartment.moveInDate);
      this.apartment.moveInDate = date.getFullYear()  + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
    },
    (error) => {
      if(error.status == "500"){
        this.errorMessage = "something has gone wrong"
      } else {
        this.errorMessage = error.statusText
      }
    });
  }

  editApartment(apartment){
    this.dataService.saveApartment(apartment, this.token).subscribe((response) => {
      this.apartment = response
    },
    (error) => {
      if(error.status == "500"){
        this.errorMessage = "something has gone wrong"
      } else {
        this.errorMessage = error.statusText
      }
    });
  }

  deleteApartment(apartment){
    this.dataService.destroyApartment(apartment, this.token).subscribe((response) => {
      this.apartment = response
    },
    (error) => {
      if(error.status == "500"){
        this.errorMessage = "something has gone wrong"
      } else {
        this.errorMessage = error.statusText
      }  
    });
  }

}
