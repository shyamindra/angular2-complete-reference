import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {HttpClient} from '../shared/http.client';
import {Complaint} from '../complaints/complaint';

@Injectable()
export class ComplaintsService {
    private _url = "http://52.37.61.173:8000/api/v1/complaints/complaint";
    
    constructor(private _http: HttpClient, private _complaint: Complaint){
    }
    
    getComplaints(id: string) {
        return this._http.get(this._url+"/"+id)
            .map(res => res.json());
    }

    postComplaints() {
        return this._http.post(this._url, JSON.stringify(this._complaint))
            .map(res => res.json());
    }
    
}