import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouterLink,Router} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {ComplaintsService} from '../services/complaint.service';
import {Complaint} from './complaint';

@Component({
    selector: 'complaints',
    templateUrl: 'app/complaints/complaints.component.html',
    directives: [RouterLink,CORE_DIRECTIVES],
    providers: [Complaint, ComplaintsService, HTTP_PROVIDERS]
})
export class ComplaintsComponent {
    header = "Complaints page";
    isLoading = true;
    complaints: Complaint[];

    constructor(private _complaintsService: ComplaintsService, private _router: Router){
    }
    
    ngOnInit(){
        this._complaintsService.getComplaints("all")
            .subscribe(complaints => {
                this.isLoading = false;
                this.complaints = complaints;
            });
    }

    toggleShout(index: number){
        console.log(index);
        this.complaints[index].isShout = !this.complaints[index].isShout;
    }

    toggleListen(index: number){
        this.complaints[index].isListened = !this.complaints[index].isListened;
    }

}