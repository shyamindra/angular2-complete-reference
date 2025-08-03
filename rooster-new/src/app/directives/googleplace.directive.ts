import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

declare var google: any;

interface Place {
  formatted_address: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}

@Directive({
  selector: '[googleplace]',
  standalone: true
})
export class GoogleplaceDirective {
  @Output() setAddress: EventEmitter<Place> = new EventEmitter();

  constructor(private el: ElementRef) {
    const autocomplete = new google.maps.places.Autocomplete(this.el.nativeElement);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.setAddress.emit(place);
    });
  }
}