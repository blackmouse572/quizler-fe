import { deleteClassroom } from "../actions/delete-classroom"

export const onDeleteClassroom = async (
  itemId: number,
  deleteSucceedCb: () => void,
  deleteFailCb: (message: string) => void
) => {
  const result = await deleteClassroom(itemId.toString())
  if (!result.isSuccess) {
    deleteFailCb(result.message)
  } else {
    deleteSucceedCb()
  }
}
