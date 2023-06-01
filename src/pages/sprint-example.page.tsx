import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import React, {useEffect} from "react";
import {stubDataLoaded} from "../store/task-organizer-state";
import SprintViewWidget from "../widgets/sprint-view/sprint-view.widget";

function SprintExamplePage() {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.organizer);
    const loading = useSelector((state: RootState) => ['loading', 'idle'].includes(state.organizer.loading));

    useEffect(() => {
        dispatch(stubDataLoaded());
    }, []);

    return loading ? <span>Loading</span> :
        <SprintViewWidget statuses={state.statues} epics={state.epics} sprint={state.sprints[0]}></SprintViewWidget>
}

export default SprintExamplePage;
