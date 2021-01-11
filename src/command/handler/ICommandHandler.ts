import ICommand from '../ICommand';

export default interface ICommandHandler<T extends ICommand> {

    handle(command: T): Promise<void>;

}
