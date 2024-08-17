

export default function make(tag, classes, id){
    const element = document.createElement(tag);
    if (typeof classes === "string") {
      element.className = classes;
    } else if (Array.isArray(classes)) {
      element.className = classes.join(" ");
    }
    if (id !== "" && id !== null && id !== undefined) {
      element.id = id;
    }
    return element;
}