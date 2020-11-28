import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../product';
 
@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
 
  transform(products: Array<Product>, column?: string, reverse?: boolean): Array<Product> {
 
    // First we need to sort an Array.
    if ( column === undefined || column === 'id') {
        products.sort((e1, e2) => e1.id - e2.id);
        // array.sort(compareFunction)
        // compareFunction - A function that defines an alternative sort order.
        // The function should return a negative, zero, or positive value, depending on the arguments,
        // like : function(a, b){return a-b}
        // When the sort() method compares two values,
        // it sends the values to the compare function,
        // and sorts the values according to the returned (negative, zero, positive) value.
      } else if ( column === 'name') {
        products.sort((e1, e2) => e1.name.localeCompare(e2.name));
        // The localeCompare() method compares two strings in the current locale.
        // The locale is based on the language settings of the browser.
        // The localeCompare() method returns a number indicating 
        // whether the string comes before, after or is equal as the compareString in sort order.
      } else if (column === 'price') {
        products.sort((e1, e2) => e1.price - e2.price);
      } 
  // Reverse Array after sorting.
  // If flag is true then only reverse it.
    if (reverse) {
      products.reverse();
    }
    return products;
  }
}