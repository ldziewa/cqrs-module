import ICommand from '../../ICommand';
import ICommandHandler from '../../handler/ICommandHandler';

export enum ISOLATION_LEVELS {
    READ_UNCOMMITTED = 'READ UNCOMMITTED',
    READ_COMMITTED = 'READ COMMITTED',
    REPEATABLE_READ = 'REPEATABLE READ',
    SERIALIZABLE = 'SERIALIZABLE',
}

export enum TYPES {
    DEFERRED = 'DEFERRED',
    IMMEDIATE = 'IMMEDIATE',
    EXCLUSIVE = 'EXCLUSIVE',
}

export interface IDeferrable {
    toString(): string;
    toSql(): string;
}

export interface ITransactionOptions {
    autocommit?: boolean;
    isolationLevel?: ISOLATION_LEVELS;
    type?: TYPES;
    deferrable?: string | IDeferrable;
    /**
     * Sequelize parent transaction.
     */
    transaction?: unknown;
    logging?: boolean | ((sql: string, timing?: number) => void);
    benchmark?: boolean;
}

interface SequelizeConnection {}

interface ITransactional extends SequelizeConnection {
    transaction<T>(options: ITransactionOptions, autoCallback: (t: any) => PromiseLike<T>): Promise<T>;
    transaction<T>(autoCallback: (t: any) => PromiseLike<T>): Promise<T>;
    transaction(options?: ITransactionOptions): Promise<any>;

    [key: string]: unknown;
}

declare type ClassConstructor<T> = {
    new (...args: any[]): T;
};

let conn: ITransactional | null = null;

const annotate = (target: any, options: ITransactionOptions | null = null): void => {
    const originalHandler = target.prototype.handle;
    if (options) {
        target.prototype.handle = async function (command: ICommand) {
            await conn?.transaction(options, async () => { await originalHandler(command); });
        };
    } else {
        target.prototype.handle = async function (command: ICommand) {
            await conn?.transaction(async () => { await originalHandler(command); });
        };
    }
};

export const registerConnection = (connection: SequelizeConnection) => conn = <ITransactional> connection;

export function Transactional(options: ITransactionOptions): (target: unknown,) => void;
export function Transactional(target: ClassConstructor<ICommandHandler<ICommand>>): void;
export function Transactional(arg: any): ((target: ICommandHandler<ICommand>,) => void) | void {
    if (typeof arg === 'function') {
        annotate(arg);
    } else {
        const options: ITransactionOptions = { ...arg };

        return (target: ICommandHandler<ICommand>) => annotate(target, options);
    }
}
