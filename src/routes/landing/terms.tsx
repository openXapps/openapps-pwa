import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


type TsAndCsProps = {
  coolBeans: Dispatch<SetStateAction<boolean>>
  setTcOpen: Dispatch<SetStateAction<boolean>>
}

// https://github.com/remarkjs/react-markdown?tab=readme-ov-file#plugins
// https://github.com/tailwindlabs/tailwindcss-typography

type TermProps = {
  touLoading: boolean
  tacLoading: boolean
  ppLoading: boolean
}

export default function Terms({ coolBeans, setTcOpen }: TsAndCsProps) {
  const [mdTOU, setMdTOU] = useState("")
  const [mdTAC, setMdTAC] = useState("")
  const [mdPP, setMdPP] = useState("")
  const [loading, setLoading] = useState<TermProps>({ touLoading: true, tacLoading: true, ppLoading: true })

  useEffect(() => {
    // fetch("/README.md")
    fetch("/src/data/terms-of-use.md")
      .then(response => response.text())
      .then(text => setMdTOU(text))
      .finally(() => setLoading(prevState => ({ ...prevState, touLoading: false })))
      .catch(error => console.error("Error fetching file:", error))
    fetch("/src/data/terms-and-conditions.md")
      .then(response => response.text())
      .then(text => setMdTAC(text))
      .finally(() => setLoading(prevState => ({ ...prevState, tacLoading: false })))
      .catch(error => console.error("Error fetching file:", error))
    fetch("/src/data/privacy-policy.md")
      .then(response => response.text())
      .then(text => setMdPP(text))
      .finally(() => setLoading(prevState => ({ ...prevState, ppLoading: false })))
      .catch(error => console.error("Error fetching file:", error))
  }, [])

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="font-semibold pt-2"></h1>
      {loading.touLoading || loading.tacLoading || loading.ppLoading ? (<Spinner />) : (
        // <div className="h-80 max-w-screen-sm sm:h-120 md:h-120 overflow-y-auto">
        <Tabs defaultValue="terms-and-conditions" className="">
          <TabsList>
            <TabsTrigger value="terms-and-conditions">Terms &amp; Conditions</TabsTrigger>
            <TabsTrigger value="terms-of-use">Terms of Use</TabsTrigger>
            <TabsTrigger value="privacy-policy">Privacy Policy</TabsTrigger>
          </TabsList>
          <div className="h-[calc(100dvh-335px)] sm:h-[calc(100dvh-300px)] max-w-screen-sm md:max-w-3xl overflow-y-auto">
            <TabsContent value="terms-and-conditions">
              <article className="prose prose-sm dark:prose-invert max-w-none p-2 bg-white dark:bg-black text-justify font-mono text-sm">
                <Markdown remarkPlugins={[remarkGfm]}>{mdTAC}</Markdown>
              </article >
            </TabsContent>
            <TabsContent value="terms-of-use">
              <article className="prose prose-sm dark:prose-invert max-w-none p-2 bg-white dark:bg-black text-justify font-mono text-sm">
                <Markdown remarkPlugins={[remarkGfm]}>{mdTOU}</Markdown>
              </article >
            </TabsContent>
            <TabsContent value="privacy-policy">
              <article className="prose prose-sm dark:prose-invert max-w-none p-2 bg-white dark:bg-black text-justify font-mono text-sm">
                <Markdown remarkPlugins={[remarkGfm]}>{mdPP}</Markdown>
              </article >
            </TabsContent>
          </div>
        </Tabs>
      )}
      <Button onClick={() => {
        coolBeans(true)
        setTcOpen(false)
      }} disabled={loading.touLoading || loading.tacLoading || loading.ppLoading}>I've read & understand these terms</Button>
    </div>
  )
}
