"use client";
import "../styles.scss";
import ImageStyle from "@tiptap/extension-image";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import React from "react";
import Image from "@tiptap/extension-image";
import Toolbar from "./Toolbar";

const MenuBar = ({ content }: { content: string }) => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }

  return <Toolbar content={content} editor={editor} />;
};

const extensions = [
  Document,
  Image,
  Paragraph,
  Text,
  Heading,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
    defaultAlignment: "right",
  }), //   TextStyle.configure({ types: [ListItem.name] }),
  //   TextStyle.configure({ HTMLAttributes: {ListItem.name} }),
  ImageStyle.configure({
    HTMLAttributes: {
      loading: "lazy",
      alt: "new image",
    },
  }),

  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

// const content = `
// <h1>
//   Hi there,
// </h1>
// <p>
//   this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
// </p>
// <ul>
//   <li>
//     That’s a bullet list with one …
//   </li>
//   <li>
//     … or two list items.
//   </li>
// </ul>
// <p>
//   Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
// </p>
// <pre><code class="language-css">body {
// display: none;
// }</code></pre>
// <p>
//   I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
// </p>
// <blockquote>
//   Wow, that’s amazing. Good work, boy! 👏
//   <br />
//   — Mom
// </blockquote>
// <Image alt="i luv me" src="https://source.unsplash.com/8xznAGy4HcY/800x400" />

// `;

export default ({ content, onChange }: { content: string; onChange: any }) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  return (
    <div className="">
      {/* <div
        className="ProseMirror  rounded-lg"
        dangerouslySetInnerHTML={{ __html: content }}
        // style={{ whiteSpace: "pre-line" }}
      /> */}
      <EditorProvider
        editorProps={{
          attributes: {
            class:
              "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
          },
        }}
        onUpdate={(e) => {
          handleChange(e.editor.getHTML());
        }}
        slotBefore={<MenuBar content={content} />}
        extensions={extensions}
        content={content}
        children={undefined}
      ></EditorProvider>
    </div>
  );
};
