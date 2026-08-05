"use client"

import {
  FolderOpen,
  Code2,
  Bug,
  FileText,
  Box,
  Globe,
  Link2,
  Shield,
  Palette,
  Wrench,
  Binary,
  Braces,
} from "lucide-react"
import { Reveal } from "@/components/reveal"

const libraries = [
  {
    name: "Closures",
    description: "Inspection, modification, and creation of Luau closures — one of the most powerful tools for hooking functions and modifying game logic.",
    icon: Code2,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    link: "https://docs.sunc.su/Closures",
    functions: [
      { name: "hookfunction", sig: "hookfunction(func, hook) → original", desc: "Hook a function with another function, returning the original unhooked function." },
      { name: "hookmetamethod", sig: "hookmetamethod(object, name, hook) → original", desc: "Hook a specific metamethod on any Luau object with a metatable." },
      { name: "restorefunction", sig: "restorefunction(func)", desc: "Restore a hooked function back to the very first original, even after multiple hooks." },
      { name: "clonefunction", sig: "clonefunction(func) → clone", desc: "Create a new function with the exact same behaviour as the passed function." },
      { name: "newcclosure", sig: "newcclosure(func) → cfunc", desc: "Wrap any Luau function into a C closure." },
      { name: "checkcaller", sig: "checkcaller() → boolean", desc: "Check if the current function was invoked from the executor's own thread." },
      { name: "iscclosure", sig: "iscclosure(func) → boolean", desc: "Check whether a given function is a C closure." },
      { name: "islclosure", sig: "islclosure(func) → boolean", desc: "Check whether a given function is a Luau closure." },
      { name: "isexecutorclosure", sig: "isexecutorclosure(func) → boolean", desc: "Check whether a function is a closure of the executor (includes loadstring and getscriptclosure)." },
      { name: "getfunctionhash", sig: "getfunctionhash(func) → string", desc: "Get the SHA384 hash of a function's instructions and constants." },
      { name: "loadstring", sig: "loadstring(source, chunkname?) → func|nil, err?", desc: "Compile a string of Luau code and return it as a runnable function." },
    ],
  },
  {
    name: "Debug",
    description: "Powerful tools for inspecting and modifying Luau functions at a bytecode level — constants, upvalues, stack frames, and protos.",
    icon: Bug,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    link: "https://docs.sunc.su/Debug",
    functions: [
      { name: "debug.getconstant", sig: "debug.getconstant(func, index) → value", desc: "Get the constant at a specific index from a Luau function's bytecode." },
      { name: "debug.getconstants", sig: "debug.getconstants(func) → {constants}", desc: "Get all constants used within a Luau function's bytecode." },
      { name: "debug.setconstant", sig: "debug.setconstant(func, index, value)", desc: "Modify a constant at a specific index in a Luau function's bytecode." },
      { name: "debug.getupvalue", sig: "debug.getupvalue(func, index) → value", desc: "Get the upvalue at a specific index from a Luau function's closure." },
      { name: "debug.getupvalues", sig: "debug.getupvalues(func) → {upvalues}", desc: "Get all upvalues captured by a Luau function (external variables from surrounding scope)." },
      { name: "debug.setupvalue", sig: "debug.setupvalue(func, index, value)", desc: "Replace an upvalue at a specific index in a Luau function with a new value." },
      { name: "debug.getproto", sig: "debug.getproto(func, index, activated?) → func", desc: "Get a specific function prototype from a Luau function by index." },
      { name: "debug.getprotos", sig: "debug.getprotos(func) → {funcs}", desc: "Get all function prototypes defined within a Luau function." },
      { name: "debug.getstack", sig: "debug.getstack(level, index?) → value", desc: "Retrieve values from the stack at a specific call level." },
      { name: "debug.setstack", sig: "debug.setstack(level, index, value)", desc: "Replace a value in a specified stack frame." },
    ],
  },
  {
    name: "Filesystem",
    description: "Access to the executor's virtual file system — reading, writing, creating, and deleting files and folders.",
    icon: FolderOpen,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    link: "https://docs.sunc.su/Filesystem",
    functions: [
      { name: "readfile", sig: "readfile(path) → string", desc: "Retrieve the contents of a file at the specified path as a string." },
      { name: "writefile", sig: "writefile(path, data)", desc: "Write data to a file. Overwrites if it already exists." },
      { name: "appendfile", sig: "appendfile(path, contents)", desc: "Append string content to the end of a file. Creates the file if it doesn't exist." },
      { name: "delfile", sig: "delfile(path)", desc: "Delete the file at the specified path if it exists." },
      { name: "loadfile", sig: "loadfile(path) → func|nil, err?", desc: "Compile Luau source code from a file and return the resulting function." },
      { name: "listfiles", sig: "listfiles(path) → {strings}", desc: "Return all files and folders within the specified directory." },
      { name: "makefolder", sig: "makefolder(path)", desc: "Create a folder at the specified path if one doesn't already exist." },
      { name: "delfolder", sig: "delfolder(path)", desc: "Delete the folder at the specified path if it exists." },
      { name: "isfile", sig: "isfile(path) → boolean", desc: "Check whether a given path exists and refers to a file." },
      { name: "isfolder", sig: "isfolder(path) → boolean", desc: "Check whether a given path exists and refers to a folder." },
      { name: "getcustomasset", sig: "getcustomasset(path) → string", desc: "Return a content ID (e.g. rbxasset://) for loading audio, meshes, UI images, and other asset types." },
    ],
  },
  {
    name: "Instances",
    description: "Direct access to and manipulation of Instance objects — listing, referencing, and firing Roblox-native interactions.",
    icon: Box,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    link: "https://docs.sunc.su/Instances",
    functions: [
      { name: "getinstances", sig: "getinstances() → {Instance}", desc: "Retrieve every Instance from the registry, including those parented to nil." },
      { name: "getnilinstances", sig: "getnilinstances() → {Instance}", desc: "Return unparented Instance objects that exist in memory but are no longer in the DataModel hierarchy." },
      { name: "gethui", sig: "gethui() → BasePlayerGui|Folder", desc: "Return a hidden Instance container for safely storing UI elements (designed to avoid detection)." },
      { name: "cloneref", sig: "cloneref(object) → clone", desc: "Return a reference clone of an Instance that behaves identically but is not strictly equal (==) to it." },
      { name: "compareinstances", sig: "compareinstances(a, b) → boolean", desc: "Check if two Instances are equal." },
      { name: "getcallbackvalue", sig: "getcallbackvalue(object, property) → any?", desc: "Retrieve the assigned callback property on an Instance, such as OnInvoke." },
      { name: "fireclickdetector", sig: "fireclickdetector(detector, distance?, event?)", desc: "Trigger a ClickDetector event (defaults to MouseClick)." },
      { name: "fireproximityprompt", sig: "fireproximityprompt(prompt)", desc: "Instantly trigger a ProximityPrompt, bypassing HoldDuration and activation distance." },
      { name: "firetouchinterest", sig: "firetouchinterest(part1, part2, toggle)", desc: "Simulate a physical touch event between two BasePart objects." },
    ],
  },
  {
    name: "Signals",
    description: "Inspecting and manipulating RBXScriptSignal and RBXScriptConnection objects.",
    icon: Link2,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    link: "https://docs.sunc.su/Signals",
    functions: [
      { name: "getconnections", sig: "getconnections(signal) → {Connection}", desc: "Retrieve all Connection objects currently attached to an RBXScriptSignal." },
      { name: "firesignal", sig: "firesignal(signal, ...)", desc: "Invoke all Luau connections connected to a given RBXScriptSignal." },
      { name: "replicatesignal", sig: "replicatesignal(signal, ...)", desc: "Replicate a signal to the server with the provided arguments." },
    ],
  },
  {
    name: "Scripts",
    description: "Inspect and interact with script objects — bytecode analysis, closure retrieval, environment access, and script simulation.",
    icon: FileText,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    link: "https://docs.sunc.su/Scripts",
    functions: [
      { name: "getscripts", sig: "getscripts() → {Script}", desc: "Return all Script, LocalScript, and ModuleScript instances present." },
      { name: "getrunningscripts", sig: "getrunningscripts() → {Script}", desc: "Return all running scripts in the caller's global state (excluding CoreScripts by default)." },
      { name: "getloadedmodules", sig: "getloadedmodules() → {ModuleScript}", desc: "Return all ModuleScript instances that have been loaded (require'd)." },
      { name: "getcallingscript", sig: "getcallingscript() → Script?", desc: "Return the Script/LocalScript/ModuleScript that triggered the current code execution." },
      { name: "getscriptfromthread", sig: "getscriptfromthread(thread) → Script?", desc: "Return the script associated with a given Luau thread." },
      { name: "getscriptclosure", sig: "getscriptclosure(script) → func", desc: "Create and return a Luau function closure from a script's compiled bytecode." },
      { name: "getscriptbytecode", sig: "getscriptbytecode(script) → string?", desc: "Retrieve the bytecode of a Script, LocalScript, or ModuleScript." },
      { name: "getscripthash", sig: "getscripthash(script) → string?", desc: "Return a SHA-384 hash of the raw bytecode for a given script." },
      { name: "getsenv", sig: "getsenv(script) → env?", desc: "Return the global environment table of a given Script, LocalScript, or ModuleScript." },
    ],
  },
  {
    name: "Metatable",
    description: "Advanced interaction with metatables — direct access to core metamethods and internal table behaviours.",
    icon: Braces,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    link: "https://docs.sunc.su/Metatable",
    functions: [
      { name: "getrawmetatable", sig: "getrawmetatable(object) → table?", desc: "Return the raw metatable of an object, even if a __metatable field is set." },
      { name: "setrawmetatable", sig: "setrawmetatable(object, metatable) → object", desc: "Forcibly set the metatable of a value, bypassing __metatable protection." },
      { name: "getnamecallmethod", sig: "getnamecallmethod() → string?", desc: "Return the name of the method that invoked the __namecall metamethod." },
      { name: "isreadonly", sig: "isreadonly(table) → boolean", desc: "Check whether a table is currently set as readonly." },
      { name: "setreadonly", sig: "setreadonly(table, state)", desc: "Set whether a table is readonly (true) or writable (false)." },
    ],
  },
  {
    name: "Reflection",
    description: "Access hidden or non-scriptable properties of Instances and internal execution context.",
    icon: Shield,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    link: "https://docs.sunc.su/Reflection",
    functions: [
      { name: "gethiddenproperty", sig: "gethiddenproperty(instance, name) → value, bool", desc: "Retrieve a hidden or non-scriptable property from an Instance." },
      { name: "sethiddenproperty", sig: "sethiddenproperty(instance, name, value) → bool", desc: "Assign a value to a hidden or non-scriptable property of an Instance." },
      { name: "isscriptable", sig: "isscriptable(instance, property) → boolean?", desc: "Check whether a property of an instance is scriptable." },
      { name: "setscriptable", sig: "setscriptable(instance, name, state) → boolean?", desc: "Toggle the scriptability of a hidden or non-scriptable property on an Instance." },
      { name: "getthreadidentity", sig: "getthreadidentity() → number", desc: "Retrieve the thread's identity of the running Luau thread." },
      { name: "setthreadidentity", sig: "setthreadidentity(id)", desc: "Set the current Luau thread identity and capabilities." },
    ],
  },
  {
    name: "Encoding",
    description: "Binary transformation operations — Base64 and LZ4 encoding, decoding, compression, and decompression.",
    icon: Binary,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    link: "https://docs.sunc.su/Encoding",
    functions: [
      { name: "base64encode", sig: "base64encode(data) → string", desc: "Encode a string with Base64 encoding." },
      { name: "base64decode", sig: "base64decode(data) → string", desc: "Decode a Base64-encoded string back to its original form." },
      { name: "lz4compress", sig: "lz4compress(data) → string", desc: "Compress a string with the LZ4 compression algorithm." },
      { name: "lz4decompress", sig: "lz4decompress(data) → string", desc: "Decompress a string that was encoded using LZ4 back to regular data." },
    ],
  },
  {
    name: "Environment",
    description: "Access and inspection of the executor and Roblox environments — global tables, registry, and garbage collector.",
    icon: Globe,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    link: "https://docs.sunc.su/Environment",
    functions: [
      { name: "getgenv", sig: "getgenv() → table", desc: "Return the executor's global environment table, shared across all executor-made threads." },
      { name: "getrenv", sig: "getrenv() → table", desc: "Return the Roblox global environment used by the entire game." },
      { name: "getreg", sig: "getreg() → table", desc: "Return the Luau registry table used internally for threads, functions, and userdata." },
      { name: "getgc", sig: "getgc(includeTables?) → {values}", desc: "Return non-dead garbage-collectable values — functions, userdatas, and optionally tables." },
      { name: "filtergc", sig: "filtergc(type, options, returnOne?) → value|{values}", desc: "Retrieve specific garbage-collected values using fine-tuned filters." },
    ],
  },
  {
    name: "Drawing",
    description: "Client-only 2D rendering primitives — creating and manipulating graphical objects on the screen.",
    icon: Palette,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    link: "https://docs.sunc.su/Drawing",
    functions: [
      { name: "isrenderobj", sig: "isrenderobj(object) → boolean", desc: "Check whether a given value is a valid Drawing object." },
      { name: "getrenderproperty", sig: "getrenderproperty(drawing, property) → value", desc: "Retrieve the value of a property from a Drawing object." },
      { name: "setrenderproperty", sig: "setrenderproperty(drawing, property, value)", desc: "Assign a value to a property of a Drawing object." },
      { name: "cleardrawcache", sig: "cleardrawcache()", desc: "Remove all active drawing objects created with Drawing.new." },
    ],
  },
  {
    name: "Miscellaneous",
    description: "Utility functions that don't belong to a specific category — executor identification and HTTP requests.",
    icon: Wrench,
    color: "text-gray-400",
    bg: "bg-gray-500/10",
    border: "border-gray-500/20",
    link: "https://docs.sunc.su/Miscellaneous",
    functions: [
      { name: "identifyexecutor", sig: "identifyexecutor() → name, version", desc: "Return the name and version of the currently running executor." },
      { name: "request", sig: "request(options) → response", desc: "Send an HTTP request with a configuration table. Yields until complete and returns a structured response." },
    ],
  },
]

