import HandlerNotFoundException from '../../common/exception/HandlerNotFoundException';

export default class QueryHandlerNotFoundException extends HandlerNotFoundException {

    constructor(query: string) {
        super(`Not found handler for query: ${ query }`);
    }

}
