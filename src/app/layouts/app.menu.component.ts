import { Component, OnInit } from '@angular/core';
import { AuthData } from '../models/auth.model';
import { AuthService } from '../service/auth.service';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <div class="flex justify-content-center mb-4">
                <p-calendar
                    id="year"
                    class="px-0 sm:px-3"
                    [(ngModel)]="selectedYear"
                    [ngModelOptions]="{ standalone: true }"
                    view="year"
                    dateFormat="yy"
                    inputId="yearpicker"
                ></p-calendar>
            </div>
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li
                    app-menu
                    class="layout-menuitem-category"
                    *ngFor="let item of model; let i = index"
                    [item]="item"
                    [index]="i"
                    [root]="true"
                    role="none"
                >
                    <div
                        class="layout-menuitem-root-text"
                        [attr.aria-label]="item.label | translate"
                        [translate]="item.label"
                    ></div>
                    <ul role="menu">
                        <li
                            app-menuitem
                            *ngFor="let child of item.items"
                            [item]="child"
                            [index]="i"
                            role="none"
                        ></li>
                    </ul>
                </li>
            </ul>
        </div>
    `,
    styles: [
        `
            :host ::ng-deep {
                #year .p-calendar {
                    max-width: 100px;
                }

                #year .p-calendar .p-inputtext {
                    text-align: center;
                    min-width: 50px;
                }

                #year .p-calendar .p-datepicker {
                    min-width: 200px;
                    z-index: 100000 !important;
                }
            }
        `,
    ],
})
export class AppMenuComponent implements OnInit {
    model: any[];
    selectedYear: any = new Date();

    constructor(
        public appMain: AppMainComponent,
        private authService: AuthService
    ) {}

    ngOnInit() {
        console.log(this.authService.user);
        let user = Object.assign({}, this.authService.user);
        // if (user.roleName === 'admin') {
        // }
        this.model = [
            {
                label: 'left_menu.home',
                items: [
                    {
                        label: 'left_menu.dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/uikit'],
                    },
                    {
                        label: 'left_menu.company_info',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/uikit/company-info'],
                    },
                    {
                        label: 'left_menu.initial_declaration',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['/uikit/initial-declaration'],
                    },
                ],
            },
            {
                label: 'left_menu.categories',
                items: [
                    {
                        label: 'left_menu.employee_management',
                        icon: 'pi pi-fw pi-list',
                        items: [
                            {
                                label: 'left_menu.employee',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/uikit/employee'],
                            },
                            {
                                label: 'left_menu.department',
                                icon: 'pi pi-fw pi-building',
                                routerLink: ['/uikit/department'],
                            },
                        ],
                    },
                    // {
                    //     label: 'left_menu.province',
                    //     icon: 'pi pi-fw pi-map',
                    //     routerLink: ['/uikit/province'],
                    // },
                    // {
                    //     label: 'left_menu.district',
                    //     icon: 'pi pi-fw pi-map',
                    //     routerLink: ['/uikit/district'],
                    // },
                    // {
                    //     label: 'left_menu.ward',
                    //     icon: 'pi pi-fw pi-map',
                    //     routerLink: ['/uikit/ward'],
                    // },
                ],
            },
            // {
            //     label: 'left_menu.basic_categories',
            //     items: [
            //         {
            //             label: 'left_menu.news',
            //             icon: 'pi pi-fw pi-book',
            //             routerLink: ['/uikit/new-feed'],
            //         },
            //     ],
            // },
            // {
            //     label: 'Pages',
            //     items: [
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-user-edit',
            //             routerLink: ['/uikit/pages/crud'],
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/uikit/pages/timeline'],
            //         },
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/pages/landing'],
            //         },
            //         {
            //             label: 'Error',
            //             icon: 'pi pi-fw pi-times-circle',
            //             routerLink: ['/pages/error'],
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/pages/notfound'],
            //         },
            //         {
            //             label: 'Access Denied',
            //             icon: 'pi pi-fw pi-lock',
            //             routerLink: ['/pages/access'],
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle',
            //             routerLink: ['/pages/empty'],
            //         },
            //     ],
            // },
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = <HTMLDivElement>event.target;
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
