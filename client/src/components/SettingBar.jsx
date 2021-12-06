import React from 'react';
import toolState from "../store/toolState";

const SettingBar = () => {
    return (
        <div className='setting-bar ' >
            <label style={{marginLeft:10}} htmlFor="line-width">Толщина линни</label>
            <input
                id={"line-width"}
                style={{margin:'0 10px'}}
                type="number"
                defaultValue={1}
                min={1}
                max={50}
                onChange={event => toolState.setLineWidth(event.target.value)}
            />
            <label htmlFor="stroke-color">Цвет обводки</label>
            <input onChange={e => toolState.setStrokeColor(e.target.value)} style={{margin:'0 10px'}} id={"stroke-color"} type="color"/>

        </div>
    );
};

export default SettingBar;
