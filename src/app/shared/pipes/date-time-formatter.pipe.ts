import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'datetimetransform' })
export class DateTimeFormatterPipe implements PipeTransform {
    transform(value: any) {
        if (!value) { return ''; }

        const date = moment(value).format('llll');
        return date;
    }
}
