import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {CustomPageLayoutModel} from "../models/entity.model";

function UsersListWidget() {



    const users = [
        {
            id: 0,
            name: 'Alex',
            surname: 'Faryna'
        },
        {
            id: 1,
            name: 'Nico',
            surname: 'Saez'
        },
        {
            id: 2,
            name: 'Liam',
            surname: 'Arjona'
        },
        {
            id: 3,
            name: 'Alex',
            surname: 'Feja'
        },
        {
            id: 4,
            name: 'Svyatoslav',
            surname: 'Syvakiskyi'
        },
        {
            id: 5,
            name: 'Daivd',
            surname: 'Gamayun'
        },
        {
            id: 15,
            name: 'Oleg',
            surname: 'Boichuk'
        },
        {
            id: 14,
            name: 'Svyatoslav',
            surname: 'Syvakiskyi'
        },
        {
            id: 51,
            name: 'Daivd',
            surname: 'Gamayun'
        },
        {
            id: 52,
            name: 'Oleg',
            surname: 'Boichuk'
        },
    ];


    return <div className='widget-container border row radius-6 p-1' style={{ gap: '10px', overflow: "auto" }}>
        {
            users.map(user => <div key={user.id} className='column-stretch radius-6 border p-1'>
                <span>{ user.name }</span>
                <span>{ user.surname }</span>
            </div>)
        }
    </div>
}


function CustomPage() {
    let { pageId } = useParams();

    const [test, setTest] = useState('init');

    useEffect(() => {
        // ... load data ...
        const loadedConfig: CustomPageLayoutModel = {
            id: 1,
            widgets: [],
            links: [],
        }

        // we have entities in the backend: task, user,
        const config = {
            id: 111, // uuid

            // widgets can have no inputs: users list, status list, epics list - basically the input is this project but for now let's omit that
            // so left widget is users list
            // right widget is epics list

            // the sprint view accepts 2 inputs, one of entity user and one of entity epic

            // widgets are preconfigured, but every widget can be additionally configured:
            // single or multiple values for each input - YES
            // is the type configurable or not? i think for now NO
            // maybe later combine multiple sources into one input or smth

            // to dto function for each widget, so we can compactly keep the inputs multiple or not without storgin everything
            // the inputs for now are single only, will add multiple later
            widgets: [
                {
                    id: 222,
                },
                {
                    id: 123, // uuid
                },
                {
                    id: 890, // uuid
                },
                {
                    id: 456, // uuid
                }
            ],
            links: [
                {
                    from: 222,
                    to: 123,
                },
                {
                    from: 123, // uuid
                    to: 456, // uuid
                },
                {
                    from: 789, // uuid
                    to: 456 // uuid
                }
            ]
        }

        console.log(`make request to get config: ${pageId} ${test}`);
    }, [pageId]);

    /*return <>
        <span>{ test }</span>
        <span onClick={() => setTest('cool')}>{ pageId }</span>
        <Link relative='path' to={'../other'}>LLL</Link>
    </>*/

    return <div className='row relative container w-full p-2' style={{ gap: '1rem' }}>
        <div className='container' style={{ flex: '0 0 50%' }}>
            <UsersListWidget />
        </div>
        <div className='container' style={{ flex: '1 0 50%' }}>
            Hello
        </div>
    </div>
}

export default CustomPage;
