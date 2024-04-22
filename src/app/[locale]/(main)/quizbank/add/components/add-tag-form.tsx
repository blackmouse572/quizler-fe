import { Badge } from "@/components/ui/badge"
import { FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { EFormAction } from "@/types"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"

type AddTagFormProps = {
  initialValues?: string[]
  onTagChange?: (tag: string[]) => void
  action?: EFormAction
}

const TAGS = [
  "Math",
  "Science",
  "History",
  "Geography",
  "Literature",
  "Languages",
  "Computer Science",
]

function AddTagForm({
  initialValues,
  onTagChange,
  action = EFormAction.Add,
}: AddTagFormProps) {
  const [tags, setTags] = useState(initialValues || [])
  console.log(initialValues)
  const [filterTags, setFilterTags] = useState(TAGS)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const i18n = useTranslations(
    +action === EFormAction.Add ? "AddQuiz.form" : "EditQuiz.form"
  )
  const subjectI18n = useTranslations("Navbar.subject_item")
  const error18n = useTranslations("Validations.errors")
  const {
    register,
    setError,
    formState,
    handleSubmit,
    setValue,
    watch,
    ...form
  } = useForm({
    values: {
      input: "",
    },
  })

  const handleAddTag = ({ input }: { input: string }) => {
    input = input.trim()
    if (tags.includes(input)) {
      return
    }
    if (input.length < 3) {
      setError("input", {
        type: "manual",
        message: error18n("too_small.string.inclusive", {
          minimum: 3,
        }),
      })
      return
    }
    if (input.length > 40) {
      setError("input", {
        type: "manual",
        message: error18n("too_big.string.inclusive", {
          maximum: 255,
        }),
      })
      return
    }

    if (tags.length >= 10) {
      setError("input", {
        type: "manual",
        message: error18n("too_big.array.not_inclusive", {
          maximum: 10,
        }),
      })
      return
    }
    const tagsArr = [...tags, input]
    setTags(tagsArr)
    onTagChange?.(tagsArr)
    setValue("input", "")
  }

  const handleRemoveTag = (tag: string) => {
    const tagsArr = tags.filter((t) => t !== tag)
    setTags(tagsArr)
    onTagChange?.(tagsArr)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form onSubmit={handleSubmit(handleAddTag)} className="space-y-2">
      <FormItem>
        <Label htmlFor="input">{i18n("tags.label")}</Label>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger className="w-full">
            <Input
              {...register("input", {
                onChange: (e) => {
                  e.preventDefault()
                  const value = e.target.value
                  if (value.length >= 3) {
                    setFilterTags(
                      TAGS.filter((tag) =>
                        tag.toLowerCase().includes(value.toLowerCase())
                      )
                    )
                  } else {
                    setFilterTags(TAGS)
                  }
                },
              })}
              // ref={inputRef}
              placeholder={i18n("tags.placeholder")}
            />
          </PopoverTrigger>
          {formState.errors.input && (
            <span className="text-xs text-danger-500">
              {formState.errors.input.message}
            </span>
          )}
          <PopoverContent
            className="w-full"
            side="top"
            sideOffset={5}
            onOpenAutoFocus={(e) => {
              e.preventDefault()
              inputRef.current?.focus()
            }}
          >
            <div className="flex flex-wrap gap-2">
              {filterTags.map((tag) => (
                <Badge
                  className="cursor-pointer"
                  onClick={() => {
                    setIsPopoverOpen(false)
                    setFilterTags(TAGS)
                    return handleAddTag({ input: tag })
                  }}
                  key={tag}
                >
                  {subjectI18n(tag as any)}
                </Badge>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </FormItem>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {tags.map((tag) => (
            <motion.div
              layout
              key={tag}
              initial={{ scale: 0, x: 100 }}
              animate={{
                scale: 1,
                x: 0,
                transition: {
                  type: "spring",
                  damping: 15,
                  bounce: 0.5,
                },
              }}
              exit={{ scale: 0 }}
            >
              <Badge
                className="cursor-pointer text-primary-foreground transition-colors hover:bg-primary"
                onClick={() => handleRemoveTag(tag)}
                variant={"flat"}
                key={tag}
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </form>
  )
}

export default AddTagForm
