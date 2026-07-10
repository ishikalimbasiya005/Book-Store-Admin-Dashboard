import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, StrikethroughOutlined, UnorderedListOutlined, OrderedListOutlined, UndoOutlined, RedoOutlined } from '@ant-design/icons';
import { CommonButton } from '../../Attributes';
import type { RichTextEditorProps } from '../../Types';

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder, className = '' }) => {
  const editor = useEditor({
    extensions: [ StarterKit, Underline, Placeholder.configure({ placeholder: placeholder || 'Write description...', emptyEditorClass: 'is-editor-empty', }), ],
    content: value,
    onUpdate: ({ editor }) => { onChange(editor.getHTML()); },
    editorProps: {
      attributes: {
        class: 'rich-text-editor__content focus:outline-none min-h-[150px] max-h-[300px] overflow-y-auto p-4 text-sm text-primary-text bg-main-background prose dark:prose-invert max-w-none',
      },
    },
  });

  // Synchronize value from outside
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) { return null; }

  return (
    <div className={`rich-text-editor ${className}`}>
      {/* Toolbar */}
      <div className="rich-text-editor__toolbar">
        {/* Bold */}
        <CommonButton onClick={() => editor.chain().focus().toggleBold().run()} className={`rich-text-editor__btn ${editor.isActive('bold') ? 'rich-text-editor__btn--active' : ''}`} title="Bold" icon={<BoldOutlined />} />

        {/* Italic */}
        <CommonButton onClick={() => editor.chain().focus().toggleItalic().run()} className={`rich-text-editor__btn ${editor.isActive('italic') ? 'rich-text-editor__btn--active' : ''}`} title="Italic" icon={<ItalicOutlined />} />

        {/* Underline */}
        <CommonButton onClick={() => editor.chain().focus().toggleUnderline().run()} className={`rich-text-editor__btn ${editor.isActive('underline') ? 'rich-text-editor__btn--active' : ''}`} title="Underline" icon={<UnderlineOutlined />} />

        {/* Strike */}
        <CommonButton onClick={() => editor.chain().focus().toggleStrike().run()} className={`rich-text-editor__btn ${editor.isActive('strike') ? 'rich-text-editor__btn--active' : ''}`} title="Strike" icon={<StrikethroughOutlined />} />

        <div className="w-[1px] h-4 bg-border-color mx-1 shrink-0" />

        {/* Bullet List */}
        <CommonButton onClick={() => editor.chain().focus().toggleBulletList().run()} className={`rich-text-editor__btn ${editor.isActive('bulletList') ? 'rich-text-editor__btn--active' : ''}`} title="Bullet List" icon={<UnorderedListOutlined />} />

        {/* Ordered List */}
        <CommonButton onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`rich-text-editor__btn ${editor.isActive('orderedList') ? 'rich-text-editor__btn--active' : ''}`} title="Ordered List" icon={<OrderedListOutlined />} />

        <div className="w-[1px] h-4 bg-border-color mx-1 shrink-0" />

        {/* Undo */}
        <CommonButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="rich-text-editor__btn" title="Undo" icon={<UndoOutlined />} />

        {/* Redo */}
        <CommonButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="rich-text-editor__btn" title="Redo" icon={<RedoOutlined />} />
      </div>

      {/* Editor Area */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
