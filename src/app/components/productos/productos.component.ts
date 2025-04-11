import { Component } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { TotalumApiService } from 'src/app/services/totalum-api.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent {
  tableName: string = 'producto';
  focusedInput: boolean = false;
  productos: Producto[] = [];
  page: number = 0;
  searchOrdersQuery: string = '';
  totalPages: number = 0;

  constructor(private totalum: TotalumApiService) {}

  focusSearch() {
    this.focusedInput = true;
  }

  unfocusSearch() {
    this.focusedInput = false;
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  searchProducts() {
    let totalOrders = 0;
    const searchInput = document.getElementById('search-bar-orders');
    fromEvent(searchInput!, 'keyup')
      .pipe(debounceTime(800))
      .subscribe(() => {
        this.page = 0;
        this.totalum
          .getTotalSearchProducts(this.tableName, this.searchOrdersQuery)
          .then((orders) => {
            totalOrders = orders.data['data'].length;
            this.totalPages = Math.ceil(totalOrders / 5);
            this.totalum
              .searchProducts(this.tableName, this.searchOrdersQuery)
              .then((res) => {
                this.productos = <Producto[]>res.data['data'];
              });
          });
      });
  }

  setTotalPagesAllProducts() {
    this.totalum.getTotalItems(this.tableName).then((res) => {
      let totalOrders = res.data['data'].length;
      this.totalPages = Math.ceil(totalOrders / 5);
    });
  }

  getProducts(page: number) {
    this.totalum.getItems(page, this.tableName).then((res) => {
      this.productos = <Producto[]>res.data['data'];
      console.log(res.data['data']);
    });
  }

  previousPage() {
    this.page -= 1;
    this.getProducts(this.page);
  }

  nextPage() {
    this.page += 1;
    this.getProducts(this.page);
  }

  ngOnInit(): void {
    this.getProducts(this.page);
    this.setTotalPagesAllProducts();
  }
}
