import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmptyComponent } from './components/empty/empty.component';
import { CrudComponent } from './components/crud/crud.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { AppMainComponent } from './layouts/app.main.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from './interceptor/auth-guard.service';
import { UserComponent } from './components/user/user.component';
import { DepartmentComponent } from './components/department/department.component';
import { CompanyComponent } from './components/company/company.component';
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
                        { path: 'company-info', component: CompanyComponent },
                        {
                            path: 'employee', component: UserComponent,
                        },
                        {
                            path: 'department',
                            component: DepartmentComponent,
                        },
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
