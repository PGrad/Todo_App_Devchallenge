import { Button, Checkbox, List, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import React, { useState } from "react";
import "./todo-panel.css";

export interface Task {
    checked: boolean;
    name: string;
    index: number;
}

interface TodoPanelProps {
    type: string;
    tasks: Task[];
    setTaskDelegate: (tasks: Task[]) => void;
}

function CrossedOut(props: React.PropsWithChildren<{ striked: boolean }>) {
    return (props.striked ? (<span className="striked">{props.children}</span>) : (<span>{props.children}</span>));
}

export default function TodoPanel(props: TodoPanelProps) {
    const [value, setValue] = useState("");
    const onChange = (e: any) => {
        setValue(e.target.value);
    }
    const addTask = () => {
        if (value !== "") {
            props.setTaskDelegate([...props.tasks, { checked: false, name: value, index: props.tasks.length }]);
            setValue("");
        }
    }
    const onCheckboxChange = (idx: number) => {
        return () => {
            if (!props.tasks[idx].checked) {
                props.tasks[idx].checked = true;
                props.setTaskDelegate([...props.tasks]);
            }
        }
    };
    const filterFunc = (task: Task) => {
        switch (props.type) {
            case "1":
                return true;
            case "2":
                return !task.checked;
            case "3":
                return task.checked;
        }
    }
    return (
        <div>
            <div className="add-task">
                <TextField value={value} onChange={onChange} sx={{ width: "476px" }} placeholder="add details" variant="outlined" />
                <Button onClick={addTask} sx={{ margin: "25px" }} variant="contained">Add</Button>
            </div>
            <List>
                {
                    props.tasks.filter(filterFunc).map((task) => {
                        return (
                            <ListItem key={task.index}>
                                <ListItemIcon>
                                    <Checkbox checked={task.checked} onChange={onCheckboxChange(task.index)} />
                                </ListItemIcon>
                                <ListItemText primary={<CrossedOut striked={task.checked}>{task.name}</CrossedOut>} />
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>
    );
}