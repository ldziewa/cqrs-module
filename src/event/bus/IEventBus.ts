import IEvent from '../IEvent';
import IDomainEvent from '../IDomainEvent';

export default interface IEventBus {

    publish(event: IEvent | IDomainEvent): Promise<void[]>;

}
