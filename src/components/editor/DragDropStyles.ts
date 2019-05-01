import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

const grid = 4;

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): any => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  display: "flex",

  // change background colour if dragging
  background: isDragging ? "lightgrey" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "transparent",
  padding: grid,
  display: "flex",
  overflow: "auto",
  minHeight: 200,
  minWidth: 200
});

export const getTrayStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "transparent",
  padding: grid,
  display: "flex",
  overflow: "auto",
  minHeight: 100
});
