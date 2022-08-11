import { NgModule } from "@angular/core";
import { IsTemplateDirective } from "./is-template.directive";

@NgModule({
    declarations: [
        IsTemplateDirective
    ],
    providers: [
        IsTemplateDirective
    ],
    exports: [
        IsTemplateDirective
    ]
})
export class DirectivesModule {

}