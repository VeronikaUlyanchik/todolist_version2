import { TasksStateType } from '../App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';

import { AddTodolistAC, RemoveTodolistAC } from './todolists-reducer';

let  startState: TasksStateType;

beforeEach(()=> {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", completed: false , addedDate:new Date() , deadline: new Date() , description: '',
            order: 1 , status: 1, priority: 1, startDate: new Date(), todoListId: ''},
            { id: "2", title: "JS", completed: true , addedDate:new Date() , deadline: new Date() , description: '',
                order: 1 , status: 1, priority: 1, startDate: new Date(), todoListId: ''},
            { id: "3", title: "React", completed: false, addedDate:new Date() , deadline: new Date() , description: '',
                order: 1 , status: 1, priority: 1, startDate: new Date(), todoListId: '' }
        ],
            "todolistId2": [
            { id: "1", title: "bread", completed: false , addedDate:new Date() , deadline: new Date() , description: '',
                order: 1 , status: 1, priority: 1, startDate: new Date(), todoListId: ''},
            { id: "2", title: "milk", completed: true, addedDate:new Date() , deadline: new Date() , description: '',
                order: 1 , status: 1, priority: 1, startDate: new Date(), todoListId: '' },
            { id: "3", title: "tea", completed: false , addedDate:new Date() , deadline: new Date() , description: '',
                order: 1 , status: 1, priority: 1, startDate: new Date(), todoListId: ''}
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", completed: false },
            { id: "2", title: "JS", completed: true },
            { id: "3", title: "React", completed: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", completed: false },
            { id: "3", title: "tea", completed: false }
        ]
    });

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].completed).toBe(false);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", false, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].completed).toBe(false);
    expect(endState["todolistId1"][1].completed).toBe(true);
});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", 'coffee', "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('coffee');
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", completed: false , addedDate:new Date() , deadline: new Date() , description: '',
                order: 1 , status: 1, priority: 1, startDate: new Date(), todoListId: ''},
            { id: "2", title: "JS", completed: true , addedDate:new Date() , deadline: new Date() , description: '',
                order: 1 , status: 1, priority: 1, startDate: new Date(), todoListId: ''},
            { id: "3", title: "React", completed: false , addedDate:new Date() , deadline: new Date() , description: '',
                order: 1 , status: 1, priority: 1, startDate: new Date(), todoListId: ''}
        ],
        "todolistId2": [
            { id: "1", title: "bread", completed: false, addedDate:new Date() , deadline: new Date() , description: '',
                order: 1 , status: 1, priority: 1, startDate: new Date(), todoListId: '' },
            { id: "2", title: "milk", completed: true, addedDate:new Date() , deadline: new Date() , description: '',
                order: 1 , status: 1, priority: 1, startDate: new Date(), todoListId: '' },
            { id: "3", title: "tea", completed: false, addedDate:new Date() , deadline: new Date() , description: '',
                order: 1 , status: 1, priority: 1, startDate: new Date(), todoListId: '' }
        ]
    };

    const action = AddTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = RemoveTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

