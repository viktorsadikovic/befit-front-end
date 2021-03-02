import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Meal } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.css']
})
export class EditMealComponent implements OnInit {

  constructor(private service: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  mealForm = new FormGroup({
    title : new FormControl('',[Validators.required]),
    mealTypes : new FormControl(null, Validators.required),
    dietaryType : new FormControl('VEGAN'),
    preparationTime : new FormControl('', Validators.required),
    cookingTime : new FormControl('', Validators.required),
    servings : new FormControl('', Validators.required),
    description : new FormControl('', Validators.required),
    ingredients : new FormControl('', Validators.required),
    preparation : new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    newImage: new FormControl()
  })

  selectedFile: File;
  meal: Meal;
  newImage;

  get title() { return this.mealForm.get('title'); }

  get mealTypes() { return this.mealForm.get('mealTypes'); }

  get dietaryType() { return this.mealForm.get('dietaryType'); }

  get preparationTime() { return this.mealForm.get('preparationTime'); }

  get cookingTime() { return this.mealForm.get('cookingTime'); }

  get servings() { return this.mealForm.get('servings'); }

  get description() { return this.mealForm.get('description'); }

  get ingredients() { return this.mealForm.get('ingredients'); }

  get preparation() { return this.mealForm.get('preparation'); }

  get price() { return this.mealForm.get('price')}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.service.getSingleMeal(+params['id']).subscribe(data => {
        this.meal = data
        this.initializeForm()
      })
    })
  }

  initializeForm() {
    let title = new FormControl(this.meal.title,[Validators.required])
    let mealTypes = new FormControl(this.meal.mealTypes, Validators.required)
    let dietaryType = new FormControl(this.meal.dietaryType)
    let preparationTime = new FormControl(this.meal.preparationTime, Validators.required)
    let cookingTime = new FormControl(this.meal.cookingTime, Validators.required)
    let servings = new FormControl(this.meal.servings, Validators.required)
    let description = new FormControl(this.meal.description, Validators.required)
    let ingredients = new FormControl(this.meal.ingredients, Validators.required)
    let preparation = new FormControl(this.meal.preparation, Validators.required)
    let image = new FormControl(this.meal.image, Validators.required)
    let price = new FormControl(this.meal.price, Validators.required)

    this.mealForm = new FormGroup({
      title : title,
      mealTypes : mealTypes,
      dietaryType : dietaryType,
      preparationTime : preparationTime,
      cookingTime : cookingTime,
      servings : servings,
      description : description,
      ingredients : ingredients,
      preparation : preparation,
      image : image,
      price : price
    })
  }

  cancel() {
    this.router.navigate(['/meals'])
  }

  onSubmit() {
    console.log(this.mealForm.value)

    const uploadImageData = new FormData();

    if(this.newImage) {
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      console.log("so nova slika")
      this.meal = {
        id: this.meal.id,
        title: this.mealForm.value.title,
        creator: this.meal.creator,
        mealTypes: this.mealForm.value.mealTypes,
        dietaryType: this.mealForm.value.dietaryType,
        preparationTime: this.mealForm.value.preparationTime,
        cookingTime : this.mealForm.value.cookingTime,
        servings : this.mealForm.value.servings,
        description : this.mealForm.value.description,
        ingredients : this.mealForm.value.ingredients,
        preparation : this.mealForm.value.preparation,
        submissionTime: this.meal.submissionTime,
        reviews : this.meal.reviews,
        image: this.meal.image,
        favoriteForUsers: this.meal.favoriteForUsers,
        price: this.meal.price
      }
    } else {
      console.log("bez nova slika")
      uploadImageData.append('imageFile', null, null);

      this.meal = {
        id: this.meal.id,
        title: this.mealForm.value.title,
        creator: this.meal.creator,
        mealTypes: this.mealForm.value.mealTypes,
        dietaryType: this.mealForm.value.dietaryType,
        preparationTime: this.mealForm.value.preparationTime,
        cookingTime : this.mealForm.value.cookingTime,
        servings : this.mealForm.value.servings,
        description : this.mealForm.value.description,
        ingredients : this.mealForm.value.ingredients,
        preparation : this.mealForm.value.preparation,
        submissionTime: this.meal.submissionTime,
        reviews : this.meal.reviews,
        image: this.meal.image,
        favoriteForUsers: this.meal.favoriteForUsers,
        price: this.meal.price
      }
    }

    console.log(this.meal)

    uploadImageData.append('meal', JSON.stringify(this.meal));

    console.log(this.meal)

    this.service.editMeal(uploadImageData);
    this.router.navigate(['/meals']);
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
 }

 addNewImage() {
   console.log(this.newImage)
 }
}
