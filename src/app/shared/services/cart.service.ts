import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor() { }

    addToCart(product: any) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    getCart() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    }

    removeFromCart(product: any) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart = cart.filter((item: any) => item.id !== product.id);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    clearCart() {
        localStorage.removeItem('cart');
    }
}
