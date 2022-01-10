import React, {useCallback} from 'react';
import {useEditor, EditorContent, Editor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import styled from 'styled-components';
import {ButtonIcon} from '../button';
import {
  IconBold,
  IconExpand,
  IconItalic,
  IconLinkSet,
  IconLinkUnset,
  IconListOrdered,
  IconListUnordered,
} from '../icons';

type MenuBarProps = {
  editor: Editor | null;
};

const MenuBar: React.FC<MenuBarProps> = ({editor}) => {
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange('link').setLink({href: url}).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <StyledMenuBar>
      <Toolgroup>
        <ButtonIcon
          icon={<IconBold />}
          mode="ghost"
          isActive={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ButtonIcon
          icon={<IconItalic />}
          mode="ghost"
          isActive={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        {/* TODO: This button is dummy for now */}
        <ButtonIcon
          icon={<IconLinkSet />}
          mode="ghost"
          isActive={editor.isActive('link')}
          onClick={setLink}
        />
        <ButtonIcon
          icon={<IconLinkUnset />}
          mode="ghost"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
        />
        <ButtonIcon
          icon={<IconListOrdered />}
          mode="ghost"
          isActive={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ButtonIcon
          icon={<IconListUnordered />}
          mode="ghost"
          isActive={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
      </Toolgroup>
      {/* TODO: This button is dummy for now */}
      <ButtonIcon icon={<IconExpand />} mode="ghost" />
    </StyledMenuBar>
  );
};

export type TextareaWYSIWYGProps = {
  placeholder: string;
};

export const TextareaWYSIWYG: React.FC<TextareaWYSIWYGProps> = ({
  placeholder,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Placeholder.configure({
        placeholder,
      }),
    ],
  });

  return (
    <Container>
      <MenuBar editor={editor} />
      <StyledEditorContent editor={editor} />
    </Container>
  );
};

const Container = styled.div.attrs({
  className:
    'rounded-xl w-full border-2 border-ui-100 hover:border-ui-300 disabled:bg-ui-100 disabled:border-ui-200 bg-white text-ui-600',
})`
  :focus-within {
    border-color: #003bf5;
  }

  ::-webkit-input-placeholder {
    color: #9aa5b1;
  }
  ::-moz-placeholder {
    color: #9aa5b1;
  }
  :-ms-input-placeholder {
    color: #9aa5b1;
  }
  :-moz-placeholder {
    color: #9aa5b1;
  }
`;

const StyledMenuBar = styled.div.attrs({
  className: 'rounded-t-xl bg-ui-50 px-2 py-1.5 flex justify-between',
})``;

const Toolgroup = styled.div.attrs({
  className: 'flex space-x-1.5',
})``;

const StyledEditorContent = styled(EditorContent)`
  .ProseMirror {
    padding: 12px 16px;
    min-height: 112px;

    :focus {
      outline: none;
    }

    ul {
      list-style-type: decimal;
      padding: 0 1rem;
    }

    ol {
      list-style-type: disc;
      padding: 0 1rem;
    }

    a {
      color: #003bf5;
      cursor: pointer;
      font-weight: 700;

      :hover {
        color: #0031ad;
      }
    }
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`;
