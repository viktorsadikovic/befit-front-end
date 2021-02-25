import { mergeNsAndName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private service: DataService,
              private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),
      surname: new FormControl()
    })
   }


  ngOnInit(): void {
  }


  onSubmit() {
    let user = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      username: this.registerForm.value.email,
      role: null,
      profilePictureUrl: null,
      favoriteWorkoutPlans: null,
      favoriteMeals: null,
      likedComments: null
    }

    console.log(user)

    this.service.register(user).subscribe(data => {
      if(data.body.statusCode === 200) {
        console.log(data)
        this.router.navigate(['/login'])
      }

    })
  }

}
