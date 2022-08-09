import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  public async getAllProducts(): Promise<any> {
    try {
      const res: Response = await fetch('http://localhost:8000/products');
      const data: Promise<any> = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
