import HandlerNotFoundException from '../../common/exception/HandlerNotFoundException';

export default class EventHandlerNotFoundException extends HandlerNotFoundException {

    constructor(event: string) {
        super(`Not found handler for event: ${ event }`);
    }

}
