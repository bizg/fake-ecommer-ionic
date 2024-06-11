import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInfiniteScroll, IonInfiniteScrollContent, IonAvatar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {cart} from 'ionicons/icons';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonAvatar, 
    IonInfiniteScrollContent, 
    IonInfiniteScroll, 
    IonItem, IonList, IonContent, IonTitle, 
    IonToolbar, IonHeader, IonTabs, IonTabBar, 
    IonTabButton, IonIcon, IonLabel, IonButton,
    RouterModule, CommonModule,
  ],
})
export class TabsPage {
  products: any[] = [];
  page = 0;
  readonly perPage = 10;

  constructor(private productService: ProductService, private cartService: CartService, private alertController: AlertController) {
    addIcons({cart});
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(event?: any) {
    this.productService.getProducts().subscribe((res) => {
      this.products = [...this.products, ...res.slice(this.page * this.perPage, (this.page + 1) * this.perPage)];
      if (event) {
        event.target.complete();
      }
      this.page++;
    });
  }

  async addToCart(product: any) {
    this.cartService.addToCart(product);
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Product added to cart successfully!',
      buttons: ['OK']
    });
    await alert.present();
  }
}
