import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './layouts/app.main.component';
import { AuthGuard } from './interceptor/auth-guard.service';
import { DepartmentComponent } from './components/employee-module/department/department.component';
import { UserComponent } from './components/employee-module/user/user.component';
import { BeginDeclareComponent } from './components/main-module/begin-declare/begin-declare.component';
import { CompanyComponent } from './components/main-module/company/company.component';
import { DashboardComponent } from './components/main-module/dashboard/dashboard.component';
import { AccessComponent } from './components/others-module/access/access.component';
import { CrudComponent } from './components/others-module/crud/crud.component';
import { EmptyComponent } from './components/others-module/empty/empty.component';
import { ErrorComponent } from './components/others-module/error/error.component';
import { LandingComponent } from './components/others-module/landing/landing.component';
import { NotfoundComponent } from './components/others-module/notfound/notfound.component';
import { TimelineComponent } from './components/others-module/timeline/timeline.component';
import { ForgotPasswordComponent } from './components/unauthenticate-module/forgot-password/forgot-password.component';
import { LoginComponent } from './components/unauthenticate-module/login/login.component';
import { BranchComponent } from './components/employee-module/branch/branch.component';
import { StoreComponent } from './components/employee-module/store/store.component';
import { SpecializedComponent } from './components/employee-module/specialized/specialized.component';
import { TitleComponent } from './components/employee-module/title/title.component';
import { JobTitleDetailsComponent } from './components/employee-module/job-title-details/job-title-details.component';
import { TimekeepingPositionComponent } from './components/employee-module/timekeeping-position/timekeeping-position.component';
import { ShiftComponent } from './components/employee-module/shift/shift.component';
import { EmployeeTypeComponent } from './components/employee-module/employee-type/employee-type.component';
import { RelationComponent } from './components/relationship-module/relation/relation.component';
import { RelativesComponent } from './components/relationship-module/relatives/relatives.component';
import { CustomersComponent } from './components/customer-module/customers/customers.component';
import { CustomerTypeComponent } from './components/customer-module/customer-type/customer-type.component';
import { TimekeepingReportComponent } from './components/timekeeping-module/timekeeping-report/timekeeping-report.component';
import { TimekeepingHistoryComponent } from './components/timekeeping-module/timekeeping-history/timekeeping-history.component';
import { TimekeepingComponent } from './components/timekeeping-module/timekeeping/timekeeping.component';
import { WorkflowComponent } from './components/workflow-module/workflow/workflow.component';
import { WorkflowTypeComponent } from './components/workflow-module/workflow-type/workflow-type.component';
import { CashierComponent } from './components/sell-module/cashier/cashier.component';
import { SellerComponent } from './components/sell-module/seller/seller.component';
import { WarehouseComponent } from './components/sell-module/warehouse/warehouse.component';
import { WebsiteOrdersComponent } from './components/sell-module/website-orders/website-orders.component';
import { ListOfGoodsComponent } from './components/sell-module/list-of-goods/list-of-goods.component';
import { RoomTableComponent } from './components/sell-module/setup-module/room-table/room-table.component';
import { QuotaComponent } from './components/sell-module/setup-module/quota/quota.component';
import { ComboComponent } from './components/sell-module/setup-module/combo/combo.component';
import { MenuOfGoodsComponent } from './components/sell-module/setup-module/menu-of-goods/menu-of-goods.component';
import { DefectiveGoodsComponent } from './components/sell-module/setup-module/defective-goods/defective-goods.component';
import { AccountingLinkComponent } from './components/sell-module/setup-module/accounting-link/accounting-link.component';
import { InventoryControlComponent } from './components/sell-module/setup-module/inventory-control/inventory-control.component';
import { PaymentHistoryComponent } from './components/sell-module/sell-report-module/payment-history/payment-history.component';
import { ProfitBeforeTaxComponent } from './components/sell-module/sell-report-module/profit-before-tax/profit-before-tax.component';
import { ProfitAfterTaxComponent } from './components/sell-module/sell-report-module/profit-after-tax/profit-after-tax.component';
import { SellDetailsBookComponent } from './components/sell-module/sell-report-module/sell-details-book/sell-details-book.component';
import { AriseComponent } from './components/accounting-module/arise/arise.component';
import { AccountComponent } from './components/accounting-module/account/account.component';
import { ToolsFixedAssetsComponent } from './components/accounting-module/tools-fixed-assets/tools-fixed-assets.component';
import { TypeOfDocumentComponent } from './components/accounting-module/category-module/type-of-document/type-of-document.component';
import { BillsComponent } from './components/accounting-module/category-module/bills/bills.component';
import { EndOfTermEndingComponent } from './components/accounting-module/category-module/end-of-term-ending/end-of-term-ending.component';
import { IncomingTextComponent } from './components/document-module/incoming-text/incoming-text.component';
import { TextGoComponent } from './components/document-module/text-go/text-go.component';
import { SliderWebComponent } from './components/website-module/slider-web/slider-web.component';
import { IntroWebComponent } from './components/website-module/intro-web/intro-web.component';
import { ProductWebComponent } from './components/website-module/product-web/product-web.component';
import { BranchWebComponent } from './components/website-module/branch-web/branch-web.component';
import { RecruitWebComponent } from './components/website-module/recruit-web/recruit-web.component';
import { NewsWebComponent } from './components/website-module/news-web/news-web.component';
import { SocialNetworkWebComponent } from './components/website-module/social-network-web/social-network-web.component';
@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                { path: '', component: LoginComponent },
                { path: 'forgot-password', component: ForgotPasswordComponent },
                {
                    path: 'uikit',
                    canActivate: [AuthGuard],
                    component: AppMainComponent,
                    children: [
                        { path: '', component: DashboardComponent },
                        // main module
                        { path: 'company-info', component: CompanyComponent },
                        {
                            path: 'initial-declaration',
                            component: BeginDeclareComponent,
                        },
                        // employee module
                        {
                            path: 'employee',
                            component: UserComponent,
                        },
                        {
                            path: 'branch',
                            component: BranchComponent,
                        },
                        {
                            path: 'store',
                            component: StoreComponent,
                        },
                        {
                            path: 'employee-type',
                            component: EmployeeTypeComponent,
                        },
                        {
                            path: 'specialized',
                            component: SpecializedComponent,
                        },
                        {
                            path: 'department',
                            component: DepartmentComponent,
                        },
                        {
                            path: 'title',
                            component: TitleComponent,
                        },
                        {
                            path: 'job-title-details',
                            component: JobTitleDetailsComponent,
                        },
                        {
                            path: 'timekeeping-position',
                            component: TimekeepingPositionComponent,
                        },
                        {
                            path: 'shift',
                            component: ShiftComponent,
                        },

                        // relationship module
                        {
                            path: 'relatives',
                            component: RelativesComponent,
                        },
                        {
                            path: 'relation',
                            component: RelationComponent,
                        },

                        // customer module
                        {
                            path: 'customers',
                            component: CustomersComponent,
                        },
                        {
                            path: 'customer-type',
                            component: CustomerTypeComponent,
                        },

                        // timekeeping module
                        {
                            path: 'timekeeping',
                            component: TimekeepingComponent,
                        },
                        {
                            path: 'timekeeping-history',
                            component: TimekeepingHistoryComponent,
                        },
                        {
                            path: 'timekeeping-report',
                            component: TimekeepingReportComponent,
                        },

                        // workflow module
                        {
                            path: 'workflow',
                            component: WorkflowComponent,
                        },
                        {
                            path: 'workflow-type',
                            component: WorkflowTypeComponent,
                        },

                        // sell module
                        {
                            path: 'cashier',
                            component: CashierComponent,
                        },
                        {
                            path: 'seller',
                            component: SellerComponent,
                        },
                        {
                            path: 'warehouse',
                            component: WarehouseComponent,
                        },
                        {
                            path: 'website-orders',
                            component: WebsiteOrdersComponent,
                        },
                        {
                            path: 'list-of-goods',
                            component: ListOfGoodsComponent,
                        },

                        // setup module
                        {
                            path: 'setup',
                            children: [
                                {
                                    path: 'room-table',
                                    component: RoomTableComponent,
                                },
                                {
                                    path: 'quota',
                                    component: QuotaComponent,
                                },
                                {
                                    path: 'combo',
                                    component: ComboComponent,
                                },
                                {
                                    path: 'menu-of-goods',
                                    component: MenuOfGoodsComponent,
                                },
                                {
                                    path: 'inventory-control',
                                    component: InventoryControlComponent,
                                },
                                {
                                    path: 'defective-goods',
                                    component: DefectiveGoodsComponent,
                                },
                                {
                                    path: 'accounting-link',
                                    component: AccountingLinkComponent,
                                },
                            ],
                        },

                        // sell report module
                        {
                            path: 'sell-report',
                            children: [
                                {
                                    path: 'payment-history',
                                    component: PaymentHistoryComponent,
                                },
                                {
                                    path: 'profit-before-tax',
                                    component: ProfitBeforeTaxComponent,
                                },
                                {
                                    path: 'profit-after-tax',
                                    component: ProfitAfterTaxComponent,
                                },
                                {
                                    path: 'sell-details-book',
                                    component: SellDetailsBookComponent,
                                },
                            ],
                        },

                        // accounting module
                        {
                            path: 'arise',
                            component: AriseComponent,
                        },
                        {
                            path: 'account',
                            component: AccountComponent,
                        },
                        {
                            path: 'list-of-goods',
                            component: ListOfGoodsComponent,
                        },

                        // category module
                        {
                            path: 'category',
                            children: [
                                {
                                    path: 'type-of-document',
                                    component: TypeOfDocumentComponent,
                                },
                                {
                                    path: 'bills',
                                    component: BillsComponent,
                                },
                                {
                                    path: 'end-of-term-ending',
                                    component: EndOfTermEndingComponent,
                                },
                            ],
                        },

                        // overreach Report module
                        // need update

                        // internal report module
                        // need update

                        {
                            path: 'tools-fixed-assets',
                            component: ToolsFixedAssetsComponent,
                        },

                        // document module
                        {
                            path: 'incoming-text',
                            component: IncomingTextComponent,
                        },
                        {
                            path: 'text-go',
                            component: TextGoComponent,
                        },

                        // website module
                        {
                            path: 'slider-web',
                            component: SliderWebComponent,
                        },
                        {
                            path: 'intro-web',
                            component: IntroWebComponent,
                        },
                        {
                            path: 'product-web',
                            component: ProductWebComponent,
                        },
                        {
                            path: 'branch-web',
                            component: BranchWebComponent,
                        },
                        {
                            path: 'recruit-web',
                            component: RecruitWebComponent,
                        },
                        {
                            path: 'news-web',
                            component: NewsWebComponent,
                        },
                        {
                            path: 'social-network-web',
                            component: SocialNetworkWebComponent,
                        },

                        // others module
                        { path: 'pages/crud', component: CrudComponent },
                        {
                            path: 'pages/timeline',
                            component: TimelineComponent,
                        },
                        { path: 'pages/empty', component: EmptyComponent },
                    ],
                },
                { path: 'pages/landing', component: LandingComponent },
                { path: 'pages/error', component: ErrorComponent },
                { path: 'pages/notfound', component: NotfoundComponent },
                { path: 'pages/access', component: AccessComponent },
                { path: '**', redirectTo: 'pages/notfound' },
            ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
