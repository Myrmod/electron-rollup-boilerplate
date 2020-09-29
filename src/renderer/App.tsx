const { ipcRenderer } = window.require('electron')
import * as React from 'react'
import { useEffect, useState } from 'react'
import { allowDrop, drag, drop } from './util/dragging'

/**
 * @function App
 * @category RendererProcess
 * @example
 * <main>your content</main>
 * @description This component is the entry point of the rendering components
 */
export default function App(): JSX.Element {
   const [data, setData] = useState<any>()

   useEffect(
      () => {
         /**
          * @function initialPayload
          * @category RendererProcess
          * @type EventListener
          * @event initialPayload
          * @description listens for the 'initialPayload' event, triggered by the main process, and updates the current state accordingly.
          */
         ipcRenderer.on('initialPayload', (event: any, initialData: any) => {
            console.info('initialPayload:', initialData)
         })

         /**
          * @function requestUpdateWindow
          * @category RendererProcess
          * @event request-update-window
          * @type EventListener
          * @description listens for the 'request-update-window' event, triggered by the main process inside this window, and updates the current state accordingly.
          */
         ipcRenderer.on('request-update-window', (event: any, eventData: any) => {
            setData(eventData)
         })

         document.addEventListener('drop', (e) => {
            e.preventDefault()
            e.stopPropagation()

            if (e.dataTransfer?.files) {
               for (let i = 0; i < e.dataTransfer.files.length; i++) {
                  console.info('File Path of dragged files: ', e.dataTransfer.files.item(i))
               }
            }
         })

         document.addEventListener('dragover', (e) => {
            e.preventDefault()
            e.stopPropagation()
         })

         document.addEventListener('dragenter', () => {
            console.info('File is in the Drop Space')
         })

         document.addEventListener('dragleave', () => {
            console.info('File has left the Drop Space')
         })
      },
      [],
   )

   return (
      <main>
         <style>{`
            #div1, #div2 {
               width:100px;
               height:50px;
               padding:10px;
               border:1px solid #aaaaaa;
            }
         `}</style>
         <h1>Hello React!</h1>
         <button
            onClick={() => ipcRenderer.send('request-update-window', { id: 0, message: 'test' })}
         >
            update data 0
         </button>
         <button
            onClick={() => ipcRenderer.send('request-update-window', { id: 1, message: 'test' })}
         >
            update data 1
         </button>
         <button
            onClick={() => ipcRenderer.send('request-update-window', { id: 2, message: 'test' })}
         >
            update data 2
         </button>
         <div id='div1' onDrop={drop} onDragOver={allowDrop}>
            <span id='drag' draggable='true' onDragStart={drag}>{data?.message}</span>
         </div>
         <div id='div2' onDrop={drop} onDragOver={allowDrop}></div>
      </main>
   )
}
