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
        <input type="text" placeholder="Filter by city" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
   </section>
   <section class="results">
      @for (housingLocation of filteredLocationList; track housingLocation.id) {
            <app-housing-location [housingLocation]="housingLocation"></app-housing-location>
        } @empty {
          <p>No housing locations available.</p>
        }
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
   // declare property
    housingLocationList: HousingLocation []; //declaring property ref to the housing-location.ts an array of HousingLocation objects
    filteredLocationList:HousingLocation[];

    private housingService = inject(HousingService); // ref to housing.service.ts

    //The constructor is called automatically when an instance of the class is created
    constructor( ) {
      //initialize 
      this.housingLocationList = [];
      this.filteredLocationList =[];
      this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
    }

    filterResults(text: string){

      if (!text) {
        this.filteredLocationList = this.housingLocationList;
        return;
      }
      this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
      );
    }
}
