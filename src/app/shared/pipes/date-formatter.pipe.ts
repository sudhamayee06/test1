import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'datetransform' })
export class DateFormatterPipe implements PipeTransform {
    transform(value: any) {
        if (!value) { return ''; }

        const date = moment(value).format('LL');
        return date;
    }
}
