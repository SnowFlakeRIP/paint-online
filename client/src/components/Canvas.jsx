import React, {useEffect, useRef, useState} from 'react';
import "../styles/canvas.scss"
import {observer} from "mobx-react-lite";
import canState from "../store/canState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import {Button, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom"
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const Canvas = observer(() => {

    const canvasRef = useRef()
    const userNameRef = useRef()
    const [modal, setModal] = useState(true)
    const params = useParams()

    useEffect(() => {
        canState.setCanvas(canvasRef.current)
    }, [])

    useEffect(() => {
        if (canState.username) {
            const socket = new WebSocket(`ws://localhost:5000/`);
            canState.setSocket(socket)
            canState.setSessionId(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                console.log('Подключение установлено')
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method) {
                    case "connection":
                        console.log(`пользователь ${msg.username} присоединился`)
                        break
                    case "draw":
                        drawHandler(msg)
                        break
                }
            }
        }
    }, [canState.username]);


    const connectionHandler = () => {
        canState.setUsername(userNameRef.current.value)
        setModal(false)
    }

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case "brush":
                console.log(msg)
                Brush.draw(ctx, figure.x, figure.y, figure.color,figure.line_width)
                break
            case "finish":
                ctx.beginPath()
                break
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.fill_color, figure.stroke_color, figure.line_width)
                break
            case "circle":
                Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.fill_color, figure.stroke_color)
                break
            case "eraser":
                Eraser.staticDraw(ctx, figure.x, figure.y,figure.line_width)
                break
            case "line":
                Line.staticDraw(ctx, figure.x, figure.y, figure.cx, figure.cy, figure.fill_color, figure.stroke_color,figure.line_width)
                break

        }
    }


    const mouseDownHandler = () => {
        canState.pushToUndo(canvasRef.current.toDataURL())
    }

    return (
        <div className='canvas'>
            <Modal show={modal} onHide={() => {
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={userNameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => connectionHandler()}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={900} height={600}/>
        </div>
    );
});

export default Canvas;
