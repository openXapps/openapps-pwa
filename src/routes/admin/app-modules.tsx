import { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

import useFirestore from "@/hooks/useFirestore"
import { appModuleConverter } from "@/lib/converter"

import type { SAppModule } from "@/schemas/app-schemas"
import type { TGetAllDocumentsProps } from "@/types/firestore-types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

import { Pencil, Save, Trash2, Undo2 } from "lucide-react"

type Modes = "NEW" | "SET"

const initCurrentAppModule: SAppModule = {
  moduleName: "",
  moduleDesc: "",
  url: "",
  order: 0,
  id: "",
  isActive: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

export default function AppModules() {
  const { isLoading, getAllDocuments, addDocument, setDocument, deleteDocument } = useFirestore()
  const [currentAppModule, setCurrentAppModule] = useState<SAppModule>(initCurrentAppModule)
  const moduleNameRef = useRef<HTMLInputElement>(null)
  const moduleDescRef = useRef<HTMLTextAreaElement>(null)
  const moduleURLRef = useRef<HTMLInputElement>(null)
  const moduleOrderRef = useRef<HTMLInputElement>(null)
  const [moduleIsActive, setModuleIsActive] = useState(initCurrentAppModule.isActive)
  const [appModules, setAppModules] = useState<SAppModule[]>([])
  const [saveMode, setSaveMode] = useState<Modes>("NEW")
  const [dialogOpen, setDialogOpen] = useState(false)

  async function fetchData() {
    const data: TGetAllDocumentsProps<SAppModule> = await getAllDocuments("/appModules/", appModuleConverter)
    setAppModules(data.payload.sort((a, b) => (a.order || 100) - (b.order || 100)))
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
        order: Number(moduleOrderRef.current?.value),
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
        order: Number(moduleOrderRef.current?.value),
        isActive: moduleIsActive,
        createdAt: currentAppModule.createdAt,
        updatedAt: new Date(),
        id: currentAppModule.id
      }, appModuleConverter)
      handleReset()
      fetchData()
    }
  }

  const handleDeleteModule = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await deleteDocument("/appModules/", currentAppModule.id)
    setDialogOpen(false)
    fetchData()
  }

  const handleEditModule = async (e: React.FormEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault()
    setSaveMode("SET")
    setCurrentAppModule(appModules[index])
    if (moduleNameRef.current && moduleDescRef.current && moduleURLRef.current && moduleOrderRef.current) {
      moduleNameRef.current.value = appModules[index].moduleName
      moduleDescRef.current.value = appModules[index].moduleDesc || ""
      moduleURLRef.current.value = appModules[index].url
      moduleOrderRef.current.value = appModules[index].order?.toString() || "1"
      setModuleIsActive(appModules[index].isActive)
      window.scroll(0, 0)
      moduleNameRef.current.focus()
    }
  }

  const handleReset = () => {
    moduleNameRef.current && (moduleNameRef.current.value = initCurrentAppModule.moduleName)
    moduleDescRef.current && (moduleDescRef.current.value = initCurrentAppModule.moduleDesc || "")
    moduleURLRef.current && (moduleURLRef.current.value = initCurrentAppModule.url)
    moduleOrderRef.current && (moduleOrderRef.current.value = initCurrentAppModule.order?.toString())
    setModuleIsActive(initCurrentAppModule.isActive)
    setSaveMode("NEW")
    setCurrentAppModule(initCurrentAppModule)
  }

  return (
    <div className="mx-auto max-w-screen-sm px-3 sm:px-0 space-y-3">
      <p className="">Configure OpenApps web modules.</p>
      <div className="">
        <form className="flex gap-5 justify-between items-center border border-slate-400 rounded-lg p-3" action="" onSubmit={handleSaveModule}>
          <div className="space-y-2 w-full">
            <Input className="" ref={moduleNameRef} placeholder="Module name" />
            <Textarea className="field-sizing-content" ref={moduleDescRef} placeholder="Module description" />
            <Input className="" ref={moduleURLRef} placeholder="Module URL" />
            <Input type="number" className="" ref={moduleOrderRef} placeholder="Module sort order" />
            <div className="flex items-center space-x-3 border py-2 pl-3 rounded-sm">
              <Label htmlFor="app-module-acive">Enabled</Label>
              <Switch id="is-active" checked={moduleIsActive} onCheckedChange={checked => setModuleIsActive(checked)} />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Button type="submit" variant="outline" size="icon" onClick={handleSaveModule}><Save /></Button>
            <Button type="submit" variant="outline" size="icon" disabled={!currentAppModule.id} onClick={handleReset}><Undo2 /></Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="icon" disabled={!currentAppModule.id}><Trash2 /></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-100">
                <DialogHeader>
                  <DialogTitle>Confirm delete</DialogTitle>
                  <DialogDescription>Please confirm you are deleting {currentAppModule.moduleName} module from the database?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button variant="outline" onClick={handleDeleteModule}>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </form>

        {isLoading && <div className="flex justify-center"><Spinner className="size-15" /></div>}

        {appModules.map((v, i) => {
          return (
            <div key={v.id} className={twMerge(v.isActive === false && "bg-orange-100 dark:bg-orange-950", "flex flex-row justify-between mt-3 p-2 border border-orange-800 rounded-lg")}>
              <div className="space-y-1">
                <p className="font-bold">{v.moduleName}</p>
                <p className="line-clamp-3">{v.moduleDesc || "No description"}</p>
                <p>URL: {v.url}</p>
                <p>Active: {v.isActive === true ? "YES" : "NO"}</p>
                <p>Sort order: {v.order}</p>
                <p>Created: {v.createdAt.toISOString()}</p>
                <p>Updated: {v.updatedAt.toISOString()}</p>
              </div>
              <Button variant="outline" size="icon" disabled={isLoading} onClick={e => handleEditModule(e, i)}><Pencil /></Button>
            </div>
          )
        })}
      </div>

    </div>
  )
}

