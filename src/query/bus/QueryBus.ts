import IQueryBus from './IQueryBus';
import IQuery from '../IQuery';
import IQueryHandler from '../handler/IQueryHandler';
import IContainer from '../../container/IContainer';
import { queries } from '../handler/QueryHandler';
import QueryHandlerNotFoundException from '../exception/QueryHandlerNotFoundException';

export default class QueryBus implements IQueryBus {

    #_container: IContainer;

    constructor(container: IContainer) {
        this.#_container = container;
    }

    public async handle<R>(query: IQuery): Promise<R> {
        const queryName = query.constructor.name;
        const handlerName = this.#_reflectHandlerName(queryName);
        const handler: IQueryHandler<IQuery, R> = this.#_getHandler(handlerName);

        return handler.handle(query);
    }

    #_reflectHandlerName = (queryName: string): string => {
        const query = queries.get(queryName);

        if (query) {
            return query
        }

        throw new QueryHandlerNotFoundException(queryName)
    }

    #_getHandler = <R>(handler: string): IQueryHandler<IQuery, R> => this.#_container.get(handler);

}
