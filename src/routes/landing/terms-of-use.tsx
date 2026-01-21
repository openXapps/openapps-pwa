import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Button } from "@/components/ui/button"

import Loader from "@/components/Loader"

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
      <h1 className="font-semibold">Terms of Use</h1>
      {loading ? (
        <Loader varient="COMPONENT" />
      ) : (
        <div className="h-80 max-w-5xl max-h-100 sm:h-110 sm:max-h-120 md:max-h-150 overflow-y-auto">
          <article className="prose prose-sm dark:prose-invert max-w-none p-2 bg-white dark:bg-black text-justify">
            <Markdown remarkPlugins={[remarkGfm]}>{md}</Markdown>
          </article >
        </div>
      )}
      <Button onClick={() => {
        coolBeans(true)
        setTcOpen(false)
      }}>I've read & understand these terms</Button>
    </div>
  )
}
