import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { PageFilterUser, UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user.model';
import { AuthData } from 'src/app/models/auth.model';
import { AppConfig } from 'src/app/configs/appconfig';
import { Product } from 'src/app/models/product';
import { ConfigService } from 'src/app/service/app.config.service';
import { ProductService } from 'src/app/service/productservice';

@Component({
    templateUrl: './dashboard.component.html',
    styles: [
        `
            .card-hover {
                cursor: pointer;
            }

            .card {
                padding: 0.75rem;
            }
        `,
    ],
})
export class DashboardComponent implements OnInit {
    items: MenuItem[];

    products: Product[];

    subscription: Subscription;

    config: AppConfig;

    public loading: boolean = false;
    isMobile = screen.width <= 1199;
    public getParams: PageFilterUser = {
        page: 1,
        pageSize: 5,
        sortField: 'id',
        isSort: true,
    };

    authUser: AuthData;

    basicData: any;

    basicOptions: any;

    multiAxisData: any;

    chartOptions: any;

    multiAxisOptions: any;

    stackedData: any;

    stackedOptions: any;

    horizontalOptions: any;

    doughnutData: any;

    constructor(
        private productService: ProductService,
        private authService: AuthService,
        private userService: UserService,
        public configService: ConfigService
    ) {}

    ngOnInit() {
        this.authUser = this.authService.user;
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(
            (config) => {
                this.config = config;
                this.updateChartOptions();
            }
        );
        this.productService
            .getProductsSmall()
            .then((data) => (this.products = data));

        this.basicData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#FFA726',
                    data: [28, 48, 40, 19, 86, 27, 90],
                },
            ],
        };

        this.multiAxisData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'Dataset 1',
                    backgroundColor: [
                        '#EC407A',
                        '#AB47BC',
                        '#42A5F5',
                        '#7E57C2',
                        '#66BB6A',
                        '#FFCA28',
                        '#26A69A',
                    ],
                    yAxisID: 'y',
                    data: [65, 59, 80, 81, 56, 55, 10],
                },
                {
                    label: 'Dataset 2',
                    backgroundColor: '#78909C',
                    yAxisID: 'y1',
                    data: [28, 48, 40, 19, 86, 27, 90],
                },
            ],
        };

        this.multiAxisOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
                tooltips: {
                    mode: 'index',
                    intersect: true,
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: '#ebedef',
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057',
                    },
                },
            },
        };

        this.horizontalOptions = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
            },
        };

        this.stackedData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    type: 'bar',
                    label: 'Dataset 1',
                    backgroundColor: '#42A5F5',
                    data: [50, 25, 12, 48, 90, 76, 42],
                },
                {
                    type: 'bar',
                    label: 'Dataset 2',
                    backgroundColor: '#66BB6A',
                    data: [21, 84, 24, 75, 37, 65, 34],
                },
                {
                    type: 'bar',
                    label: 'Dataset 3',
                    backgroundColor: '#FFA726',
                    data: [41, 52, 24, 74, 23, 21, 32],
                },
            ],
        };

        this.stackedOptions = {
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            responsive: true,
            scales: {
                xAxes: [
                    {
                        stacked: true,
                    },
                ],
                yAxes: [
                    {
                        stacked: true,
                    },
                ],
            },
        };

        this.doughnutData = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
            ],
        };

        this.config = this.configService.config;
        this.updateChartOptions();
        this.subscription = this.configService.configUpdate$.subscribe(
            (config) => {
                this.config = config;
                this.updateChartOptions();
            }
        );
    }

    updateChartOptions() {
        if (this.config.dark) this.applyDarkTheme();
        else this.applyLightTheme();
    }

    applyDarkTheme() {
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
                y: {
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
            },
        };

        this.horizontalOptions = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
                y: {
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
            },
        };

        this.multiAxisOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef',
                    },
                },
                tooltips: {
                    mode: 'index',
                    intersect: true,
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(255,255,255,0.2)',
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#ebedef',
                    },
                },
            },
        };

        this.stackedOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef',
                    },
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '#ebedef',
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
            },
        };
    }

    applyLightTheme() {
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
            },
        };

        this.horizontalOptions = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
            },
        };

        this.multiAxisOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
                tooltips: {
                    mode: 'index',
                    intersect: true,
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: '#ebedef',
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057',
                    },
                },
            },
        };

        this.stackedOptions = {
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '#495057',
                    },
                    grid: {
                        color: '#ebedef',
                    },
                },
            },
        };
    }
}
