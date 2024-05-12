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
  }),
  ImageStyle.configure({
    HTMLAttributes: {
      loading: "lazy",
      alt: "new image",
    },
  }),

  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const Editor = ({ content, onChange }: { content: string; onChange: any }) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  return (
    <div className="">
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
        // children={undefined}
      >
        {""}
      </EditorProvider>
    </div>
  );
};

export default Editor;
// import "../styles.scss";
// import ImageStyle from "@tiptap/extension-image";
// import { EditorProvider, useCurrentEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Document from "@tiptap/extension-document";
// import Heading from "@tiptap/extension-heading";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
// import TextAlign from "@tiptap/extension-text-align";
// import React from "react";
// import Image from "@tiptap/extension-image";
// import Toolbar from "./Toolbar";

// const MenuBar = ({ content }: { content: string }) => {
//   const { editor } = useCurrentEditor();
//   if (!editor) {
//     return null;
//   }

//   return <Toolbar content={content} editor={editor} />;
// };

// const extensions = [
//   Document,
//   Image,
//   Paragraph,
//   Text,
//   Heading,
//   TextAlign.configure({
//     types: ["heading", "paragraph"],
//     alignments: ["left", "center", "right", "justify"],
//     defaultAlignment: "right",
//   }), //   TextStyle.configure({ types: [ListItem.name] }),
//   //   TextStyle.configure({ HTMLAttributes: {ListItem.name} }),
//   ImageStyle.configure({
//     HTMLAttributes: {
//       loading: "lazy",
//       alt: "new image",
//     },
//   }),

//   StarterKit.configure({
//     bulletList: {
//       keepMarks: true,
//       keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//     },
//     orderedList: {
//       keepMarks: true,
//       keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//     },
//   }),
// ];

// const Editor = ({ content, onChange }: { content: string; onChange: any }) => {
//   const handleChange = (newContent: string) => {
//     onChange(newContent);
//   };

//   return (
//     <div className="">
//       <EditorProvider
//         editorProps={{
//           attributes: {
//             class:
//               "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
//           },
//         }}
//         onUpdate={(e) => {
//           handleChange(e.editor.getHTML());
//         }}
//         slotBefore={<MenuBar content={content} />}
//         extensions={extensions}
//         content={content}
//         children={undefined}
//       ></EditorProvider>
//     </div>
//   );
// };

// export default Editor;
