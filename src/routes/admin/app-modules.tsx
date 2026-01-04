import { useEffect, useRef, useState } from "react"

import useFirestore from "@/hooks/useFirestore"
import { appModuleConverter } from "@/lib/converter"

import type { SAppModule } from "@/schemas/app-schemas"
import type { TGetAllDocumentsProps } from "@/types/firestore-types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import { Pencil, Save, Trash2 } from "lucide-react"
import { twMerge } from "tailwind-merge"

type Modes = "NEW" | "SET"

const initCurrentAppModule: SAppModule = {
  moduleName: "",
  moduleDesc: "",
  url: "",
  id: "",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export default function AppModules() {
  const { isLoading, getAllDocuments, addDocument, setDocument, deleteDocument } = useFirestore()
  const [currentAppModule, setCurrentAppModule] = useState<SAppModule>(initCurrentAppModule)
  const moduleNameRef = useRef<HTMLInputElement>(null)
  const moduleDescRef = useRef<HTMLInputElement>(null)
  const moduleURLRef = useRef<HTMLInputElement>(null)
  const moduleOrderRef = useRef<HTMLInputElement>(null)
  const [moduleIsActive, setModuleIsActive] = useState(true)
  const [appModules, setAppModules] = useState<SAppModule[]>([])
  const [saveMode, setSaveMode] = useState<Modes>("NEW")

  async function fetchData() {
    const data: TGetAllDocumentsProps<SAppModule> = await getAllDocuments("/appModules/", appModuleConverter)
    setAppModules(data.payload)
    handleReset()
  }

  useEffect(() => {
    fetchData()

    return () => { }
  }, [])

  const handleSaveModule = async (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()

    if (!moduleNameRef.current?.value) return

    if (saveMode === "NEW") {
      await addDocument("/appModules/", {
        moduleName: moduleNameRef.current?.value,
        moduleDesc: moduleDescRef.current?.value || null,
        url: moduleURLRef.current?.value,
        order: 1,
        isActive: moduleIsActive,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: ""
      }, appModuleConverter)
      handleReset()
      fetchData()
    }

    if (saveMode === "SET") {
      await setDocument("/appModules/", currentAppModule.id, {
        moduleName: moduleNameRef.current?.value,
        moduleDesc: moduleDescRef.current?.value || null,
        url: moduleURLRef.current?.value,
        order: 1,
        isActive: moduleIsActive,
        createdAt: currentAppModule.createdAt,
        updatedAt: new Date(),
        id: currentAppModule.id
      }, appModuleConverter)
      handleReset()
      fetchData()
    }
  }

  const handleDeleteModule = async (e: React.FormEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault()
    await deleteDocument("/appModules/", appModules[index].id)
    fetchData()
  }

  const handleEditModule = async (e: React.FormEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault()
    setSaveMode("SET")
    setCurrentAppModule(appModules[index])
    if (moduleNameRef.current && moduleDescRef.current && moduleURLRef.current) {
      moduleNameRef.current.value = appModules[index].moduleName
      moduleDescRef.current.value = appModules[index].moduleDesc || ""
      moduleURLRef.current.value = appModules[index].url
      moduleOrderRef.current.value = "1"
      setModuleIsActive(appModules[index].isActive)
      window.scroll(0, 0)
      moduleNameRef.current.focus()
    }
  }

  const handleReset = () => {
    moduleNameRef.current && (moduleNameRef.current.value = "")
    moduleDescRef.current && (moduleDescRef.current.value = "")
    moduleURLRef.current && (moduleURLRef.current.value = "")
    moduleOrderRef.current && (moduleOrderRef.current.value = "1")
    setModuleIsActive(true)
    setSaveMode("NEW")
    setCurrentAppModule(initCurrentAppModule)
  }

  console.log(appModules)

  return (
    <div className="mx-3 mb-3 space-y-3">
      <p className="font-bold">App Modules</p>

      <div className="">
        <form className="flex gap-5 justify-between items-center border border-slate-400 rounded-lg p-3" action="" onSubmit={handleSaveModule}>
          <div className="space-y-2 w-full">
            <Input className="" ref={moduleNameRef} placeholder="Module name" />
            <Input className="" ref={moduleDescRef} placeholder="Module description" />
            <Input className="" ref={moduleURLRef} placeholder="Module URL" />
            <Input className="" ref={moduleOrderRef} placeholder="Module sort order" />
            <div className="flex items-center space-x-3 border py-2 pl-3 rounded-sm">
              <Label htmlFor="app-module-acive">Enabled</Label>
              <Switch id="is-active" checked={moduleIsActive} onCheckedChange={checked => setModuleIsActive(checked)} />
            </div>
          </div>
          <Button type="submit" variant="outline" size="icon" disabled={isLoading} onClick={handleSaveModule}><Save /></Button>
        </form>

        {isLoading && <p className="mt-3">Loading...</p>}

        {appModules.map((v, i) => {
          return (
            <div key={v.id} className={twMerge(v.isActive === false && "bg-orange-100 dark:bg-orange-950", "flex flex-row justify-between mt-3 p-2 border border-orange-800 rounded-lg")}>
              <div className="space-y-1">
                <p className="font-bold">{v.moduleName}</p>
                <p>{v.moduleDesc || "No description"}</p>
                <p>URL: {v.url}</p>
                <p>Active: {v.isActive === true ? "YES" : "NO"}</p>
                {/* <p className="font-mono">ID: {v.id}</p> */}
              </div>
              <div className="flex flex-nowrap gap-1">
                <Button variant="outline" size="icon" disabled={isLoading} onClick={e => handleEditModule(e, i)}><Pencil /></Button>
                <Button variant="outline" size="icon" disabled={isLoading} onClick={e => handleDeleteModule(e, i)}><Trash2 /></Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

