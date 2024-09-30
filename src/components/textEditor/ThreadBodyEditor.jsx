import React, { useCallback } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import Dropcursor from '@tiptap/extension-dropcursor';
import FileHandler from '@tiptap-pro/extension-file-handler';
import Mathematics from '@tiptap-pro/extension-mathematics';
import { all, createLowlight } from 'lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import 'katex/dist/katex.min.css'
import '../../styles/tiptapStyles.css';
import { CodeWithoutSpellcheck } from '../../tiptapCustomExtensions/CodeWithoutSpellcheck';
import { CodeBlockWithoutSpellcheck } from '../../tiptapCustomExtensions/CodeBlockWithoutSpellcheck';

const ThreadBodyEditor = () => {
  const lowlight = createLowlight(all)
  const limit = 3000;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Blockquote,
      BulletList,
      CodeBlockWithoutSpellcheck.configure({
        lowlight,
        defaultLanguage: 'js',
      }),
      Document,
      HardBreak,
      Heading,
      Image.configure({
        allowBase64: true,
      }),
      Paragraph,
      Text,
      Bold,
      CodeWithoutSpellcheck,
      Italic,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Subscript,
      Superscript,
      Underline,
      CharacterCount.configure({ limit }),
      Dropcursor,
      Mathematics,
      Placeholder.configure({ placeholder: 'Write something ...' }),
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent) // eslint-disable-line no-console
              return false
            }

            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run()
            }
          })
        },
      }),
    ],
    content: '<p></p>',
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor]);
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const buttons = [
    {
      command: () => editor.chain().focus().setParagraph().run(),
      label: 'Paragraph',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleBold().run(),
      label: 'Bold',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleItalic().run(),
      label: 'Italic',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleUnderline().run(),
      label: 'Underline',
      styles: ''
    },
    {
      command: setLink,
      label: 'Link',
      styles: ''
    },
    {
      command: () => editor.chain().focus().unsetLink().run(),
      label: 'Unlink',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleBulletList().run(),
      label: 'Bullet List',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      label: 'Heading',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      label: 'Sub-Heading',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      label: 'Code Block',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleCode().run(),
      label: 'Code',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleBlockquote().run(),
      label: 'Blockquote',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleSubscript().run(),
      label: 'Subscript',
      styles: ''
    },
    {
      command: () => editor.chain().focus().toggleSuperscript().run(),
      label: 'Superscript',
      styles: ''
    },
    {
      command: addImage,
      label: 'Image',
      styles: ''
    },
  ];


  return (
    <div className="flex flex-col w-[60rem] mx-auto my-8 p-4 border rounded shadow-lg text-white">
      {editor && (
        <div className="mb-4 flex flex-wrap gap-2 p-2 rounded">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`px-2 py-1 border rounded hover:bg-gray-600 focus:outline-none ${editor.isActive(button.label.toLowerCase()) ? 'bg-gray-700' : ''} ${button.styles}`}
              onClick={button.command}
            >
              {button.label}
            </button>
          ))}
        </div>
      )}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-200"
            onClick={buttons.find((button) => button.label === "Bold").command}
          >
            Bold
          </button>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-200"
            onClick={buttons.find((button) => button.label === "Italic").command}
          >
            Italic
          </button>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-200"
            onClick={buttons.find((button) => button.label === "Underline").command}
          >
            Underline
          </button>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-200"
            onClick={setLink}
          >
            Link
          </button>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-200"
            onClick={buttons.find((button) => button.label === "Unlink").command}
          >
            Unlink
          </button>
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        className="p-4 border border-neutral-700 rounded min-h-40 shadow-sm focus:outline-none hover:border-neutral-500 hover:bg-neutral-700"
        onClick={() => editor.commands.focus()}
      />
      {editor && (
        <div className="flex self-end mt-2 mr-2 text-sm text-gray-200">
          {editor.storage.characterCount.characters()}/{limit}
        </div>
      )}
    </div>
  );
};

export default ThreadBodyEditor;
