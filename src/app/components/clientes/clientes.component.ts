import { Component, OnInit } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { TotalumApiService } from 'src/app/services/totalum-api.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  tableName: string = 'cliente';
  clientes: Cliente[] = [];
  focusedInput: boolean = false;
  page: number = 0;
  searchQuery: string = '';
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

  searchItems() {
    let totalClients = 0;
    const searchInput = document.getElementById('search-bar-clients');
    fromEvent(searchInput!, 'keyup')
      .pipe(debounceTime(800))
      .subscribe(() => {
        this.page = 0;
        this.totalum
          .getTotalSearchClients(this.tableName, this.searchQuery)
          .then((clients) => {
            totalClients = clients.data['data'].length;
            this.totalPages = Math.ceil(totalClients / 5);
            this.totalum
              .searchClients(this.tableName, this.searchQuery)
              .then((res) => {
                this.clientes = <Cliente[]>res.data['data'];
              });
          });
      });
  }

  setTotalPagesAllClients() {
    this.totalum.getTotalItems(this.tableName).then((res) => {
      let totalClients = res.data['data'].length;
      this.totalPages = Math.ceil(totalClients / 5);
    });
  }

  getClients(page: number) {
    this.totalum.getItems(page, this.tableName).then((res) => {
      this.clientes = <Cliente[]>res.data['data'];
    });
  }

  previousPage() {
    this.page -= 1;
    this.getClients(this.page);
  }

  nextPage() {
    this.page += 1;
    this.getClients(this.page);
  }

  ngOnInit(): void {
    this.getClients(this.page);
    this.setTotalPagesAllClients();
  }
}
