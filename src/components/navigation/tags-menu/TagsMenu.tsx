import type { Component } from "solid-js";
import "./TagsMenuStyles.css";

type Props = {
  tags: string[];
  close: () => void;
};
export const TagsMenu: Component<Props> = (props) => {
  const tagsElement = props.tags.map((tag) => ({ label: tag, url: `/tags/${tag}` }));

  return (
    <>
      <div id="tags-modal">
        <div class="modal">
          <header class="modal-header">
            <h2>Tags</h2>
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
