import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private getServiceQuery: DocumentNode = gql`
    {
      services {
        id
        name
        prices
      }
    }
  `;
  private addServiceMutation: DocumentNode = gql`
    mutation addService($service: ServiceCreateInput!) {
      addService(service: $service) {
        id
        name
        prices
      }
    }
  `;
  private updateServiceMutation: DocumentNode = gql`
    mutation updateService($service: ServiceUpdateInput!) {
      updateService(service: $service) {
        id
        name
        prices
      }
    }
  `;
  private deleteServiceMutation: DocumentNode = gql`
    mutation removeService($id: ID!) {
      removeService(id: $id)
    }
  `;

  constructor(private apollo: Apollo) {}

  public getServices(): any {
    return this.apollo.watchQuery({
      query: this.getServiceQuery,
    });
  }

  public addService(service: any): any {
    return this.apollo.mutate({
      mutation: this.addServiceMutation,
      variables: { service },
      refetchQueries: [
        {
          query: this.getServiceQuery,
        },
      ]
    });
  }

  public updateService(service: any): any {
    return this.apollo.mutate({
      mutation: this.updateServiceMutation,
      variables: { service }
    });
  }

  public removeService(data: string): any {
    const id = {
      id: data,
    };
    return this.apollo.mutate({
      mutation: this.deleteServiceMutation,
      variables: id,
      refetchQueries: [
        {
          query: this.getServiceQuery,
        },
      ],
    });
  }
}
