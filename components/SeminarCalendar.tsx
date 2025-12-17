'use client'

import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@sanity/icons'

interface Seminar {
    _id: string
    titleCs: string
    date: string
    slug: { current: string }
}

interface SeminarCalendarProps {
    seminars: Seminar[]
}

export default function SeminarCalendar({ seminars }: SeminarCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date())

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (year: number, month: number) => {
        // 0 = Sunday, 1 = Monday... but we want 0 = Monday, 6 = Sunday
        const day = new Date(year, month, 1).getDay()
        return day === 0 ? 6 : day - 1
    }

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const monthNames = [
        'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
        'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
    ]

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    const getEventsForDay = (day: number) => {
        return seminars.filter(s => {
            const d = new Date(s.date)
            return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year
        })
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                    {monthNames[month]} {year}
                </h2>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                        <span className="text-xl">←</span>
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                        <span className="text-xl">→</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm font-medium text-gray-500">
                <div>Po</div>
                <div>Út</div>
                <div>St</div>
                <div>Čt</div>
                <div>Pá</div>
                <div>So</div>
                <div>Ne</div>
            </div>

            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square bg-gray-50/50 rounded-lg" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const dayEvents = getEventsForDay(day)
                    const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year

                    return (
                        <div
                            key={day}
                            className={`aspect-square p-1 rounded-lg border ${isToday ? 'border-primary/50 bg-primary/5' : 'border-gray-100'
                                } relative group`}
                        >
                            <span className={`text-sm ${isToday ? 'font-bold text-primary' : 'text-gray-700'}`}>
                                {day}
                            </span>
                            <div className="mt-1 space-y-1">
                                {dayEvents.map(event => (
                                    <div
                                        key={event._id}
                                        className="w-full h-1.5 bg-primary rounded-full"
                                        title={event.titleCs}
                                    />
                                ))}
                            </div>
                            {dayEvents.length > 0 && (
                                <div className="hidden group-hover:block absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded-lg shadow-xl border border-gray-100 text-xs text-left">
                                    {dayEvents.map(event => (
                                        <div key={event._id} className="mb-1 last:mb-0">
                                            <strong>{new Date(event.date).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}</strong><br />
                                            {event.titleCs}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
