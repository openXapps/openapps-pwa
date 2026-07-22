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

export default function Terms({ coolBeans, setTcOpen }: TsAndCsProps) {
  const [mdTAC, setMdTAC] = useState("")
  const [TCLoading, setTCLoading] = useState(true)

  useEffect(() => {
    fetch("/src/data/tc.md")
      .then(response => response.text())
      .then(text => setMdTAC(text))
      .finally(() => setTCLoading(false))
      .catch(error => console.error("Error fetching T&Cs file:", error))
  }, [])

  return (
    <div className="flex flex-col gap-3 items-center">
      {/* <h1 className="font-semibold pt-2"></h1> */}
      {TCLoading ? (<Spinner />) : (
        // <div className="h-80 max-w-screen-sm sm:h-120 md:h-120 overflow-y-auto">
        <div className="h-[calc(100dvh-335px)] sm:h-[calc(100dvh-300px)] max-w-screen-sm md:max-w-3xl overflow-y-auto">
          <article className="prose prose-sm dark:prose-invert max-w-none p-2 bg-white dark:bg-black font-mono text-sm">
            <Markdown remarkPlugins={[remarkGfm]}>{mdTAC}</Markdown>
          </article >
        </div>
      )}
      <Button onClick={() => {
        coolBeans(true)
        setTcOpen(false)
      }} disabled={TCLoading}>I've read, understood, &amp; agreed to these Ts&amp;Cs</Button>
    </div>
  )
}
