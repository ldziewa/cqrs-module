import IEvent from './IEvent';
import IAggregateId from './IAggregateId';

export default interface IDomainEvent extends IEvent {

    eventId: IAggregateId;

}
