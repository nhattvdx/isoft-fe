import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Page, TypeData} from "../../../models/common.model";
import {WorkflowModel} from "../../../models/workflow.model";

@Component({
    selector: 'app-workflow',
    templateUrl: './workflow.component.html',
    styles: [``],
})
export class WorkflowComponent implements OnInit {
    items: MenuItem[] = [
        {
            id: '1',
            label: 'Danh sách',
            icon: 'pi pi-fw pi-book',
            command: (event) => {
                this.activeItem = event.item
            }
        },
        {
            id: '2',
            label: 'Hạn chót',
            icon: 'pi pi-fw pi-clock',
            command: (event) => {
                this.activeItem = event.item
            }
        },
        {
            id: '3',
            label: 'Lịch',
            icon: 'pi pi-fw pi-calendar',
            command: (event) => {
                this.activeItem = event.item
            }
        },
        {
            id: '4',
            label: 'Gantt',
            icon: 'pi pi-fw pi-chart-line',
            command: (event) => {
                this.activeItem = event.item
            }
        },
    ];
    activeItem: MenuItem
    exportParam = {
        fromDate: new Date(),
        toDate: new Date(),
        statusId: null,
        deptId: null
    }
    actions = [
        {id: 1, name: 'Ghim'},
        {id: 2, name: 'Hoàn thành'},
        {id: 3, name: 'Bắt đầu công việc'},
        {id: 4, name: 'Hoãn lại'},
        {id: 5, name: 'Sao chép'},
        {id: 6, name: 'Xóa'},
    ]
    loading: boolean = false;
    sortFields: any[] = [];
    sortTypes: any[] = [];
    result: TypeData<WorkflowModel> = {
        data: [],
        currentPage: 0,
        nextStt: 0,
        pageSize: 10,
        totalItems: 0
    }
    param: Page = {
        page: 0,
        pageSize: 10,
    }
    expiredWorks = []
    calendarWork
    ganttWork = {
        month: new Date()
    }

    constructor() {
    }

    ngOnInit(): void {
        this.activeItem = this.items[0]
        this.result = {
            ...this.result,
            data: [
                {
                    id: 1,
                    name: 'Lương Công Nhật Hùng',
                    viewer: 10,
                    createdDate: new Date(),
                    deadLine: new Date(),
                    actualHours: 100
                }
            ],
            currentPage: 1,
            totalItems: 1
        }
        for (let i = 0; i < 10; i++) {
            this.expiredWorks.push({
                id: i + 1,
                name: `Test ${i + 1}`,
                date: new Date(),
                icon: 'pi pi-user'
            })
        }
    }

    getWorkList(event) {
    }
}
