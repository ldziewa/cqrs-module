import IContainer from '../../container/IContainer';
import ICommand from '../ICommand';
import ICommandHandler from '../handler/ICommandHandler';
import { commands } from '../handler/CommandHandler';
import CommandHandlerNotFoundException from '../exception/CommandHandlerNotFoundException';
import ICommandBus from './ICommandBus';

export default class CommandBus implements ICommandBus {

    #_container: IContainer;

    constructor(container: IContainer) {
        this.#_container = container;
    }

    public async handle(command: ICommand): Promise<void> {
        const commandName = command.constructor.name;
        const handlerName = this.#_reflectHandlerName(commandName);
        const handler = this.#_getHandler(handlerName);

        await handler.handle(command);
    }

    #_reflectHandlerName = (commandName: string): string => {
        const command = commands.get(commandName);

        if (command) {
            return command;
        }

        throw new CommandHandlerNotFoundException(commandName);
    }

    #_getHandler = (handler: string): ICommandHandler<ICommand> => this.#_container.get(handler);

}
