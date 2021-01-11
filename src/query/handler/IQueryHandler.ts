import IQuery from '../IQuery';

export default interface IQueryHandler<T extends IQuery, R> {

    handle(query: T): Promise<R>;

}