const totalFunctions = libraries.reduce((acc, lib) => acc + lib.functions.length, 0)

export default function FunctionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-16">
        <Reveal>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Code2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">sUNC Standard</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Executor Functions</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Complete reference of {totalFunctions} executor functions tested under the sUNC (senS&apos; Unified Naming Convention) standard. Organized by library with signatures and descriptions.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {libraries.length} Libraries
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {totalFunctions} Functions
              </span>
              <a href="https://docs.sunc.su" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary transition-colors hover:text-primary/80">
                docs.sunc.su ↗
              </a>
            </div>
          </div>
        </Reveal>

        <div className="space-y-8">
          {libraries.map((lib, i) => {
            const Icon = lib.icon
            return (
              <Reveal key={lib.name} delay={i * 0.06}>
                <section className={`rounded-xl border ${lib.border} ${lib.bg} overflow-hidden hover:scale-[1.005] transition-transform`}>
                  <div className="flex items-center gap-4 px-6 py-5">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${lib.bg} ${lib.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold">{lib.name}</h2>
                        <span className="text-xs font-medium text-muted-foreground">{lib.functions.length} functions</span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{lib.description}</p>
                    </div>
                    <a href={lib.link} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground">
                      Docs ↗
                    </a>
                  </div>

                  <div className="border-t border-border/50">
                    <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/50 bg-background/30">
                          <th className="px-6 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Function</th>
                          <th className="px-6 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Signature</th>
                          <th className="px-6 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        {lib.functions.map((fn) => (
                          <tr key={fn.name} className="transition-colors hover:bg-background/50">
                            <td className="px-6 py-3">
                              <code className="rounded bg-background/50 px-2 py-0.5 text-sm font-semibold">{fn.name}</code>
                            </td>
                            <td className="px-6 py-3 hidden lg:table-cell">
                              <code className="text-xs text-muted-foreground">{fn.sig}</code>
                            </td>
                            <td className="px-6 py-3 text-sm text-muted-foreground">{fn.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </div>
                </section>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Function data sourced from the{" "}
            <a href="https://docs.sunc.su" target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
              sUNC Documentation
            </a>{" "}
            Metadata API. sUNC evolves over time — some functions may be deprecated or added. Always refer to the official docs for the latest information.
          </p>
        </div>
      </div>
    </main>
  )
}
