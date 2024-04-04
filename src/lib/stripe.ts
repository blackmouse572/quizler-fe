import { loadStripe } from "@stripe/stripe-js"
const checkout = async (sessionId: string, pubkey: string) => {
  const stripePromise = loadStripe(pubkey)
  const stripe = await stripePromise
  stripe?.redirectToCheckout({ sessionId })
}
export default checkout
