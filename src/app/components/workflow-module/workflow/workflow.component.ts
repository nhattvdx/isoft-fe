import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Page, TypeData} from "../../../models/common.model";
import {GanttModel, WorkflowModel} from "../../../models/workflow.model";
import {Router} from "@angular/router";
import {CalendarOptions} from "@fullcalendar/angular";
import {addDays} from 'date-fns';

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

    ganttWork: GanttModel = {
        month: new Date(),
        todo: [],
        inProgress: [],
        done: [],
        user: {
            id: 1,
            fullname: 'Nguyễn Văn A',
            avatar: '../../../../../assets/demo/images/avatar/amyelsner.png'
        }
    }
    draggedJob: WorkflowModel

    events: any[] = []
    calendarOption: CalendarOptions

    constructor(
        private router: Router
    ) {
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
        for (let i = 0; i < 5; i++) {
            this.expiredWorks.push({
                id: i + 1,
                name: `Test ${i + 1}`,
                date: new Date(),
                icon: 'pi pi-user'
            })
            this.ganttWork.todo.push({
                id: i + 1,
                name: `Todo ${i + 1}`,
                createdDate: new Date()
            })
            this.ganttWork.inProgress.push({
                id: i + 1,
                name: `InProgress ${i + 1}`,
                createdDate: new Date()
            })
            this.ganttWork.done.push({
                id: i + 1,
                name: `Done ${i + 1}`,
                createdDate: new Date()
            })
            this.events.push({
                id: i + 1,
                title: `Event ${i + 1}`,
                start: addDays(new Date(), i),
                end: addDays(new Date(), i + 3)
            })
        }
        console.log('events', this.events)
        this.calendarOption = {
            initialDate: new Date(),
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek'
            },
            buttonText: {
                today: 'Hôm nay',
                month: 'Tháng',
                week: 'Tuần'
            },
            titleFormat: {
                month: '2-digit',
                year: 'numeric'
            },
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            events: this.events
        }

    }

    getWorkList(event) {
    }

    onAddWorkflow() {
        this.router.navigate([`/uikit/workflow/create`]).then()
    }

    dragStart(job: WorkflowModel) {
        this.draggedJob = job
    }

    drop() {
        if (this.draggedJob) {
            this.ganttWork.inProgress = [...this.ganttWork.inProgress, this.draggedJob]
            this.ganttWork.todo = this.ganttWork.todo.filter(x => x.id !== this.draggedJob.id)
            this.draggedJob = null
        }
    }

    dragEnd() {
        this.draggedJob = null
    }
}
