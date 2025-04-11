import { Injectable } from '@angular/core';
import { TotalumApiSdk } from 'totalum-api-sdk';

@Injectable({
  providedIn: 'root',
})
export class TotalumApiService {
  options = {
    apiKey: {
      'api-key':
        'sk-eyJrZXkiOiIyYjYwYjI1NjIyNTBkODFiZGYwZDdhNzciLCJuYW1lIjoiRGVmYXVsdCBBUEkgS2V5IGF1dG9nZW5lcmF0ZWQgNjRwbyIsIm9yZ2FuaXphdGlvbklkIjoiam9zZS1pZ25hY2lvLXBydWViYS10ZWNuaWNhIn0_',
    },
  };

  totalumSdk = new TotalumApiSdk(this.options);

  constructor() {}

  async getTotalItems(table: string) {
    let response = await this.totalumSdk.crud.getItems(table);
    return response;
  }

  async getItems(page: number, table: string) {
    let response = await this.totalumSdk.crud.getItems(table, {
      sort: {
        createdAt: 1,
      },
      pagination: {
        page: page,
        limit: 5,
      },
    });
    return response;
  }

  async getTotalSearchClients(table: string, query: string) {
    let response = await this.totalumSdk.crud.getItems(table, {
      filter: [
        {
          or: [
            {
              nombre: { regex: query, options: 'i' },
            },
            {
              email: { regex: query, options: 'i' },
            },
            {
              telefono: { regex: query, options: 'i' },
            },
          ],
        },
      ],
    });
    return response;
  }

  async searchClients(table: string, query: string) {
    let response = await this.totalumSdk.crud.getItems(table, {
      filter: [
        {
          or: [
            {
              nombre: { regex: query, options: 'i' },
            },
            {
              email: { regex: query, options: 'i' },
            },
            {
              telefono: { regex: query, options: 'i' },
            },
          ],
        },
      ],
      pagination: {
        page: 0,
        limit: 5,
        // limit: total - 5 >= 5 ? 5 : total - 5,         // Para limitar en cada pagina cual es el numero maximo de elementos que entran en una pagina
      },
    });
    return response;
  }

  async getTotalSearchOrders(table: string, query: string) {
    let response = await this.totalumSdk.crud.getItems(table, {
      filter: [
        {
          or: [
            {
              nombre_cliente: { regex: query, options: 'i' },
            },
            {
              numero_pedido: { regex: query, options: 'i' },
            },
            {
              importe: {
                gte: parseFloat(query),
                lte: 300,
              },
            },
            {
              importe_impuestos: {
                gte: parseFloat(query),
                lte: 300,
              },
            },
          ],
        },
      ],
    });
    return response;
  }

  async searchOrders(table: string, query: string) {
    let response = await this.totalumSdk.crud.getItems(table, {
      filter: [
        {
          or: [
            {
              nombre_cliente: { regex: query, options: 'i' },
            },
            {
              numero_pedido: { regex: query, options: 'i' },
            },
            {
              importe: {
                gte: parseFloat(query),
                lte: 300,
              },
            },
            {
              importe_impuestos: {
                gte: parseFloat(query),
                lte: 300,
              },
            },
          ],
        },
      ],
      pagination: {
        page: 0,
        limit: 5,
        // limit: total - 5 >= 5 ? 5 : total - 5,         // Para limitar en cada pagina cual es el numero maximo de elementos que entran en una pagina
      },
    });
    return response;
  }

  async getTotalSearchProducts(table: string, query: string) {
    let response = await this.totalumSdk.crud.getItems(table, {
      filter: [
        {
          or: [
            {
              nombre: { regex: query, options: 'i' },
            },
            {
              precio: {
                gte: 100,
                lte: 200,
              },
            },
            {
              categoria: { regex: query, options: 'i' },
            },
          ],
        },
      ],
    });
    return response;
  }

  async searchProducts(table: string, query: string) {
    let response = await this.totalumSdk.crud.getItems(table, {
      filter: [
        {
          or: [
            {
              nombre: { regex: query, options: 'i' },
            },
            {
              precio: {
                gte: parseFloat(query),
                lte: 300,
              },
            },
            {
              categoria: { regex: query, options: 'i' },
            },
          ],
        },
      ],
      pagination: {
        page: 0,
        limit: 5,
        // limit: total - 5 >= 5 ? 5 : total - 5,         // Para limitar en cada pagina cual es el numero maximo de elementos que entran en una pagina
      },
    });
    return response;
  }
}
