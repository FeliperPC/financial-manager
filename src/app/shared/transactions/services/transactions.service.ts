import { HttpClient, HttpParams, httpResource, HttpResourceRequest } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Transaction, TransactionPayload } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private httpClient = inject(HttpClient);

  getAllByHttpResource(search: Signal<string>) {
    return httpResource<Transaction[]>(
      () => {
        let httpParams = new HttpParams();

        if (search()) {
          httpParams = httpParams.append('title:contains', search());
        }

        return {
          url: '/api/transactions',
          params: httpParams,
        } as HttpResourceRequest;
      },
      {
        defaultValue: [],
      },
    );
  }

  getAll() {
    return this.httpClient.get<Transaction[]>('/api/transactions');
  }

  getTransactionById(id: string) {
    return this.httpClient.get<Transaction>(`/api/transactions/${id}`);
  }

  create(payload: TransactionPayload) {
    return this.httpClient.post<Transaction>('/api/transactions', payload);
  }

  update(id: number, payload: TransactionPayload) {
    return this.httpClient.put<Transaction>(`/api/transactions/${id}`, payload);
  }

  remove(id: number) {
    return this.httpClient.delete<Transaction>(`/api/transactions/${id}`);
  }
}
