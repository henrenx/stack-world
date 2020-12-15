const mutation = {
    updateSessionStorage(key, value) {
        if (typeof key === "object") {
            let obj = key;
            Object.keys().forEach((item) => {
                sessionStorage.setItem(item, obj[item]);
            });
        }
        if (typeof key === "string") {
            sessionStorage.setItem(key, value);
        }
    },
    changeState(state, params) {
        state.temp = params;
    },
    getClassTable(state, payload) {
        // console.log(payload);
        state.classTable = payload;

    },
    getSchoolInfo(state, payload) {
        state.schoolInfo = payload;
    },
    getSubOrgId(state, payload) {
        for (let item of state.schoolInfo) {
            if (item.subOrgName === payload) {
                state.subOrgId = item._id;
            }
        }
    }
};

export default mutation;