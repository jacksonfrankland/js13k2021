import ecs, { Selector } from 'js13k-ecs';
import { LifeSpan } from '../components';

export default class {

    private selector: Selector;

    constructor () {
        this.selector = ecs.select(LifeSpan);
    }

    update (delta: number) {
        this.selector.iterate(entity => {
            entity.get(LifeSpan).timeLeft -= delta;
            if (entity.get(LifeSpan).timeLeft <= 0) {
                entity.eject();
            }
        })
    }
}
