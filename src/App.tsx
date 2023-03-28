import React from 'react';
import './App.css';
import Todo from "./Todo";
import {useAppDispatch, useAppSelector} from "./state/store";
import {Loader} from "./Loader";
import {changeTodoTC, deleteTodolistTC} from "./state/todo-reducer";

export function App() {

    const dispatch = useAppDispatch()

    const {todo, isLoading, error} = useAppSelector(state => state.todos)

    const onChangeStatusHandler = (id: string, completed: boolean) => {
        dispatch(changeTodoTC(id, completed))
    }
    const deleteTodolistHandler = (id: string) => {
        dispatch(deleteTodolistTC(id))
    }
    return (
        <div style={{padding: "300px"}}>
            {isLoading && <Loader/>}
            {!!error && <div style={{color: "red"}}>{error}</div>}
            <div>
                <Todo/>
                {todo.map((tl) => <div key={tl.id} style={tl.completed ? {opacity: 0.3} : {}}>

                    <input type={"checkbox"}
                           checked={tl.completed}
                           onChange={() => onChangeStatusHandler(tl.id, !tl.completed)}/>

                    {tl.title}

                    <button onClick={()=> deleteTodolistHandler(tl.id)}>Х</button>
                </div>)}

            </div>
        </div>
    )
}
