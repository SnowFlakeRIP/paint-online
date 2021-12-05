import React from 'react';
import "../styles/toolbar.scss"
import canState from "../store/canState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const Toolbar = () => {

    const changeColor = e => {
        toolState.setStrokeColor(e.target.value)
        toolState.setFillColor(e.target.value)
    }
    return (
        <div className='toolbar'>
            <button className="toolbar_btn brush"
                    onClick={() => toolState.setTool(new Brush(canState.canvas, canState.socket, canState.sessionId))}/>
            <button className="toolbar_btn rect"
                    onClick={() => toolState.setTool(new Rect(canState.canvas, canState.socket, canState.sessionId))}/>
            <button className="toolbar_btn circle"
                    onClick={() => toolState.setTool(new Circle(canState.canvas, canState.socket, canState.sessionId))}/>
            <button className="toolbar_btn eraser"
                    onClick={() => toolState.setTool(new Eraser(canState.canvas, canState.socket, canState.sessionId))}/>
            <button className="toolbar_btn line"
                    onClick={() => toolState.setTool(new Line(canState.canvas, canState.socket, canState.sessionId))}/>
            <input type="color" onChange={e => changeColor(e)} style={{marginLeft: 10}}/>
            <button className="toolbar_btn undo" onClick={() => canState.undo()}/>
            <button className="toolbar_btn redo" onClick={() => canState.redo()}/>
            <button className="toolbar_btn save"/>
        </div>
    );
};

export default Toolbar;
