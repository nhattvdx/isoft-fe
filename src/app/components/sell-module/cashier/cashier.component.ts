import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/productservice';
@Component({
    selector: 'app-cashier',
    templateUrl: './cashier.component.html',
    styles: [
        `
            :host ::ng-deep {
                .p-orderlist .p-orderlist-header,
                .p-orderlist .p-orderlist-filter-container {
                    display: none;
                }

                .p-tabview .p-tabview-panels {
                    padding: 0;
                }

                .p-dropdown {
                    width: 14rem;
                    font-weight: normal;
                }

                .product-name {
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                .product-description {
                    margin: 0 0 1rem 0;
                }

                .product-category-icon {
                    vertical-align: middle;
                    margin-right: 0.5rem;
                }

                .product-category {
                    font-weight: 600;
                    vertical-align: middle;
                }

                .product-list-item {
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    width: 100%;

                    img {
                        width: 150px;
                        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
                            0 3px 6px rgba(0, 0, 0, 0.23);
                        margin-right: 2rem;
                    }

                    .product-list-detail {
                        flex: 1 1 0;
                    }

                    .p-rating {
                        margin: 0 0 0.5rem 0;
                    }

                    .product-price {
                        font-size: 1.5rem;
                        font-weight: 600;
                        align-self: flex-end;
                    }

                    .product-list-action {
                        display: flex;
                        flex-direction: column;
                    }

                    .p-button {
                        margin-bottom: 0.5rem;
                    }
                }

                .product-grid-item {
                    margin: 0.5em;
                    border: 1px solid #dee2e6;

                    .product-grid-item-top,
                    .product-grid-item-bottom {
                        display: flex;
                    }

                    img {
                        width: 75%;
                        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
                            0 3px 6px rgba(0, 0, 0, 0.23);
                        margin: 0.5rem 0;
                    }

                    .product-grid-item-content {
                        text-align: center;
                    }

                    .product-price {
                        font-size: 1.5rem;
                        font-weight: 600;
                    }
                }
            }

            .status-instock {
                text-align: right;
                font-weight: bold;
                color: green;
            }

            .status-outofstock {
                text-align: right;
                font-weight: bold;
                color: red;
            }

            .status-lowstock {
                text-align: right;
                font-weight: bold;
                color: orange;
            }

            .card {
                padding: 1rem;
                padding-bottom: 0;
                box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
                    0 1px 1px 0 rgba(0, 0, 0, 0.14),
                    0 1px 3px 0 rgba(0, 0, 0, 0.12) !important;
                border-radius: 4px !important;
            }

            @media screen and (max-width: 576px) {
                :host ::ng-deep .product-list-item {
                    flex-direction: column;
                    align-items: center;

                    img {
                        width: 75%;
                        margin: 2rem 0;
                    }

                    .product-list-detail {
                        text-align: center;
                    }

                    .product-price {
                        align-self: center;
                    }

                    .product-list-action {
                        display: flex;
                        flex-direction: column;
                    }

                    .product-list-action {
                        margin-top: 2rem;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                    }
                }
            }
        `,
    ],
})
export class CashierComponent implements OnInit {
    activeTableOrGoods: number = 0;
    activeFloor: number = 0;
    activeBill: number = 0;

    floorTabs: any[] = Array.from({ length: 50 }, (_, i) => ({
        title: `Lầu ${i + 1}`,
        content: `Tab ${i + 1} Floor Content`,
    }));

    billTabs: any[] = Array.from({ length: 50 }, (_, i) => ({
        title: `Bill ${i + 1}`,
        content: `Tab ${i + 1} Bill Content`,
    }));

    products: Product[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService
            .getProducts()
            .then((data) => (this.products = data));

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' },
        ];
    }

    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
}
