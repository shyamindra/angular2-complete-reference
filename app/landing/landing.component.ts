import {Component} from '@angular/core';


@Component({
    selector: 'landing',
    templateUrl: 'app/landing/landing.component.html',
})
export class LandingComponent {
    header = "Landing Page";
    isLanding = true;

    ngOnInit(){
    }
}