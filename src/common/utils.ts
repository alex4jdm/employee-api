import { SelectQueryBuilder } from 'typeorm';
import _ from 'lodash';
import { IOrderOptions } from "./interfaces/IOrderOptions.interface";
import { IPaginationResults } from 'src/common/interfaces';
import { PaginatedQueryDto } from 'src/common/dto';


export function getOrders(orderBy: string, delimiter: string): IOrderOptions[] {
    const orders = orderBy.split(delimiter);
    
    const processedOrders = orders.map((o) => {
        const [ fieldSort, type ] = [ 
            o.split(',')[0].trim(),
            o.split(',')[1].trim(),
        ];

        return { fieldSort, type } as IOrderOptions
    })

    return processedOrders;
}

export function addOrderBy(qb: SelectQueryBuilder<any>, orderBy: string): void {
    if (orderBy) {
        const orders = getOrders(orderBy, '|');
  
        for (const o of orders) {
          if (o.fieldSort.split('.').length === 1)
            qb.addOrderBy(`${qb.alias + '.' + o.fieldSort}`, o.type);
          else
            qb.addOrderBy(`${o.fieldSort}`, o.type);
        }
    }
}

export function addDays(date: Date, period: number): Date {
    return new Date(date.setDate(date.getDate() + period));
}

export function paginate(items: any[], query: PaginatedQueryDto): IPaginationResults {
  const paginatedItems = items.slice((query.page - 1) * query.limit, query.page * query.limit);

  return {
    items: paginatedItems,
    meta: {
      itemCount: paginatedItems.length,
      totalItems: items.length,
      itemsPerPage: query.limit,
      totalPages: Math.ceil(items.length / query.limit),
      currentPage: query.page,
    }
  }
}

export function sort(items: any[], orderBy: string): any[] {
  let arr = items;

  if (orderBy) {
    const orders = getOrders(orderBy, '|');
    arr = _.orderBy(arr, orders.map((i) => i.fieldSort), orders.map((i) => i.type.toLowerCase()));
  }

  return arr;
}

export function filterArrayWithSearch(array: any[], fieldsToSearch: string[], searchQuery: string): any[] {
  if (searchQuery) {
    return array.filter((item) => fieldsToSearch.some((field) => item[field]?.toLowerCase().includes(searchQuery)));
  }

  return array;
}

export function filterArrayOrMatrixWithSearch(array: any[], fieldsToSearch: string[], searchQuery: string): any[] {
  if (searchQuery) {
    const multiFields = fieldsToSearch.filter(field => field.split('.').length !== 1);
    const simpleFields = fieldsToSearch.filter(field => field.split('.').length === 1);
    const matches = [];

    for (let mf of multiFields) {
      const [arr, prop] = mf.split('.');

      for (let item of array) {
        if (item[arr].some((subItem) => subItem[prop]?.toLowerCase().includes(searchQuery.toLowerCase()))) {
          matches.push(item);
        }
      }
    }

    for (let sf of simpleFields) {
      for (let item of array) {
        if (item[sf]?.toLowerCase().includes(searchQuery.toLowerCase())) {
          matches.push(item);
        }
      }
    }
    return matches;
  }
  return array;
}















