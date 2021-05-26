export class Todo {
    todo: string;
    checked: boolean;
    important: boolean;
    date: Date;
    time: Date;

    constructor(todo: string) {
        this.todo = todo;
        this.checked = false;
        this.important = false;
        this.date = new Date;
        this.time = new Date;
    }
}



