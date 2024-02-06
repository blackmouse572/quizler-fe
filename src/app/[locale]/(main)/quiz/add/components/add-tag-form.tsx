import { Badge } from "@/components/ui/badge"
import { FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"
type AddTagFormProps = {
  initialValues?: string[]
  onTagChange?: (tag: string[]) => void
}
function AddTagForm({ initialValues, onTagChange }: AddTagFormProps) {
  const [tags, setTags] = useState(initialValues || [])
  const i18n = useTranslations("AddQuiz.form")
  const error18n = useTranslations("Validations.errors")
  const { register, setError, formState, handleSubmit, setValue, ...form } =
    useForm({
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

  return (
    <form onSubmit={handleSubmit(handleAddTag)} className="space-y-2">
      <FormItem>
        <Label htmlFor="input">{i18n("tags.label")}</Label>
        <Input {...register("input")} placeholder={i18n("tags.placeholder")} />
        {formState.errors.input && (
          <span className="text-xs text-danger-500">
            {formState.errors.input.message}
          </span>
        )}
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
