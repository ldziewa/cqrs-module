import HandlerNotFoundException from '../../common/exception/HandlerNotFoundException';

export default class CommandHandlerNotFoundException extends HandlerNotFoundException {

    constructor(command: string) {
        super(`Not found handler for command: ${ command }`);
    }

}
