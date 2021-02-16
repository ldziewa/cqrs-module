import IContainer from './IContainer';

export default class SimpleContainer implements IContainer {

    readonly #_elements: Map<string, unknown>;

    constructor() {
        this.#_elements = new Map<string, unknown>();
    }

    public readonly get = <T>(identifier: string): T => this.#_elements.get(identifier) as T;

    public readonly set = <T>(identifier: string, elem: T): Map<string, unknown> => this.#_elements.set(identifier, elem);

};
