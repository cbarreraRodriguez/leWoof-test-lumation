import {Component, OnInit} from '@angular/core';
import {HttpWrapper} from "./utils/services/http-wrapper.service";
import set = Reflect.set;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'le-woof';
  breedList = [];
  currentBreed = {
    breedData: {name: null, value: null},
    currentImage: null
  };
  loadingBreedList: boolean = false;
  loadingRandomImage: boolean = false;
  jumpingButton: boolean = false;
  errorText: string = '';

  constructor(private http: HttpWrapper) {

  }

  ngOnInit(): void {
    this.loadAllBreeds();
  }

  updateBreedName() {
    this.currentBreed.breedData.name = this.breedList.filter((element: any) => element.value === this.currentBreed.breedData.value)[0].name;
    this.getRandomImage();
  }

  loadAllBreeds() {
    this.breedList = [];
    this.loadingBreedList = true;
    this.http.get('/api/breeds/list/all').toPromise()
      .then((success: any) => {
        Object.entries(success.message).forEach((item: any) => {
          const regionName = item[0];
          item[1].forEach((element: any) => {
            this.breedList.push({
              name: this.capitalize(element) + ' ' + this.capitalize(regionName),
              value: regionName + '-' + element
            });
          });
          if (item[1].length === 0) {
            this.breedList.push({
              name: this.capitalize(regionName),
              value: regionName
            });
          }
        });
        this.loadingBreedList = false;
      }).catch((error: any) => {
      this.loadingBreedList = true;
    });
  }

  capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  getRandomImage() {
    this.errorText = '';
    if (this.currentBreed.breedData.value) {
      this.loadingRandomImage = true;
      this.http.get('/api/breed/' + this.currentBreed.breedData.value + '/images/random').toPromise()
        .then((success: any) => {
          this.loadingRandomImage = false;
          this.currentBreed.currentImage = success.message;
        }).catch((error: any) => {
        this.loadingRandomImage = false;
        this.currentBreed.currentImage = null;
        this.errorText = error.error.message;
      });
    }
  }

  cleanData() {
    this.currentBreed = {
      breedData: {name: null, value: null},
      currentImage: null
    };
    this.jumpingButton = true;
    setTimeout(() => {
      this.jumpingButton = false;
    }, 2000);
  }
}
