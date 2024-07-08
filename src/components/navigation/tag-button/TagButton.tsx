import { Show, createSignal } from "solid-js";
import type { Component } from "solid-js";
import { TagsMenu } from "../tags-menu/TagsMenu";
import "./TagButtonStyles.css";

type Props = {
  isActive: boolean;
};

export const TagButton: Component<Props> = (props) => {
  const { isActive } = props;

  const [isMenuOpen, setMenuOpen] = createSignal(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen());
  };

  return (
    <>
      <button
        class="tag-button"
        classList={{ ["active"]: isActive }}
        onClick={toggleMenu}
      >
        Tags
      </button>
      <Show when={isMenuOpen()}>
        <TagsMenu close={toggleMenu} />
      </Show>
    </>
  );
};
