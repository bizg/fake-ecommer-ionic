import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonInput, IonText } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonText, IonInput, IonIcon, IonList, IonContent, IonItem, IonLabel, IonButton, IonHeader, IonToolbar, IonTitle,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  fakeData = {
    address: {
      city: 'kilcoole',
      street: '7835 new road',
      number: 3,
      zipcode: '12926-3874',
      geolocation: {
        lat: '-37.3159',
        long: '81.1496'
      }
    },
    phone: '1-570-236-7033'
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  register() {
    if (this.registerForm.valid) {
      const { email, username, password, firstname, lastname } = this.registerForm.value;
      const userData = {
        email: email,
        username: username,
        password: password,
        name: {
          firstname: firstname,
          lastname: lastname
        },
        ...this.fakeData
      };

      this.authService.register(userData).subscribe(
        (response: any) => {
          console.log('Registration successful', response);
          // Redirigir a la página de login o manejar el éxito del registro aquí
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Registration failed', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

}
