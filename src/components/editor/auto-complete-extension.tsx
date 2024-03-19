import { Extension } from "@tiptap/core"
import { debounce } from "lodash"
export interface Autocomplete {
  onLoading: () => void
  onSucess: () => void
  onError: (error: Error) => void
  cancelSignal: AbortController
}
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textAlign: {
      autocomplete: () => ReturnType
      rewite: (
        options: "shorten" | "rephase" | "summary" | "countinue"
      ) => ReturnType
      abortRewrite: () => ReturnType
    }
  }
}
export const AutoCompleteExtension = Extension.create<Autocomplete>({
  name: "autoComplete",
  priority: 100,
  defaultOptions: {
    onLoading: () => {},
    onSucess: () => {},
    onError: (error: Error) => {},
    cancelSignal: new AbortController(),
  },
  onCreate() {
    const debounced = debounce(() => {
      this.editor.commands.autocomplete()
    }, 1200)
    this.editor.on("update", () => {
      const autoComplete = document.getElementById("autocomplete")
      if (autoComplete) {
        autoComplete.remove()
      }
      debounced()
    })
  },
  addCommands() {
    return {
      autocomplete:
        () =>
        ({ commands }) => {
          console.log("autocomplete")
          // 1. Get the current cursor
          const { from } = this.editor.state.selection
          const rightSide = this.editor.state.doc.textBetween(
            from,
            this.editor.state.doc.content.size
          )
          // 2. get the position
          const position = this.editor.view.coordsAtPos(from)

          // If then right side has text, then do nothing
          if (rightSide.length > 0) return false

          const container = document.createElement("div")
          container.id = "autocomplete"
          container.style.position = "absolute"
          container.style.top = `${position.top - 2}px`
          container.style.left = `${position.left + 10}px`
          container.style.color = "hsl(var(--muted-foreground))"
          container.textContent = "Loading..."

          const content = document.createElement("div")
          container.appendChild(content)
          document.body.appendChild(container)

          // 3. A faded out autocompletion is inserted at the current cursor position
          // The user can continue typing or press enter to accept the autocompletion

          return true
        },
      rewite:
        (options: "shorten" | "rephase" | "summary" | "countinue") =>
        ({ commands }) => {
          const selection = this.editor.state.selection
          const text = this.editor.state.doc.textBetween(
            selection.from,
            selection.to
          )
          if (text.length < 10) {
            this.options.onError(new Error("errors.too_small.string.inclusive"))
          }
          //set loading
          this.options.onLoading()
          //call api
          fetch("/ai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            signal: this.options.cancelSignal.signal,
            body: JSON.stringify({ messages: text, options: options }),
          })
            .then((res) => res.body?.getReader())
            .then(async (reader) => {
              if (!reader) return
              const decoder = new TextDecoder()
              while (true) {
                const { value, done } = await reader.read()
                if (done) {
                  this.options.onSucess()
                  break
                }

                const decodedChunk = decoder.decode(value, { stream: true })
                //set chunk
                this.editor.commands.insertContent(decodedChunk)
              }
            })
            .catch((error) => {
              this.options.onError(error)
            })

          return true
        },
      abortRewrite:
        () =>
        ({ commands }) => {
          console.log("aborting")
          this.options.cancelSignal.abort()
          return true
        },
      //   setTextAlign:
      //     (alignment: string) =>
      //     ({ commands }) => {
      //       if (!this.options.alignments.includes(alignment)) {
      //         return false
      //       }

      //       return this.options.types.every((type) =>
      //         commands.updateAttributes(type, { textAlign: alignment })
      //       )
      //     },

      //   unsetTextAlign:
      //     () =>
      //     ({ commands }) => {
      //       return this.options.types.every((type) =>
      //         commands.resetAttributes(type, "textAlign")
      //       )
      //     },
    }
  },
  addKeyboardShortcuts() {
    return {
      "Mod-m": () => this.editor.commands.autocomplete(),
      "Mod-h": () => this.editor.commands.rewite("shorten"),
      "Mod-Shift-c": () => this.editor.commands.abortRewrite(),
    }
  },
})
