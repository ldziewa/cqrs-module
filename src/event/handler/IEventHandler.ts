import IEvent from '../IEvent';

export default interface IEventHandler<T extends IEvent> {

    handle(event: T): Promise<void>;

}
