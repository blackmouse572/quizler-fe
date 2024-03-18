"use client"
import "@/app/[locale]/editor.css"
import { Icons } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { EditorConfig } from "@/types"
import CharacterCount from "@tiptap/extension-character-count"
import Highlight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import {
  BubbleMenu,
  EditorContent,
  Editor as EditorJs,
  EditorOptions,
  useEditor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useTranslations } from "next-intl"
import React, { useMemo, useRef } from "react"
type Props = Partial<EditorOptions> & {
  placeholder?: string
  limit?: number
}

const Editor = React.forwardRef<EditorJs | null, Props>(
  ({ extensions, placeholder, editorProps, limit, ...props }, ref) => {
    const exts = extensions || []
    const editorI18N = useTranslations("Editor")
    const editor = useEditor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: placeholder,
          emptyEditorClass: "empty-editor is-editor-empty",
        }),
        CharacterCount.configure({
          limit: 5000,
          mode: "textSize",
        }),
        Highlight.configure({
          multicolor: true,
        }),
        ...exts,
      ],
      editorProps: {
        ...editorProps,
        attributes: {
          class: cn(
            "prose prose-sm w-full max-w-none rounded-md border border-input bg-background px-4 py-2.5 sm:prose-base dark:prose-invert",
            "prose-p:my-0",
            editorProps?.attributes
              ? editorProps.attributes[
                  "class" as keyof typeof editorProps.attributes
                ]
              : ""
          ),
        },
      },
      ...props,
    })
    const editorRef: React.MutableRefObject<EditorJs | null> = useRef(null)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const menuItems: EditorConfig[][] = [
      [
        {
          label: editorI18N("marks.bold"),
          isOn: editor?.isActive("bold") || false,
          onClick: () => editor?.chain().focus().toggleBold().run(),
          icon: "Bold",
        },
        {
          label: editorI18N("marks.italic"),
          isOn: editor?.isActive("italic") || false,
          onClick: () => editor?.chain().focus().toggleItalic().run(),
          icon: "Italic",
        },
        {
          label: editorI18N("marks.strike"),
          isOn: editor?.isActive("strike") || false,
          onClick: () => editor?.chain().focus().toggleStrike().run(),
          icon: "Strike",
        },
        {
          label: editorI18N("marks.code"),
          isOn: editor?.isActive("code") || false,
          onClick: () => editor?.chain().focus().toggleCode().run(),
          icon: "Code",
        },
        {
          label: editorI18N("marks.highlight"),
          isOn: editor?.isActive("highlight") || false,
          onClick: () => editor?.chain().focus().toggleHighlight().run(),
          icon: "Hightline",
        },
      ],
      [
        {
          label: editorI18N("nodes.list"),
          isOn: editor?.isActive("bulletList") || false,
          onClick: () => editor?.chain().focus().toggleBulletList().run(),
          icon: "Bullet",
        },
        {
          label: editorI18N("nodes.heading"),
          isOn: editor?.isActive("heading", { level: 1 }) || false,
          onClick: () =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run(),
          icon: "Heading1",
        },

        {
          label: editorI18N("nodes.heading"),
          isOn: editor?.isActive("heading", { level: 2 }) || false,
          onClick: () =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run(),
          icon: "Heading2",
        },
        {
          label: editorI18N("nodes.heading"),
          isOn: editor?.isActive("heading", { level: 3 }) || false,
          onClick: () =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run(),
          icon: "Heading3",
        },
        {
          label: editorI18N("nodes.blockquote"),
          isOn: editor?.isActive("blockquote") || false,
          onClick: () => editor?.chain().focus().toggleBlockquote().run(),
          icon: "Quote",
        },
      ],
    ]

    const renderMenu = useMemo(() => {
      return menuItems.map((group) => {
        return (
          <ToggleGroup type="multiple">
            {group.map((item, index) => {
              const Icon = Icons[item.icon]
              return (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      key={index}
                      size="sm"
                      onClick={item.onClick}
                      data-state={item.isOn ? "on" : "off"}
                      value={item.label}
                    >
                      <Icon />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent>{item.label}</TooltipContent>
                </Tooltip>
              )
            })}
          </ToggleGroup>
        )
      })
    }, [menuItems])

    if (!editor) {
      return <Skeleton className="h-32 w-full" />
    }
    editorRef.current = editor

    return (
      <>
        <EditorContent
          editor={editor}
          id="editor"
          classID="editor"
          className="relative"
        >
          {limit && (
            <p className="absolute bottom-2.5 right-4 z-10 text-xs text-muted-foreground">
              {editorRef?.current?.storage.characterCount.characters()} /{" "}
              {limit}
            </p>
          )}
        </EditorContent>

        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className=""
        >
          <menu className="flex w-fit gap-2 rounded-md border border-border bg-background px-2 py-2.5 shadow-md">
            {renderMenu}
          </menu>
        </BubbleMenu>
      </>
    )
  }
)

Editor.displayName = "Editor"

export default Editor
