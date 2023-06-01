

export type Id = number;

/*export interface WidgetModel {
    id: Id;
    params: Record<string, WidgetParam>
    // params?
    inputs: InputInterface;
    outputs?: Interface;
}*/

export interface WidgetLinkModel {
    from: Id;
    to: Id;
}

export interface CustomPageLayoutModel {
    id: Id; // mb uuid
    widgets: Id[],
    links?: WidgetLinkModel[],
}

/*



// ENTITIES in out system:

//   - user
  // - task
  // - period






interface Entity {
    id: Id;
    type: string;
}

interface ValueEntity extends Entity {
    value: unknown; // idk for now
}

interface Interface {
    type: Id;
    multiple: boolean; // can be array or not
}

interface InputInterface extends Interface {
    default: Entity;
}

enum WidgetParamTypes {
    NUMBER,
    STRING,
    BOOLEAN,
    ENTITY
}

interface WidgetParam {
    type: WidgetParamTypes;
    value: unknown;
    multiple: boolean;
}

interface Widget {
    id: Id;
    params: Record<string, WidgetParam>
    // params?
    inputs: InputInterface;
    outputs?: Interface;
}

interface WidgetLink {
    from: Id;
    to: Id;
}

interface CustomPageLayout {
    id: Id; // mb uuid
    widgets: Widget[],
    links?: WidgetLink[],
}

// in backend we will have api for entities
// api/entities/user
// api/entities/status
// api/entities/epic */
