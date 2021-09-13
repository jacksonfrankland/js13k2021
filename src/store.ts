export enum State {
    NOT_PLAYINNG,
    PLAYING,
    DYING
}

const store = {
    state: State.NOT_PLAYINNG,
    started: false,
    controlsEnabled: true,
}

export default store;
