import { AriseComponent } from './components/accounting-module/arise/arise.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    HttpBackend,
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {
    LocationStrategy,
    HashLocationStrategy,
    PathLocationStrategy,
} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { StyleClassModule } from 'primeng/styleclass';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { SpeedDialModule } from 'primeng/speeddial';
import { EditorModule } from 'primeng/editor';

import { AppComponent } from './app.component';

import { ProductService } from './service/productservice';
import { MenuService } from './service/app.menu.service';
import { ConfigService } from './service/app.config.service';
import { appInitializer } from './interceptor/app.initializer';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
import { AuthService } from './service/auth.service';
import { SpinnerOverlayComponent } from './shared/spinner-overlay/spinner-overlay.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppConfigComponent } from './configs/app.config.component';
import { AppMainComponent } from './layouts/app.main.component';
import { AppTopBarComponent } from './layouts/app.topbar.component';
import { AppFooterComponent } from './layouts/app.footer.component';
import { AppMenuComponent } from './layouts/app.menu.component';
import { AppMenuitemComponent } from './layouts/app.menuitem.component';
import { QlFormatsComponent } from './shared/ql-formats/ql-formats.component';
import { DepartmentFormComponent } from './components/employee-module/department/components/department-form/department-form.component';
import { DepartmentComponent } from './components/employee-module/department/department.component';
import { UserFormComponent } from './components/employee-module/user/components/user-form/user-form.component';
import { UserComponent } from './components/employee-module/user/user.component';
import { BeginDeclareComponent } from './components/main-module/begin-declare/begin-declare.component';
import { BeginDeclareFormComponent } from './components/main-module/begin-declare/components/begin-declare-form/begin-declare-form.component';
import { CompanyComponent } from './components/main-module/company/company.component';
import { CompanyFormComponent } from './components/main-module/company/components/company-form/company-form.component';
import { LandingComponent } from './components/others-module/landing/landing.component';
import { NotfoundComponent } from './components/others-module/notfound/notfound.component';
import { TimelineComponent } from './components/others-module/timeline/timeline.component';
import { ForgotPasswordComponent } from './components/unauthenticate-module/forgot-password/forgot-password.component';
import { LoginComponent } from './components/unauthenticate-module/login/login.component';
import { DashboardComponent } from './components/main-module/dashboard/dashboard.component';
import { EmptyComponent } from './components/others-module/empty/empty.component';
import { CrudComponent } from './components/others-module/crud/crud.component';
import { ErrorComponent } from './components/others-module/error/error.component';
import { AccessComponent } from './components/others-module/access/access.component';
import { BranchComponent } from './components/employee-module/branch/branch.component';
import { StoreComponent } from './components/employee-module/store/store.component';
import { SpecializedComponent } from './components/employee-module/specialized/specialized.component';
import { TitleComponent } from './components/employee-module/title/title.component';
import { JobTitleDetailsComponent } from './components/employee-module/job-title-details/job-title-details.component';
import { ShiftComponent } from './components/employee-module/shift/shift.component';
import { TimekeepingPositionComponent } from './components/employee-module/timekeeping-position/timekeeping-position.component';
import { EmployeeTypeComponent } from './components/employee-module/employee-type/employee-type.component';
import { RelativesComponent } from './components/relationship-module/relatives/relatives.component';
import { RelationComponent } from './components/relationship-module/relation/relation.component';
import { CustomersComponent } from './components/customer-module/customers/customers.component';
import { CustomerTypeComponent } from './components/customer-module/customer-type/customer-type.component';
import { TimekeepingHistoryComponent } from './components/timekeeping-module/timekeeping-history/timekeeping-history.component';
import { TimekeepingComponent } from './components/timekeeping-module/timekeeping/timekeeping.component';
import { TimekeepingReportComponent } from './components/timekeeping-module/timekeeping-report/timekeeping-report.component';
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
import { InventoryControlComponent } from './components/sell-module/setup-module/inventory-control/inventory-control.component';
import { DefectiveGoodsComponent } from './components/sell-module/setup-module/defective-goods/defective-goods.component';
import { AccountingLinkComponent } from './components/sell-module/setup-module/accounting-link/accounting-link.component';
import { PaymentHistoryComponent } from './components/sell-module/sell-report-module/payment-history/payment-history.component';
import { ProfitAfterTaxComponent } from './components/sell-module/sell-report-module/profit-after-tax/profit-after-tax.component';
import { ProfitBeforeTaxComponent } from './components/sell-module/sell-report-module/profit-before-tax/profit-before-tax.component';
import { SellDetailsBookComponent } from './components/sell-module/sell-report-module/sell-details-book/sell-details-book.component';
import { AccountComponent } from './components/accounting-module/account/account.component';
import { ToolsFixedAssetsComponent } from './components/accounting-module/tools-fixed-assets/tools-fixed-assets.component';
import { EndOfTermEndingComponent } from './components/accounting-module/category-module/end-of-term-ending/end-of-term-ending.component';
import { TypeOfDocumentComponent } from './components/accounting-module/category-module/type-of-document/type-of-document.component';
import { BillsComponent } from './components/accounting-module/category-module/bills/bills.component';
import { IncomingTextComponent } from './components/document-module/incoming-text/incoming-text.component';
import { TextGoComponent } from './components/document-module/text-go/text-go.component';
import { SliderWebComponent } from './components/website-module/slider-web/slider-web.component';
import { IntroWebComponent } from './components/website-module/intro-web/intro-web.component';
import { ProductWebComponent } from './components/website-module/product-web/product-web.component';
import { BranchWebComponent } from './components/website-module/branch-web/branch-web.component';
import { RecruitWebComponent } from './components/website-module/recruit-web/recruit-web.component';
import { NewsWebComponent } from './components/website-module/news-web/news-web.component';
import { SocialNetworkWebComponent } from './components/website-module/social-network-web/social-network-web.component';
import { StoreFormComponent } from './components/employee-module/store/components/store-form/store-form.component';
import { BranchFormComponent } from './components/employee-module/branch/components/branch-form/branch-form.component';
import { EmployeeTypeFormComponent } from './components/employee-module/employee-type/employee-type-form/employee-type-form.component';
import { SpecializedFormComponent } from './components/employee-module/specialized/specialized-form/specialized-form.component';
import { TitleFormComponent } from './components/employee-module/title/title-form/title-form.component';
import { ShiftFormComponent } from './components/employee-module/shift/shift-form/shift-form.component';
import { TimekeepingPositionFormComponent } from './components/employee-module/timekeeping-position/timekeeping-position-form/timekeeping-position-form.component';
import { JobTitleDetailsFormComponent } from './components/employee-module/job-title-details/job-title-details-form/job-title-details-form.component';
import { IsTableComponent } from './shared/is-table/is-table.component';
import { DirectivesModule } from './shared/directives/directives.module';
import { PipesModule } from './shared/pipes/pipes.module';
import { AriseFilterComponent } from './components/accounting-module/arise/arise-filter/arise-filter.component';
import { AddLedgerComponent } from './components/accounting-module/arise/add-ledger/add-arise.component';
export function createTranslateLoader(http: HttpBackend) {
    return new TranslateHttpLoader(
        new HttpClient(http),
        'assets/i18n/',
        '.json'
    );
}

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarModule,
        AvatarGroupModule,
        BadgeModule,
        BreadcrumbModule,
        EditorModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        CascadeSelectModule,
        ChartModule,
        CheckboxModule,
        SpeedDialModule,
        ChipsModule,
        ChipModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        GalleriaModule,
        ImageModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        OverlayModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        ScrollTopModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TagModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeSelectModule,
        TreeTableModule,
        VirtualScrollerModule,
        StyleClassModule,
        PipesModule,
        TranslateModule.forRoot({
            defaultLanguage: 'vn',
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpBackend],
            },
        }),
        DirectivesModule,
    ],
    declarations: [
        // others component
        AppComponent,
        AppMainComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        DashboardComponent,
        SpinnerOverlayComponent,
        EmptyComponent,
        CrudComponent,
        TimelineComponent,
        LandingComponent,
        ErrorComponent,
        NotfoundComponent,
        AccessComponent,
        QlFormatsComponent,

        //unauthenticate component
        ForgotPasswordComponent,
        LoginComponent,

        // main component
        CompanyComponent,
        CompanyFormComponent,
        BeginDeclareComponent,
        BeginDeclareFormComponent,

        // employee component
        BranchComponent,
        BranchFormComponent,
        DepartmentComponent,
        DepartmentFormComponent,
        EmployeeTypeComponent,
        JobTitleDetailsComponent,
        SpecializedComponent,
        StoreComponent,
        StoreFormComponent,
        ShiftComponent,
        TimekeepingPositionComponent,
        TitleComponent,
        UserComponent,
        UserFormComponent,

        // relationship module
        RelativesComponent,
        RelationComponent,

        // customer module
        CustomersComponent,
        CustomerTypeComponent,

        // timekeeping module
        TimekeepingComponent,
        TimekeepingHistoryComponent,
        TimekeepingReportComponent,

        // workflow module
        WorkflowComponent,
        WorkflowTypeComponent,

        // sell module
        CashierComponent,
        SellerComponent,
        WarehouseComponent,
        WebsiteOrdersComponent,
        ListOfGoodsComponent,

        // setup module
        RoomTableComponent,
        QuotaComponent,
        ComboComponent,
        MenuOfGoodsComponent,
        InventoryControlComponent,
        DefectiveGoodsComponent,
        AccountingLinkComponent,

        // sell report module
        PaymentHistoryComponent,
        ProfitBeforeTaxComponent,
        ProfitAfterTaxComponent,
        SellDetailsBookComponent,

        // accounting module
        AriseComponent,
        AriseFilterComponent,
        AddLedgerComponent,
        AccountComponent,
        ToolsFixedAssetsComponent,

        // category module
        TypeOfDocumentComponent,
        BillsComponent,
        EndOfTermEndingComponent,

        // document module
        IncomingTextComponent,
        TextGoComponent,

        // website module
        SliderWebComponent,
        IntroWebComponent,
        ProductWebComponent,
        BranchWebComponent,
        RecruitWebComponent,
        NewsWebComponent,
        SocialNetworkWebComponent,
        EmployeeTypeFormComponent,
        SpecializedFormComponent,
        TitleFormComponent,
        ShiftFormComponent,
        TimekeepingPositionFormComponent,
        JobTitleDetailsFormComponent,

        // Shared Components
        IsTableComponent,
        AddLedgerComponent,
    ],
    providers: [
        // { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        ProductService,
        MenuService,
        ConfigService,
        MessageService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            multi: true,
            deps: [AuthService],
        },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SpinnerInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
