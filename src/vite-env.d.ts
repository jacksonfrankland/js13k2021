/// <reference types="vite/client" />

declare module 'js13k-ecs' {

    /**
     * Registers components for use by the library. Components must be classes or constructor functions. No other requirements are imposed on the components. Note that there is currently a limit of 32 registered components.
     */
    function register (...components: any[]): void;

    /**
     * Adds systems for use by the library. Systems must be instances of classes or objects. Systems must implement the update method.
     */
    function process(...systems: {update: (delta: number) => void}[]): void;

    /**
     * Creates the entity with the specified id. If id is not specified, serial numbers starting with 1 are generated and encoded in base36. Returns the created entity.
     */
    function create(id?: number): Entity;

    /**
     * Returns the entity with the specified id or undefined if it is not present.
     */
    function get(id: number): Entity;

    /**
     * Returns a selection of entities that have the specified set of components. The sample is updated real-time and always relevant.
     * The selector has the length property, which stores the number of entities in the sample and the iterate(fn) method, with which you can loop through all entities.
     */
    function select(...components: any[]): Selector;

    /**
     * Successively calls update methods on all systems, passing them the delta parameter. Returns the object that contains the duration of the execution of the systems.
     */
    function update(delta: number): any;

    interface Selector {
        /**
         * the number of entities in the sample.
         */
        length: number;

        /**
         * loop through all entities.
         */
        iterate: (fn: (entity: Entity) => void) => void;
    }

    interface Entity {
        /**
         * Adds the components to the entity.
         */
        add: (...components: any[]) => void;

        /**
         * Removes components of the Components class from the entity. Calls the destructor method of each component if it is present.
         */
        remove: (...components: any[]) => void;

        /**
         * Returns true if the entity has a component of the Component class and false otherwise.
         */
        has: (component: any) => boolean;

        /**
         * Returns a component of the Component class or undefined if it is not present.
         */
        get: <T>(component: {new (...arguments: any[]): T}) => T;

        /**
         * Removes the entity from all selectors and sets its id to zero. Calls the destructor method of each component if it is present.
         */
        eject: () => void;
    }

}

