import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
	price:123,
	num:100
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