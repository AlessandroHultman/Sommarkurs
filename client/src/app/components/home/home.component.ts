import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Product[] = [];

  constructor(private productService: ProductService) {
    this.getAllProducts();
  }

  ngOnInit(): void {
  }

  public async getAllProducts(): Promise<any> {
    const data = await this.productService.getAllProducts();
    this.products = data.products;
  }
}
