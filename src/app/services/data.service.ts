import { Injectable } from '@angular/core';
import { Http,Response, Headers, RequestOptions  } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

  constructor(public http:Http, public location:Location) { 
    
  }

  private errorHandler(error: Response) {
    return Observable.throw(error || 'something went wrong.')
   }

  getApartments(){
    return this.http.get(environment.apiEndpoint + 'apartments/')
    .map(res => res.json())
    .catch(this.errorHandler);
  }

  getApartment(id, token){
    return this.http.get(environment.apiEndpoint + 'apartment/edit/'+ id + '?token=' + token)
    .map(res => res.json())
    .catch(this.errorHandler);
  }

  saveApartment(apartment, token){
    let formData = new FormData();
    formData.append('email',apartment.email); 
    formData.append('street',apartment.street);
    formData.append('town',apartment.town); 
    formData.append('country',apartment.country); 
    formData.append('post_code',apartment.postCode);
    formData.append('move_in_date',apartment.moveInDate);
    

    if(!apartment.id){
      formData.append('edit_url',location.origin);
      return this.http.post(environment.apiEndpoint + 'apartment/create',formData)
      .map(res => res.json())
      .catch(this.errorHandler);
    } else {
      let headers = new Headers();
      return this.http.put(environment.apiEndpoint + 'apartment/edit/' + apartment.id + '?token=' + token,formData)
      .map(res => res.json())
      .catch(this.errorHandler);
    }
  }

  destroyApartment(apartment, token){
    return this.http.delete(environment.apiEndpoint + 'apartment/delete/' + apartment.id + '?token=' + token)
    .map(res => res.json())
    .catch(this.errorHandler);
  }
}
