import { Component, Output, EventEmitter } from '@angular/core';
import { ViewMode } from '../view-mode.enum';

@Component({
    selector: 'pms-view-selector',
    templateUrl: './view-selector.component.html',
    styleUrls: ['./view-selector.component.scss']
})
export class ViewSelectorComponent {
    @Output() viewModeChanged: EventEmitter<ViewMode> = new EventEmitter<ViewMode>();

    viewMode = ViewMode;

    constructor() { }

    changeViewMode(newMode: any) {
        this.viewModeChanged.emit(newMode);
    }
}
