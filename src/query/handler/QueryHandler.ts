import IQuery from '../IQuery';

export const queries = new Map<string, string>();

const defineHandler = (query: IQuery, target: object ) => {
    queries.set((<Function> query).prototype.constructor.name, (<Function> target).prototype.constructor.name);
}

const QueryHandler = (query: IQuery): ClassDecorator => (target: object) => defineHandler(query, target);

export default QueryHandler;
