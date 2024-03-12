type Props = {
  isLoading: boolean
  fieldData: any | null
}

export default function ResultLoading({ isLoading, fieldData }: Props) {
  return (
    <>
      {isLoading && <>Loading ...</>}

      {!isLoading && !fieldData?.length && <>No result</>}
    </>
  )
}
