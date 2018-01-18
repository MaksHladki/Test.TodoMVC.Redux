import uuid from 'uuid/v4';

class Todo {
    constructor({id = uuid(), text = '', completed = false} = {}) {
        this.id = id;
        this.text = text;
        this.completed = completed
    }

    toString() {
        return JSON.stringify(this);
    }

    toJSON() {
        const { id, text, completed } = this;
        return { id, text, completed};
    }
}

export default Todo;