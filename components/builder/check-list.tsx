import { Search } from "lucide-react"
import { StatusBadge } from "./status-badge"

type StatusFilter = "all" | "pass" | "skip" | "flag"

interface CheckItem {
  name: string
  status: string
}

interface CheckListProps {
  title: string
  items: CheckItem[]
  filteredItems: CheckItem[]
  search: string
  onSearchChange: (value: string) => void
  filter: StatusFilter
  onFilterChange: (value: StatusFilter) => void
  onSetStatus: (index: number, status: string) => void
  onSetAll: (status: string) => void
  statusOptions: { value: string; label: string }[]
  passCount: number
  filterLabels?: Record<string, string>
}

export function CheckList({
  title,
  items,
  filteredItems,
  search,
  onSearchChange,
  filter,
  onFilterChange,
  onSetStatus,
  onSetAll,
  statusOptions,
  passCount,
  filterLabels = {},
}: CheckListProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="text-sm text-muted-foreground">
          {passCount}/{items.length} {title === "Functions" ? "present" : title === "UI Libraries" ? "loaded" : "passed"}
        </span>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary min-h-[44px]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-2">
              {(["all", "pass", "skip", "flag"] as StatusFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => onFilterChange(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors min-h-[44px] ${
                    filter === f
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-secondary text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  {filterLabels[f] || (f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1))}
                </button>
              ))}
            </div>

            <select
              onChange={(e) => {
                if (e.target.value) onSetAll(e.target.value)
                e.target.value = ""
              }}
              className="px-3 py-2 bg-secondary border border-border rounded-lg text-xs font-medium text-muted-foreground min-h-[44px]"
            >
              <option value="">Set All...</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto rounded-lg border border-border">
          {filteredItems.map((item) => {
            const realIndex = items.findIndex((c) => c.name === item.name)
            return (
              <div
                key={item.name}
                className="flex items-center justify-between px-4 py-3 border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <span className="text-sm flex-1 min-w-0 truncate mr-4">{item.name}</span>
                <div className="flex gap-1.5">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onSetStatus(realIndex, opt.value)}
                      className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors min-h-[36px] ${
                        item.status === opt.value
                          ? opt.value === "pass"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : opt.value === "flag"
                              ? "bg-amber-500/20 text-amber-400"
                              : opt.value === "Loaded"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-secondary text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
