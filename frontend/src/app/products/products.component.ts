import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';
@Component({
  selector: 'router-outlet',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	products: Product[];
	selectedProduct: Product = { id : null , name: null, price: null};
	sortColumn = 'id';
	reverse: boolean;
	searchText = '';
	constructor(private apiService: ApiService) {
		this.apiService.readProducts().subscribe((products: Product[])=>{
			this.products = products;
			console.log(this.products);
		}) 
	}
	ngOnInit()
	{
	}
	createOrUpdateProduct(form){
		form.value.id = this.selectedProduct.id;
		form.value.name = this.selectedProduct.name;
		form.value.price = this.selectedProduct.price;
		if(this.selectedProduct && this.selectedProduct.id){
				this.apiService.updateProduct(form.value).subscribe((product: Product)=>{
				console.log("Product updated" , product);
				this.apiService.readProducts().subscribe((products: Product[])=>{
					this.products = products;
				})
			});
		}
		else{
			this.apiService.createProduct(form.value).subscribe((product: Product)=>{
				console.log("Product created, ", product);
				this.apiService.readProducts().subscribe((products: Product[])=>{
					this.products = products;
				})
			});
		}
		
		this.selectedProduct.name = '';
		this.selectedProduct.price = '';

	}
	
	selectProduct(product: Product){
		this.selectedProduct = product;
	}

	deleteProduct(id){
		this.apiService.deleteProduct(id).subscribe((product: Product)=>{
			console.log("Product deleted, ", product);
			this.apiService.readProducts().subscribe((products: Product[])=>{
				this.products = products;
			})
		});
	}
	
	// Below code is for sorting column
	  sort(column: string) { 
		if (this.sortColumn === column) {
		  // set boolean true or false
			this.reverse = !this.reverse;
		  }
		  // If we click on any column then it will assign that name to sortColumn.
		this.sortColumn = column;
	  }
}
