import { Box, Tab} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import TodoPanel, { Task } from "./todo-panel";
import "./todo-tabs.css";

export default function TodoTabs() {
    const [value, setValue] = useState("1");
    const [tasks, setTasks] = useState<Task[]>([]);
    const handleChange = (_: any, value: string) => {
        setValue(value);
    };
    const setTaskDelegate = (_tasks: Task[]) => {
        setTasks(_tasks);
    };
    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    {["All", "Active", "Completed"].map((label, index) => (
                        <Tab key={index} sx={{ margin: "0 50px 0 50px" }} label={label} value={`${index + 1}`} />
                    ))}
                </TabList>
            </Box>
            {["1", "2", "3"].map((type) => (
                <TabPanel key={type} value={type}>
                    <TodoPanel type={type} tasks={tasks} setTaskDelegate={setTaskDelegate} />
                </TabPanel>
            ))}
        </TabContext>
    );
}