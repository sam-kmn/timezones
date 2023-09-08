import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "./ui/scroll-area"

interface IProps {
  currentRegion: string, 
  setCurrentRegion:React.Dispatch<React.SetStateAction<string>>
}

export default function RegionSelect({currentRegion, setCurrentRegion}: IProps) {
  const [open, setOpen] = React.useState(false)
  const [regions, setRegions] = React.useState([])

  React.useEffect(() => {
    const fetchTimezones = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/timezone')
        const data = await response.json()
        setRegions(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTimezones()
  }, [])

  if (!regions) return <div>Loading...</div>
  else return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-sm justify-between"
        >
          {currentRegion || "Select timezone..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-sm p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <ScrollArea className="h-72">
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {regions.map((region) => (
                <CommandItem
                  key={region}
                  onSelect={() => {
                    setCurrentRegion(region === currentRegion ? "" : region)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentRegion === region ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {region}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
