import {
    LIST_TASK,
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK
} from "./../actions/types";

const initialState = [];

function taskReducer(tasks = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LIST_TASK:
            return payload;

        case CREATE_TASK:
            return [...tasks, payload];

        case UPDATE_TASK:
            return tasks.map((t) => {
                if (t.id === payload.id) {
                    return {
                        ...t,
                        ...payload
                    };
                } else {
                    return t;
                }
            });

        case DELETE_TASK:
            return tasks.filter(({ id }) => id !== payload.id);

        default:
            return tasks;
    }
}

export default taskReducer;