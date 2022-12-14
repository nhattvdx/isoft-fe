import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { PageFilterUser, UserService } from 'src/app/service/user.service';
import { AuthData } from 'src/app/models/auth.model';
import { AppConfig } from 'src/app/configs/appconfig';
import { Product } from 'src/app/models/product';
import { ConfigService } from 'src/app/service/app.config.service';
import { ProductService } from 'src/app/service/productservice';
import MiniSearch from 'minisearch';

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
        this.productService.getProductsSmall().then((data) => {
            this.products = data;
            // h???n ch??? c???a search like
            // Khi kh??ng ????nh index th?? t???c ????? t??m ki???m ch???m.
            // K???t qu??? t??m ki???m nhi???u nh??ng ????? nhi???u cao, t??? ?????ng ngh??a nhi???u.
            // G???p v???n ????? trong t??m ki???m ti???ng vi???t c?? d???u v?? kh??ng d???u.

            // https://www.npmjs.com/package/minisearch FTS
            // full index search. S??? t??ng s??? l?????ng k???t qu??? search l??n
            // ngo??i ra k???t qu??? s??? hi???n th??? score ??i???m gi???ng nhau, v?? t??n tr?????ng gi???ng

            // ??u ??i???m FTS
            // K???t qu??? search tr??? v??? nhi???u.
            // Khi ????nh index th?? t???c ????? search Nhanh
            // T???i ??u h??n vi???c s??? d???ng LIKE khi thao t??c v???i c??c tr?????ng text l???n.
            // N???u nh?? ng?????i d??ng nh???p ???co be mua dong??? th?? d??ng m???nh ????? LIKE s??? kh??ng search ra ???????c ???C?? b?? m??a ????ng???, nh??ng FTS c?? th??? gi???i quy???t v???n ????? n??y
            let miniSearch = new MiniSearch({
                fields: ['code', 'name'], // fields to index for full-text search
                storeFields: ['id', 'code', 'name'], // fields to return with search results
            });
            miniSearch.addAll(data);
            // search. S??? t??m ki???m minisearch field theo t??? kh??a
            // prefix = true ????? t??? ?????ng g??n keyword thi???u th??nh keyword ????? v?? t??m ki???m
            let results = miniSearch.search('vbb', { prefix: true });
            // autoSuggest. S??? t??? ?????ng g??n keyword thi???u th??nh keyword ????? v?? t??m ki???m
            // let results = miniSearch.autoSuggest('Earri');
            console.log(data, results);
            // result FTS
            // code: "vbb124btr"
            // id: "1008"
            // match:
            // vbb124btr: ['code']
            // name: "Game Controller"
            // score: 0.9339516396985341
            // terms: ['vbb124btr']
        });

        // Example FTS(full text search)
        // A collection of documents we want to search among
        const documents = [
            {
                id: 1,
                title: 'Moby Dick',
                text: 'Call me Ishmael. Some years ago...',
            },
            {
                id: 2,
                title: 'Zen and the Art of Motorcycle Maintenance',
                text: 'I can see by my watch...',
            },
            {
                id: 3,
                title: 'Neuromancer',
                text: 'The sky above the port was...',
            },
            {
                id: 4,
                title: 'Zen and the Art of Archery',
                text: 'At first sight it must seem...',
            },
            // ...and more
        ];

        // Create the search engine, and set `title` and `text` as searchable fields
        let miniSearch = new MiniSearch({ fields: ['title', 'text'] });

        // Index all documents (this is fast!)
        miniSearch.addAll(documents);

        // Search with default options. It will return the id of the matching documents,
        // along with a relevance score and match information
        miniSearch.search('zen art motorcycle');
        // => [ { id: 2, score: 2.77258, match: { ... } }, { id: 4, score: 1.38629, match: { ... } } ]

        // Search only within specific fields
        miniSearch.search('zen', { fields: ['title'] });

        // Boost some fields to give them more importance (here "title")
        miniSearch.search('zen', { boost: { title: 2 } });

        // Prefix search (so that 'moto' will match 'motorcycle')
        miniSearch.search('moto', { prefix: true });

        // Fuzzy search, in this example, with a max edit distance of 0.2 * term length.
        // The mispelled 'ismael' will match 'ishmael'.
        miniSearch.search('ismael', { fuzzy: 0.2 });

        // Get suggestions for a partial search
        miniSearch.autoSuggest('zen ar');
        // => [ { suggestion: 'zen archery art', terms: [ 'zen', 'archery', 'art' ], score: 1.73332 },
        //      { suggestion: 'zen art', terms: [ 'zen', 'art' ], score: 1.21313 } ]

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
