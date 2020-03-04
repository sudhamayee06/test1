import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'pms-dialog',
    templateUrl: 'dialog-modal.component.html',
    styleUrls: ['dialog-modal.component.scss']
})
export class DialogModalComponent {
    @Input() message: string;
    constructor(
        public dialogRef: MatDialogRef<DialogModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
}
