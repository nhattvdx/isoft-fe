import { Component, OnInit } from '@angular/core';
import { Ledger } from 'src/app/models/ledger.model';
import { UnitConvertionPipe } from 'src/app/shared/pipes';
// get the height
@Component({
    selector: 'app-add-ledger',
    templateUrl: './add-ledger.component.html',
    //styleUrls: ['./arise.component.scss'],
    providers: [UnitConvertionPipe],
})
export class AddLedgerComponent implements OnInit {
    ledger = new Ledger();
    constructor() {}

    ngOnInit() {}
}
