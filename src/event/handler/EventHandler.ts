import IEvent from '../IEvent';

export const events = new Map<string, string[]>();

const defineHandler = (event: IEvent, target: object) => {
    const eventName = (<Function>event).prototype.constructor.name;
    const handlerName = (<Function>target).prototype.constructor.name;

    events.has(eventName) ?
        events?.get(eventName)?.push(handlerName) :
        events.set(eventName, [handlerName]);
}

const EventHandler = (event: IEvent): ClassDecorator => (target: object) => defineHandler(event, target);

export default EventHandler;
