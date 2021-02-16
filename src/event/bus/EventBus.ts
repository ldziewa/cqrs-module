import IEventBus from './IEventBus';
import IEvent from '../IEvent';
import IEventHandler from '../handler/IEventHandler';
import IContainer from '../../container/IContainer';
import { events } from '../handler/EventHandler';
import EventHandlerNotFoundException from '../exception/EventHandlerNotFoundException';

export default class EventBus implements IEventBus {

    readonly #_container: IContainer;

    constructor(container: IContainer) {
        this.#_container = container;
    }

    public async handle<R>(event: IEvent): Promise<R> {
        const eventName = event.constructor.name;
        const handlerName = this.#_reflectHandlerName(eventName);
        const handler: IEventHandler<IEvent, R> = this.#_getHandler(handlerName);

        return handler.handle(event);
    }

    readonly #_reflectHandlerName = (eventName: string): string => {
        const event = events.get(eventName)

        if (event) {
            return event;
        }

        throw new EventHandlerNotFoundException(eventName);
    };

    readonly #_getHandler = <R>(handler: string): IEventHandler<IEvent, R> => this.#_container.get(handler);

}
