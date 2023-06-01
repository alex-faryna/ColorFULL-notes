import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {stubDataLoaded} from "./store/task-organizer-state";
import "./common-classes.css"
import SideMenu from "./components/side-menu/SideMenu";
import { Color } from './models/color.utils';


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(stubDataLoaded());
    }, []);

    const navigationItems = [
        { label: 'Test 1' },
        { label: 'Test 2' },
        { label: 'Test 3' },
        { label: 'Test 4' },
        { label: 'Test 5' },
        { label: 'Test 6' },
    ]

    const bubbleClick = (color: Color, event: React.MouseEvent) => {
        console.log(color);
        console.log(event);
    }

    return <>
        <SideMenu bubbleClick={bubbleClick}/>
        {
            /*
             <app-side-menu (bubbleClick)="addNote($event)"></app-side-menu>
        <app-notes-list class="notes"></app-notes-list>
        <div #bubble class="bubble-container">
            <div class="bubble"></div>
    </div>
             */
        }
    </>
}

export default App;
