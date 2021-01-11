export default interface IContainer {

    get<T>(identifier: string): T;

}
