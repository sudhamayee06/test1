import { HistoryRecord } from './history-record.model';
import { Address } from './address.model';

export class Car {
    id = 0;
    model: string;
    type: string;
    isAvailable: boolean;
    isDamaged = false;
    totalBalance = 0;
    picture: string;
    age: number;
    location: Location;
    address: Address;
    description: string;
    lastMaintenance: Date;
    comments: string;
    history: HistoryRecord[];
}
