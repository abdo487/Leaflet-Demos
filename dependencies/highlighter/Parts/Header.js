import Clipboard from "../helpers/Clipboard.js";
import { convert_to_svg } from "../helpers/utils.js";
import icons from "./icons/icons.js";
export default class Header {
  constructor(parent) {
    this.parent = parent;

    this.element = document.createElement("div");
    this.element.classList.add("editor-header");
    this.editor_actions = document.createElement("div");

    this.copy_action = document.createElement("div");
    this.copy = convert_to_svg(icons["icon-copy"]);
    this.copied = document.createElement("span");
    this.copy_action.append(this.copy, this.copied);

    this.editor_actions.append(this.copy_action);

    this.element.appendChild(this.editor_actions);

    this.consig_elements();
    this._config_actions();
  }

  _config_actions() {
    const text = this.parent.editor.lines.join("\n");
    let copied = this.copied;
    this.copy.addEventListener("click", () => {
      let clipboard = new Clipboard();
      clipboard.copy(text);
      copied.classList.add("copied-show");
      setTimeout(() => {
        copied.classList.remove("copied-show");
      }, 1500);
    });
  }
  consig_elements() {
    this.editor_actions.classList.add("editor-actions");

    this.copy_action.classList.add("editor-action-copy");
    this.copy.classList.add("icon-copy");
    this.copied.classList.add("copied");
    this.copied.innerHTML = "Copied!";
  }
  render() {
    return this.element;
  }
}
