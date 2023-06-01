import Collapse from "@mui/material/Collapse";
import {useEffect, useState} from "react";
import './sprint-view.widget.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {Sprint, TaskInEpic, TasksInEpic} from "../../models/sprint.model";
import {Epic, Status, taskDragged} from "../../store/task-organizer-state";
import {DragDropContext, Draggable, DraggableLocation, Droppable, DropResult} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";


function SprintStatusHeader({ statuses, tasks = [] }: { statuses: Status[], tasks?: Record<number, TasksInEpic> }) {
    const [statusCount, setStatusCount] = useState<Record<number, number>>({});

    useEffect(() => {
        void calculateCounts(tasks, statuses);
    }, [tasks]);

    async function calculateCounts(rawTasks: Record<number, TasksInEpic>, statuses: Status[]): Promise<void> {
        const tasks = Object.values(rawTasks).flatMap((statusData) =>
            Object.entries(statusData).flatMap(([innerKey, taskArray]) =>
                taskArray.map((task) => ({ ...task, status: Number(innerKey) }))
        ));

        const counts = tasks.reduce((res, task) => {
            res[task.status] = (res?.[task.status] || 0) + 1;
            return res;
        }, statuses.reduce((a, v) => ({ ...a, [v.id]: 0}), {}) as Record<number, number>);
        setStatusCount(counts);
    }

    return <div className='sprint-epic-view sprint-status-header'>
        <div className='sprint-epic-tasks'>
            { statuses.map(status => <div key={status.id} className='sprint-epic-task-placeholder p-1 column-stretch'>
                <span>{ status.label } { statusCount?.[status.id] }</span>
            </div>) }
        </div>
    </div>
}

function SprintEpic({ epic, statuses, tasks = [] }: { epic: Epic, statuses: Status[], tasks?: TasksInEpic }) {
    const [expanded, setExpanded] = useState(true);
    const toggle = () => setExpanded(!expanded);

    const total = Object.values(tasks).flat() || [];

    return <section className='sprint-epic-view'>
        <div className='row pointer' onClick={toggle}>
            <span className='sprint-epic-title no-select'>{ epic.label }</span>
            <div className={`sprint-epic-toggle-icon ${expanded ? 'expanded' : ''}`}>
                <ArrowDropDownIcon></ArrowDropDownIcon>
            </div>
            <span className='sprint-epic-issues-count'>
                { total.length } Issues
            </span>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className='sprint-epic-tasks'>
                { statuses.map(status =>
                    <Droppable key={status.id} droppableId={`droppable-${epic.id}-${status.id}`} type='TASK'>
                        {
                            (droppableProvided, snapshot) =>
                                <div {...droppableProvided.droppableProps}
                                     ref={droppableProvided.innerRef}
                                     className='sprint-epic-task-placeholder radius-6 column-stretch'>
                                    { (tasks[status.id] || []).map((task, index) =>
                                        <Draggable key={task.id} draggableId={`draggable-${task.id}`} index={index}>
                                            {
                                                (draggableProvided, snapshot) =>
                                                    <div ref={draggableProvided.innerRef}
                                                         {...draggableProvided.draggableProps}
                                                         {...draggableProvided.dragHandleProps}
                                                         className='task-card'>
                                                        <p>{ task.title }</p>
                                                        <p>{ statuses.find(s => status.id === s.id)?.label || 'No status' }</p>
                                                    </div>
                                            }
                                        </Draggable>
                                    ) }
                                    { droppableProvided.placeholder }
                                </div>
                        }
                    </Droppable>
                ) }
            </div>
        </Collapse>
    </section>
}

// try to change the status while dragging :)
// mb just id of sprint here needed idk
function SprintViewWidget({ sprint = { id: 0, tasks: {} }, epics, statuses }: { sprint: Sprint, epics: Epic[], statuses: Status[] }) {
    const dispatch = useDispatch();

    const total = Object.values(sprint.tasks).reduce((total, epic) =>
        total + Object.values(epic).reduce((t, status) => t + status.length ,0), 0);


    const convertDropData = (data: DraggableLocation) => {
        const [_, epic, status] = data.droppableId.split('-');
        return {
            idx: data.index,
            epic: +epic,
            status: +status
        }
    }

    const dragEnd = (data: DropResult) => {
        if (data.reason === 'DROP' && data.destination) {
            dispatch(taskDragged({
                sprint: sprint.id,
                from: convertDropData(data.source),
                to: convertDropData(data.destination),
            }));
        }
    }

    return <div className='column-stretch w-full'>
        {
            <span>Total: { total }</span>
        }
        <DragDropContext onDragEnd={dragEnd}>
            <main className='sprint-view'>
                { <SprintStatusHeader statuses={statuses} tasks={sprint.tasks}></SprintStatusHeader> }
                { epics.map(epic => <SprintEpic key={epic.id}
                                                epic={epic}
                                                tasks={sprint.tasks?.[epic.id]}
                                                statuses={statuses}></SprintEpic>)
                }
            </main>
        </DragDropContext>
    </div>
}

export default SprintViewWidget;
