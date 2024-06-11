import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonItem, IonList, IonIcon } from '@ionic/angular/standalone';
import { CartService } from 'src/app/shared/services/cart.service';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle,IonButton,IonIcon, 
    IonLabel, IonItem, IonToolbar, IonList, 
    CommonModule, FormsModule, RouterModule]
})
export class CartPage implements OnInit {

  cartItems: any[] = [];

  constructor(private cartService: CartService) {
    addIcons({arrowBackOutline});
  }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
  }

  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

}
