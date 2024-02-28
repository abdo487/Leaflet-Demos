import { Highlighter } from "../../dependencies/Highlighter/Highlighter.js";


// exemple 1
var list = document.getElementsByTagName("code")
for (var i = 0; i < list.length; i++) {
  var options = {
    name: "My Code Editor",
    language: list[i].dataset.lang,
    theme: "dark",
    code: list[i].innerHTML,
  };
  const highlighter = new Highlighter(list[i], options).render();
}


