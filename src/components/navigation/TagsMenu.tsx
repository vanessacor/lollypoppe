import type { Component } from "solid-js";
import { getTags } from "../../helpers/getTags";
import "./TagsMenuStyles.css";

const tags = await getTags();
const tagsElement = tags.map((tag) => ({ label: tag, url: `/tags/${tag}` }));

type Props = {
  close: () => void;
};
export const TagsMenu: Component<Props> = (props) => {
  return (
    <>
      <div id="tags-modal">
        <div class="modal">
          <header class="modal-header">
            <h2>tags</h2>
            <button onClick={props.close} class="close-button">
              X
            </button>
          </header>
          <ul class="list">
            {tagsElement.map((tag) => {
              const { label, url } = tag;

              return (
                <li>
                  <a href={url}># {label}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
