import ICommand from '../ICommand';

export const commands = new Map<string, string>();

const defineHandler = (command: ICommand, target: object ) => {
    commands.set((<Function> command).prototype.constructor.name, (<Function> target).prototype.constructor.name);
}

const CommandHandler = (command: ICommand): ClassDecorator => (target: object) => defineHandler(command, target);

export default CommandHandler;
