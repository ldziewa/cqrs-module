import IEvent from '../IEvent';

export const events = new Map<string, string>();

const defineHandler = (event: IEvent, target: object ) => {
    events.set((<Function> event).prototype.constructor.name, (<Function> target).prototype.constructor.name);
}

const EventHandler = (event: IEvent): ClassDecorator => (target: object) => defineHandler(event, target);

export default EventHandler;
