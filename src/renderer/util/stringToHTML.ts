/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
export const stringToHTML = (str: string): Node | null => {
   const doc = new DOMParser().parseFromString(str, 'text/html');
   console.log(doc);

   return doc.body.firstChild;
};
