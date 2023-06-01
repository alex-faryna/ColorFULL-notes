import React, {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {stubDataLoaded} from "./store/task-organizer-state";
import "./common-classes.css"
import SideMenu from "./components/side-menu/SideMenu";
import {ColorBubble} from './models/color.utils';


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(stubDataLoaded());
    }, []);

    const getBubbleContainerAnimation = (top: number) => [
        {
            transform: `translateY(${top}px)`,
            easing: "ease-out",
        },
        {
            transform: `translateY(25px)`,
            offset: 0.35,
            easing: "ease-in",
        },
        {
            transform: `translateY(110px)`,
        }
    ];
    const getBubbleAnimation = (left: number, color: string, ppp = 50) => [
        {
            opacity: 1,
            borderRadius: "50%",
            transform: `translateX(${left}px)`,
            easing: "ease-in-out",
        },
        {
            borderRadius: "35%",
            offset: 0.65,
            width: "50px",
            aspectRatio: 1.3,
        },
        {
            borderRadius: "6px",
            offset: 0.75,
            width: "75px",
            aspectRatio: 2.5,
            opacity: 1,
        },
        {
            borderColor: color,
            borderRadius: "4px",
            width: "200px",
            aspectRatio: 3.3,
            transform: `translateX(${ppp + 92 }px)`,
            opacity: 0.35,
        }
    ];
    const bubbleRef = useRef<HTMLDivElement>(null);

    const bubbleClick = (bubble: ColorBubble) => {
        const color = bubble.color.color;
        const target = (bubble.event.target as HTMLElement).getBoundingClientRect();
        const bubbleContainer = bubbleRef.current!;
        const bubbleElement = bubbleRef.current!.firstElementChild as HTMLElement;
        bubbleElement.style.background = color;
        bubbleElement.animate(getBubbleAnimation(target.left, color), {duration: 400});
        bubbleContainer.animate(getBubbleContainerAnimation(target.top), {duration: 400});
    }

    return <>
        <SideMenu bubbleClick={bubbleClick}/>
        <div ref={bubbleRef} className='bubble-container'>
            <div className='bubble'></div>
        </div>
        {
            /*

        <app-notes-list class="notes"></app-notes-list>

             */
        }
    </>
}

export default App;
