import ecs, { Selector } from 'js13k-ecs';
import { Spawner } from '../components';


export default class {
    private selector: Selector;

    constructor () {
        this.selector = ecs.select(Spawner);
    }

    update(delta: number) {
        this.selector.iterate(entity => {
            let spawner = entity.get(Spawner);
            spawner.tillNextSpawn -= delta;
            if (spawner.enabled && spawner.tillNextSpawn <= 0) {
                ecs.create().add(...spawner.generateComponents());
                spawner.tillNextSpawn = spawner.interval;
            }
        })
    }
}
