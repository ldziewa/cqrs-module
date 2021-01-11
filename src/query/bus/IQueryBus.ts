import IQuery from '../IQuery';

export default interface IQueryBus {

    handle<R>(query: IQuery): Promise<R>;

}
