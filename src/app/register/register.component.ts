import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../shared/service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  passwordMatch = true;

  constructor(private service: DataService,
              private router: Router) {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}')]),
      name: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', Validators.required),
      surname: new FormControl('', [Validators.required])
    })
   }

   get name() { return this.registerForm.get('name'); }

   get surname() { return this.registerForm.get('surname'); }

   get email() { return this.registerForm.get('email'); }

   get password() { return this.registerForm.get('password'); }

   get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  ngOnInit(): void {
  }


  onSubmit() {
    if(this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      this.passwordMatch = true;
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

      this.service.register(user).subscribe(data => {
        if(data.body.statusCode === 200) {
          this.router.navigate(['/login'])
        }
      })
    } else {
      this.passwordMatch = false;
    }
  }

  checkPasswords() {
    return true;
  }

}
