import IEvent from '../IEvent';

export default interface IEventHandler<T extends IEvent, R> {

    handle(event: T): Promise<R>;

}
