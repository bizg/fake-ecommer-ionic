import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInfiniteScroll, IonInfiniteScrollContent, IonAvatar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';
import { ProductService } from 'src/app/shared/services/product.service';

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
    IonTabButton, IonIcon, IonLabel,
    RouterModule, CommonModule
  ],
})
export class TabsPage {
  products: any[] = [];
  page = 0;
  readonly perPage = 10;

  constructor(private productService: ProductService) { }

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
}
