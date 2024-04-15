import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"

export async function cancelPlan() {
  const token = getToken().token
  const url = getAPIServerURL("")
}
