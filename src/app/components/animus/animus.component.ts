import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Apartment } from './apartments/apartment/apartment';

@Component({
  selector: 'app-animus',
  templateUrl: './animus.component.html',
  styleUrls: ['./animus.component.css']
})

export class AnimusComponent implements OnInit {
  apartments:Apartment[]
  addApartmentForm: boolean = false;
  apartment: any = {}
  rForm: FormGroup
  showMessage:boolean = false;
  Alert:string = 'This field is required';
  errorMessage:string

  constructor(private dataService:DataService, private fb: FormBuilder) { 
    this.rForm = fb.group({
      'email' : [null, Validators.compose([Validators.required, Validators.email])],
      'move_in_date' : [null, Validators.required],
      'street' : [null, Validators.required],
      'town' : [null, Validators.required],
      'post_code' : [null, Validators.compose([Validators.required, Validators.minLength(5),Validators.maxLength(5)])],
      'country' : [null, Validators.required]
    });
  }
  
  ngOnInit() {
    this.dataService.getApartments().subscribe((apartments) => {
      this.apartments = apartments
    },
    (error) => {
      if(error.status == "500"){
        this.errorMessage = "something has gone wrong"
      } else {
        this.errorMessage = error.statusText
      }    
    });
  }

  showAddApartmentForm(){
    this.addApartmentForm = !this.addApartmentForm;
    return
  }

  addApartment(apartment){
    this.dataService.saveApartment(apartment,'').subscribe((response) => {
      console.log(response);
      this.apartment = response
      this.apartments.push(this.apartment)
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