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

    public async publish(event: IEvent): Promise<void[]> {
        const eventName = event.constructor.name;
        const handlersNames = this.#_reflectHandlersNames(eventName);

        return Promise.all(handlersNames.map(handlerName => this.#_getHandler(handlerName).handle(event)));
    }

    readonly #_reflectHandlersNames = (eventName: string): string[] => {
        const handlers = events.get(eventName);

        if (handlers) {
            return handlers;
        }

        throw new EventHandlerNotFoundException(eventName);
    };

    readonly #_getHandler = (handler: string): IEventHandler<IEvent> => this.#_container.get(handler);

}
