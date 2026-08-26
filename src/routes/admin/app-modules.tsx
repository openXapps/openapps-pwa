import { useEffect, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import useFirestore from "@/hooks/useFirestore"
import { appModuleConverter } from "@/lib/converter"

import type { SAppModule } from "@/schemas/app-schemas"
import type { TGetAllDocumentsProps } from "@/types/firestore-types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
// import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
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

import { Pencil, Save, Trash2, Undo2, Plus } from "lucide-react"

type Modes = "NEW" | "SET"

const initCurrentAppModule: SAppModule = {
  moduleName: "",
  moduleDesc: "",
  url: "",
  image: "",
  order: 0,
  id: "",
  isActive: false,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const formSchema = z.object({
  moduleName: z
    .string()
    .min(2, "Not a valid name")
    .max(30, "Name is too long"),
  moduleDesc: z
    .string()
    .min(10, "Not a valid description")
    .max(400, "Description is too long"),
  url: z
    .string()
    .min(10, "Not a valid URL")
    .max(30, "URL is too long"),
  image: z
    .string()
    .min(10, "Not a valid image URL")
    .max(30, "Image URL is too long"),
  order: z
    .number()
    .min(1, "Order must be at least 1")
    .max(100, "Order must be at most 100"),
  id: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export default function AppModules() {
  const { isLoading, getAllDocuments, addDocument, setDocument, deleteDocument } = useFirestore()
  const [currentAppModule, setCurrentAppModule] = useState<SAppModule>(initCurrentAppModule)
  // const moduleNameRef = useRef<HTMLInputElement>(null)
  // const moduleDescRef = useRef<HTMLTextAreaElement>(null)
  // const moduleURLRef = useRef<HTMLInputElement>(null)
  // const moduleOrderRef = useRef<HTMLInputElement>(null)
  const [moduleIsActive, setModuleIsActive] = useState(initCurrentAppModule.isActive)
  const [appModules, setAppModules] = useState<SAppModule[]>([])
  const [showForm, setShowForm] = useState(true)
  const [saveMode, setSaveMode] = useState<Modes>("NEW")
  const [dialogOpen, setDialogOpen] = useState(false)
  const moduleForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moduleName: "",
      moduleDesc: "",
      url: "",
      image: "",
      order: 0,
      id: "",
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  async function fetchData() {
    const data: TGetAllDocumentsProps<SAppModule> = await getAllDocuments("/appModules/", appModuleConverter)
    setAppModules(data.payload.sort((a, b) => (a.order || 100) - (b.order || 100)))
    handleReset()
  }

  useEffect(() => {
    fetchData()

    return () => { }
  }, [])

  // const handleSaveModule = async (e: React.SubmitEvent<HTMLFormElement | HTMLButtonElement>) => {
  //   e.preventDefault()
  async function handleUpdateModule(data: z.infer<typeof formSchema>) {
    // if (!moduleNameRef.current?.value) return

    if (saveMode === "NEW") {
      await addDocument("/appModules/", {
        moduleName: data.moduleName,
        moduleDesc: data.moduleDesc,
        url: data.url,
        image: data.image,
        order: data.order,
        isActive: data.isActive,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: ""
      }, appModuleConverter)
      handleReset()
      fetchData()
    }

    if (saveMode === "SET") {
      await setDocument("/appModules/", currentAppModule.id, {
        moduleName: data.moduleName,
        moduleDesc: data.moduleDesc,
        url: data.url,
        image: data.image,
        order: data.order,
        isActive: data.isActive,
        createdAt: currentAppModule.createdAt,
        updatedAt: new Date(),
        id: currentAppModule.id
      }, appModuleConverter)
      handleReset()
      fetchData()
    }
  }

  // const handleDeleteModule = async (e: React.FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault()
  async function handleDeleteModule(data: z.infer<typeof formSchema>) {
    await deleteDocument("/appModules/", data.id)
    setDialogOpen(false)
    fetchData()
  }

  // const handleEditModule = async (e: React.FormEvent<HTMLButtonElement>, index: number) => {
  async function handleEditModule(e: React.MouseEvent<HTMLButtonElement>, index: number) {
    e.preventDefault()
    setSaveMode("SET")
    setCurrentAppModule(appModules[index])
    moduleForm.setValues({
      moduleName: appModules[index].moduleName,
      moduleDesc: appModules[index].moduleDesc || undefined,
      url: "",

    })
    // if (moduleNameRef.current && moduleDescRef.current && moduleURLRef.current && moduleOrderRef.current) {
    //   moduleNameRef.current.value = appModules[index].moduleName
    //   moduleDescRef.current.value = appModules[index].moduleDesc || ""
    //   moduleURLRef.current.value = appModules[index].url
    //   moduleOrderRef.current.value = appModules[index].order?.toString() || "1"
    //   setModuleIsActive(appModules[index].isActive)
    //   window.scroll(0, 0)
    //   moduleNameRef.current.focus()
    // }
  }

  const handleReset = () => {
    moduleForm.reset()
    // moduleNameRef.current && (moduleNameRef.current.value = initCurrentAppModule.moduleName)
    // moduleDescRef.current && (moduleDescRef.current.value = initCurrentAppModule.moduleDesc || "")
    // moduleURLRef.current && (moduleURLRef.current.value = initCurrentAppModule.url)
    // moduleOrderRef.current && (moduleOrderRef.current.value = initCurrentAppModule.order?.toString())
    setModuleIsActive(initCurrentAppModule.isActive)
    setSaveMode("NEW")
    setCurrentAppModule(initCurrentAppModule)
  }

  return (
    <div className="mx-auto max-w-screen-sm space-y-3">
      <div className="flex justify-between items-center">
        <p className="">Configure OpenApps web modules.</p>
        <Button variant="outline" size="icon" onClick={(e) => { e.preventDefault() }}><Plus /></Button>
      </div>
      {showForm && (
        <form id="form-module" onSubmit={moduleForm.handleSubmit(handleUpdateModule)}>
          <div className="flex gap-5 justify-between items-center border border-slate-400 rounded-lg p-3">
            <div className="space-y-2 w-full">
              <FieldGroup>
                <Controller
                  name="moduleName"
                  control={moduleForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-module-name">Module name</FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        id="form-module-name"
                        aria-invalid={fieldState.invalid}
                      // placeholder="Module name"
                      />
                      {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                    </Field>
                  )}
                />
                <Controller
                  name="moduleDesc"
                  control={moduleForm.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-module-desc">Module Description</FieldLabel>
                      <Textarea
                        {...field}
                        className="field-sizing-content"
                        id="form-module-desc"
                        aria-invalid={fieldState.invalid}
                      // placeholder="Module description"
                      />
                      {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                    </Field>
                  )}
                />
                {/* <Input className="" ref={moduleNameRef} placeholder="Module name" />
              <Textarea className="field-sizing-content" ref={moduleDescRef} placeholder="Module description" />
              <Input className="" ref={moduleURLRef} placeholder="Module URL" />
              <Input type="number" className="" ref={moduleOrderRef} placeholder="Module sort order" />
              <div className="flex items-center space-x-3 border py-2 pl-3 rounded-sm">
                <Label htmlFor="app-module-acive">Enabled</Label>
                <Switch id="is-active" checked={moduleIsActive} onCheckedChange={checked => setModuleIsActive(checked)} />
              </div> */}
              </FieldGroup>
            </div>
            <div className="flex flex-col gap-1">
              <Button type="submit" variant="outline" size="icon" onClick={moduleForm.handleSubmit(handleUpdateModule)}><Save /></Button>
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
            <Button variant="outline" onClick={moduleForm.handleSubmit(handleDeleteModule)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
            
            </div>
          </div>
        </form>
      )}

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
  )
}

