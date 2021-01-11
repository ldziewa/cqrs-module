import IContainer from './IContainer';

export default class SimpleContainer implements IContainer {

    #_elements: Map<string, unknown>;

    constructor() {
        this.#_elements = new Map<string, unknown>();
    }

    public get = <T>(identifier: string): T => this.#_elements.get(identifier) as T;

    public set = <T>(identifier: string, elem: T): Map<string, unknown> => this.#_elements.set(identifier, elem);

};
