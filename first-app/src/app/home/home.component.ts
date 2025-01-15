import { Component , inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  template: `
   <section>
      <form>
        <input type="text" placeholder="Filter by city" />
        <button class="primary" type="button">Search</button>
      </form>
   </section>
   <section class="results">
      @for (housingLocation of housingLocationList; track housingLocation.id) {
            <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
        } @empty {
          <p>No housing locations available.</p>
        }
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
       //create new object based on interface 
    housingLocationList: HousingLocation [];
    private housingService = inject(HousingService);


    constructor( ) {
      this.housingLocationList = this.housingService.getAllHousingLocations();
    }
}
