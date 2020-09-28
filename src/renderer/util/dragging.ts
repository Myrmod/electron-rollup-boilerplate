import { stringToHTML } from './stringToHTML'

export function allowDrop(allowdropevent: any) {
   allowdropevent.preventDefault()
}

export function drag(dragevent: any) {
   dragevent.dataTransfer.setData('text', dragevent.target.outerHTML)
}

export function drop(dropevent: any) {
   dropevent.preventDefault()
   const data = dropevent.dataTransfer.getData('text')

   dropevent.target.appendChild(stringToHTML(data))
}
