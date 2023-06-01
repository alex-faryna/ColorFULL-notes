import './navigation-menu.component.css'

export interface NavigationMenuItem {
    label: string,
    icon?: string;
}

function NavigationMenuComponent({ items, mini = false }: { items: NavigationMenuItem[], mini?: boolean }) {
    return <nav className='navigation-menu'>
        { items.map((item, id) => <div key={id} className='navigation-menu-item'>
            { item.label }
        </div>) }
        { items.map((item, id) => <div key={id} className='navigation-menu-item'>
            { item.label }
        </div>) }
        { items.map((item, id) => <div key={id} className='navigation-menu-item'>
            { item.label }
        </div>) }
        { items.map((item, id) => <div key={id} className='navigation-menu-item'>
            { item.label }
        </div>) }
        { items.map((item, id) => <div key={id} className='navigation-menu-item'>
            { item.label }
        </div>) }
        { items.map((item, id) => <div key={id} className='navigation-menu-item'>
            { item.label }
        </div>) }
    </nav>
}

export default NavigationMenuComponent;
