import { Component, OnInit } from '@angular/core';
import { iProduct } from './product';
import { ProductService } from './product.service';


@Component({
    templateUrl: './product-list.component.html',
    styleUrls: [ './product-list.component.css' ]
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 40;
    imageMargin: number = 2;
    showImage: boolean = false;
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter( value: string ) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter( this.listFilter ) : this.products;
    }

    filteredProducts: iProduct[];
    products: iProduct[];
    errorMessage: string;

    constructor( private productService: ProductService ) {
        this.listFilter = '';
    }

    onRatingClicked( message: string ): void {
        this.pageTitle = 'Product List: ' + message;
    }

    performFilter( filterBy: string ): iProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter(( product: iProduct ) =>
            product.productName.toLocaleLowerCase().indexOf( filterBy ) !== -1 );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProduct().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error
        );
    }
}