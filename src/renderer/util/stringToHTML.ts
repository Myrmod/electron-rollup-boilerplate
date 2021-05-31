/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @category RendererProcess
 * @return {HTMLElement} The template HTML
 */
export function stringToHTML(str: string): Node | null {
   const doc = new DOMParser().parseFromString(str, 'text/html')

   return doc.body.firstChild
}
