import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
    price: 123,
    num: 100,
    noPop: 'false'
}

const getters = {
    priceNum(state) {
        return state.num
    }
}

const mutations = {
    price_fn(state) {
        state.price++;
    },
    count_fn(state) {
        state.price--;
    },
    is_pop(state) {
        if (state.noPop == true) {
            state.noPop = false;
        } else {
            state.noPop = true;
        }
    }

}

const actions = {

}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;