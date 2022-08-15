import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAvatarModel, WorkflowModel} from "../../../../models/workflow.model";

@Component({
    providers: [MessageService, ConfirmationService],
    selector: 'app-workflow-form',
    templateUrl: './workflow-form.component.html',
    styleUrls: ['./workflow-form.component.scss']
})
export class WorkflowFormComponent implements OnInit {
    workflowModel: WorkflowModel = {
        deadLine: new Date(),
        responsiblePerson: [],
        createPersons: [],
        joinedPersons: [],
        viewedPersons: []
    }
    isEdit = false
    users: UserAvatarModel[] = [
        {
            fullName: 'Test 1',
            avatar: '../../../../../assets/demo/images/avatar/amyelsner.png'
        },
        {
            fullName: 'Test2',
            avatar: '../../../../../assets/demo/images/avatar/asiyajavayant.png'
        },
        {
            fullName: 'Test 3',
            avatar: '../../../../../assets/demo/images/avatar/onyamalimba.png'
        },
        {
            fullName: 'Test 4',
            avatar: '../../../../../assets/demo/images/avatar/ionibowcher.png'
        }
    ]
    parentProjects = [
        {
            name: 'Project 1',
            value: 1
        },
        {
            name: 'Project 2',
            value: 2
        },
        {
            name: 'Project 3',
            value: 3
        },
    ]
    viewers = [
        {
            name: 'Người xem 1',
            value: 1
        },
        {
            name: 'Người xem 2',
            value: 2
        },
        {
            name: 'Người xem 3',
            value: 3
        },
    ]
    departments = [
        {
            name: 'Phòng ban 1',
            value: 1
        },
        {
            name: 'Phòng ban 2',
            value: 2
        },
        {
            name: 'Phòng ban 3',
            value: 3
        },
    ]

    userTypeOptions = [
        {
            name: 'Tạo bởi',
            value: 1
        },
        {
            name: 'Tham gia',
            value: 2
        },
        {
            name: 'Quan sát',
            value: 3
        },
    ]
    userTypesSelected: any

    checkList = [
        {
            value: 'Kiểm tra 1',
            checked: false
        }
    ]
    itemCheckList = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private readonly messageService: MessageService,
    ) {
    }

    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get('id')
        switch (param) {
            case 'create':
                this.isEdit = false
                break
            default:
                this.isEdit = true
                this.getWorkflowDetail(param)
                break
        }
    }

    getWorkflowDetail(id) {

    }

    onChangeSelected(event) {
    }

    onBack() {
        this.router.navigate(['/uikit/workflow'])
    }

    onAddCheckList() {
        if (this.itemCheckList?.trim()?.length > 0) {
            this.checkList.push({
                value: this.itemCheckList,
                checked: false
            })
            this.itemCheckList = ''
        }
    }
}
