import IEvent from '../IEvent';

export default interface IEventBus {

    handle<R>(event: IEvent): Promise<R>;

}
