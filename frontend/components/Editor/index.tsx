'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import MenuBar from './Menu-bar';

interface IProps {
  onChange: (value: string) => void;
  value: string;
}

export default function Editor({ onChange, value }: IProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-3',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-3',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
        HTMLAttributes: {
          class: 'inline-block w-[100%] sm:w-[30%] h-auto p-1 md:p-2',
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'min-h-[156px] md:min-h-[200px] border rounded-md dark:bg-gray-800 dark:text-white py-2 px-3',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="">
      <MenuBar editor={editor} />
      <EditorContent
        className="h-[160px] bg-gray-100 dark:bg-gray-800 md:h-[200px] overflow-auto w-full"
        editor={editor}
      />
    </div>
  );
}
