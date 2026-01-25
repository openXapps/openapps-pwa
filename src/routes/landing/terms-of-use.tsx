import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"


type TsAndCsProps = {
  coolBeans: Dispatch<SetStateAction<boolean>>
  setTcOpen: Dispatch<SetStateAction<boolean>>
}

// https://github.com/remarkjs/react-markdown?tab=readme-ov-file#plugins
// https://github.com/tailwindlabs/tailwindcss-typography

export default function TermsOfUse({ coolBeans, setTcOpen }: TsAndCsProps) {
  const [md, setMd] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // fetch("/README.md")
    fetch("/src/data/terms-of-use.md")
      .then(response => response.text())
      .then(text => setMd(text))
      .finally(() => setLoading(false))
      .catch(error => console.error("Error fetching file:", error))
  })

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="font-semibold pt-2">Terms of Use</h1>
      {loading ? (<Spinner />) : (
        // <div className="h-80 max-w-screen-sm sm:h-120 md:h-120 overflow-y-auto">
        <div className="h-[calc(100dvh-335px)] sm:h-[calc(100dvh-300px)] max-w-screen-sm md:max-w-3xl overflow-y-auto">
          <article className="prose prose-sm dark:prose-invert max-w-none p-2 bg-white dark:bg-black text-justify font-mono text-sm">
            <Markdown remarkPlugins={[remarkGfm]}>{md}</Markdown>
          </article >
        </div>
      )}
      <Button onClick={() => {
        coolBeans(true)
        setTcOpen(false)
      }} disabled={loading}>I've read & understand these terms</Button>
    </div>
  )
}
