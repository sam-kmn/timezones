
import { useEffect, useMemo, useState } from "react";
import { ITimezone } from "../lib/types";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default function Timezone({currentRegion}: {currentRegion: string}) {
  const [timezone, setTimezone] = useState<ITimezone>()
  const [formatState, setFormatState] = useState({
    date: false,
    time: false
  })
  const format = useMemo(() => ({
    date: formatState.date ?  'dddd, D MMMM YYYY' : 'DD/MM/YYYY',
    time: formatState.time ?  'hh:mm:ss A' : 'HH:mm:ss',
  }), [formatState])


  useEffect(() => {
    const fetchTimezone = async () => {
      if (!currentRegion) return
      try {
        const response = await fetch('https://worldtimeapi.org/api/timezone/' + currentRegion)
        const data = await response.json()
        const zone = currentRegion.split('/')
        setTimezone({
          ...data, 
          region: zone.length > 1 ? zone[0] : '',
          location: zone[zone.length-1].replace('_', ' ')
        })
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchTimezone()
    const intervalId = setInterval(() => fetchTimezone(), 5000)
    
    return () => clearInterval(intervalId)
  }, [currentRegion])

  if (timezone) return (
    <div className="flex flex-col gap-2 p-4 w-full max-w-sm border rounded">
      <header className="mb-4 flex justify-between">
        <div>
          <h3 className="text-sm text-muted-foreground uppercase">{timezone.region}</h3>
          <h1 className="text-xl font-medium uppercase">{timezone.location}</h1>
        </div>
        <h1 className="text-sm text-muted-foreground">UTC {timezone.utc_offset}</h1>
      </header>

      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Time</p>
        <button onClick={() => setFormatState({...formatState, time: !formatState.time})}>
          {dayjs(timezone.utc_datetime).utcOffset(timezone.utc_offset).format(format.time)}
        </button>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">Date</p>
        <button onClick={() => setFormatState({...formatState, date: !formatState.date})}>
          {dayjs(timezone.utc_datetime).utcOffset(timezone.utc_offset).format(format.date)}
        </button>
      </div>
    </div>
  )
}