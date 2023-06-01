import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {stubDataLoaded} from "./store/task-organizer-state";
import "./common-classes.css"
import Button from '@mui/material/Button';
import {Add} from "@mui/icons-material";

export interface Color {
    id: number;
    color: string;
}

export interface ColorBubble {
    color: Color;
    event: MouseEvent;
}

export const COLORS = [
    "#ff7459",
    "#81d26e",
    "#5678ff",
    "#fdbc59",
    "#fdf375",
    "#424242"
];

export const THEME_COLORS = COLORS.map((color, id) => ({id, color}));

export const getContrastColor = (hex: string) => {
    hex = hex.charAt(0) === "#" ? hex.substring(1,7) : hex;
    const colorBrightness = hexToCol(hex, 0, 299) + hexToCol(hex, 2, 587) + hexToCol(hex, 4, 114);
    return colorBrightness > 130000 ? "#000000" : "#ffffff"
}

const hexToCol = (hex: string, idx: number, mult: number): number => {
    return parseInt(hex.substring(idx,idx + 2),16) * mult;
}

function SideMenu() {
    const BUBBLE_FRAME_TIME = 85;
    const rawAnimation = [
        {transform: "translateY(0)", easing: "ease-out"},
        ...THEME_COLORS.map((_, i) => ({
            transform: `translateY(${20 + (i + 1) * 36}px)`,
        })),
    ];
    const colors = THEME_COLORS.reverse();
    const [showColors, setShowColors] = useState(false);
    const bubbles = useRef<HTMLElement[]>([]);

    const toggle = () => {
        animate(!showColors);
        setShowColors(!showColors);
    }

    const animate = (show: boolean) => {
        const easing = showColors ? "ease-out" : 'ease-in';
        const animation = rawAnimation.map(anim => ({...anim, easing}));
        (showColors ? bubbles.current : bubbles.current.reverse()).forEach((bubble, i) => {
            console.log(bubble);
            bubble.animate(animation.slice(0, i + 2), {
                duration: BUBBLE_FRAME_TIME * (i + 1),
                delay: show ? 0 : BUBBLE_FRAME_TIME * (bubbles.current.length - i),
                fill: "forwards",
                direction: show ? "normal" : "reverse",
            });
        });
        bubbles.current = [];
    }

    return <div className='side-menu'>
        <div className='flex-column relative'>
            <Button variant='contained' className="z1" onClick={toggle}>
                <Add />
            </Button>
            {
                colors.map(color => <div key={color.id}
                                         ref={elem => elem ? bubbles.current.push(elem!) : null}
                                         className="color-bubble absolute pointer"
                                         style={{ background: color.color }}>

                </div>)
            }
            <span className="test">More</span>
        </div>
    </div>
}

{
    /*
    <div class="flex-column relative">
      <button mat-mini-fab class="z1" (click)="showColors = !showColors; animateBubbles(showColors)">
        <mat-icon>add</mat-icon>
      </button>
      <div *ngFor="let color of colors" #colorBubble
           class="color-bubble absolute pointer"
           [style.background]="color.color"
           (click)="bubbleClicked(color, $event)"
      ></div>
      <span class="test" (click)="more()">More</span>
    </div>

     */
}


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

    return <>
        <SideMenu />
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
