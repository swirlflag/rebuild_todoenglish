const testMutaions = {
    RECORD_username(state,username) {
        state.username = username;
    }
}

const mutations = {
    ...testMutaions,
    SCROLL_lock(state) {
        state.is_pageScrollLock = true;
    },
    SCROLL_unlock(state) {
        state.is_pageScrollLock = false;
    },
}

export default mutations;