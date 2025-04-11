import { Component } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';
import { TotalumApiService } from 'src/app/services/totalum-api.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent {
  tableName: string = 'pedido';
  focusedInput: boolean = false;
  pedidos: Pedido[] = [];
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

  searchOrders() {
    let totalOrders = 0;
    const searchInput = document.getElementById('search-bar-orders');
    fromEvent(searchInput!, 'keyup')
      .pipe(debounceTime(800))
      .subscribe(() => {
        this.page = 0;
        this.totalum
          .getTotalSearchOrders(this.tableName, this.searchOrdersQuery)
          .then((orders) => {
            totalOrders = orders.data['data'].length;
            this.totalPages = Math.ceil(totalOrders / 5);
            this.totalum
              .searchOrders(this.tableName, this.searchOrdersQuery)
              .then((res) => {
                this.pedidos = <Pedido[]>res.data['data'];
              });
          });
      });
  }

  setTotalPagesAllOrders() {
    this.totalum.getTotalItems(this.tableName).then((res) => {
      let totalOrders = res.data['data'].length;
      this.totalPages = Math.ceil(totalOrders / 5);
    });
  }

  getOrders(page: number) {
    this.totalum.getItems(page, this.tableName).then((res) => {
      this.pedidos = <Pedido[]>res.data['data'];
    });
  }

  previousPage() {
    this.page -= 1;
    this.getOrders(this.page);
  }

  nextPage() {
    this.page += 1;
    this.getOrders(this.page);
  }

  ngOnInit(): void {
    this.getOrders(this.page);
    this.setTotalPagesAllOrders();
  }
}
