import { Component, OnInit, Input, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

import { ProConService } from '@services';
import { ProConEnum } from '@enums';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';

@Component({
    selector: 'challenge-app-pro-con-list',
    templateUrl: 'pro-con-list.component.html',
    styleUrls: ['./pro-con-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProConListComponent implements OnInit {
    @Input() listId: string;
    @Input() list: string[];
    public title = '';
    public newItem = '';
    public waiting = false;
    public selectedToEdit = '';
    public editValue = '';
    public modal: NzModalRef;
    constructor(
        private proConService: ProConService,
        private message: NzMessageService,
        private modalService: NzModalService
    ) {
    }

    ngOnInit() {
        this.title = ProConEnum[this.listId];
     }
     public async add() {
         if (this.newItem.trim().length > 0) {
            this.startWaiting();
             await this.proConService.addItem(this.listId, this.newItem);
             this.newItem = '';
            this.endWaiting('Added');
         }
     }
     public edit(index: number, template: TemplateRef<{}>) {
        this.selectedToEdit = this.list[index];
        this.modal = this.modalService.create({
            nzTitle: `Edit ${this.title}`,
            nzContent: template,
            nzClosable: false,
            nzFooter: [
                {
                  label: 'Close',
                  shape: 'default',
                  onClick: () => {
                      this.modal.destroy();
                      this.editValue = '';
                    }
                },
                {
                  label: 'Edit',
                  type: 'primary',
                  onClick: () => {
                      if (this.editValue.trim().length > 0) {
                          return this.editItem(index);
                      }
                    }
                }
            ]
          });
     }
     async editItem(index: number) {
        this.startWaiting();
        await this.proConService.editItem(this.listId, index, this.editValue);
        this.selectedToEdit = null;
        this.editValue = '';
        this.modal.destroy();
        this.endWaiting('Edited');
     }
      public async delete(index: number) {
        this.startWaiting();
        await this.proConService.deleteItem(this.listId, index);
        this.endWaiting('Deleted');
     }
     private startWaiting() {
        this.message.loading('Please Wait...', { nzDuration: 100 });
        this.waiting = true;
     }
     private endWaiting(action: string) {
        this.message.create('success', `${this.title} ${action}`);
        this.waiting = false;
     }
}
