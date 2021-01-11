import ICommand from '../ICommand';

export default interface ICommandBus {

    handle(command: ICommand): Promise<void>;

}

