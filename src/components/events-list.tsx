import { ChangeEvent, useEffect, useState } from "react";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableRow } from "./table/table-row";
import { TableCell } from "./table/table-cell";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react";
import { IconButton } from "./icon-button";

type EventType = {
    id: string;
    title: string;
    details: string;
    slug: string;
    maximumAttendees?: number;
    attendeesAmount: number;
}

export function EventsList () {
    const navigate = useNavigate();
    const [events, setEvents] = useState<EventType[]>([]);
    const [total, setTotal] = useState<number>(0);

    const [search, setSearch] = useState<string>(() => {
        const url = new URL(window.location.toString());
        if (url.searchParams.has('search')) return url.searchParams.get('search') ?? '';
        return "";
    });
    const [page, setPage] = useState<number>(() => {
        const url = new URL(window.location.toString());
        if (url.searchParams.has('page')) return Number(url.searchParams.get('page'));
        return 1;
    });

    function setCurrentSearch (search: string) {
        const url = new URL(window.location.toString());
        url.searchParams.set('search', search);
        window.history.pushState({}, "", url);

        setSearch(search);
        setCurrentPage(1);
    }

    function handleSearchEvents (e: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(e.currentTarget.value);
        setPage(1);
    }

    function setCurrentPage (desiredPage: number) {
        const url = new URL(window.location.toString());
        url.searchParams.set('page', `${desiredPage}`);
        window.history.pushState({}, "", url);

        setPage(desiredPage);
    }

    function changePage(desiredPage: number) {
        if (desiredPage === 0) return;
        setCurrentPage(desiredPage);
    }

    useEffect(() => {
        const url = new URL(`http://localhost:3333/events`);
        url.searchParams.set('pageIndex', `${page - 1}`);
        if (search.length > 0) url.searchParams.set('query', `${search}`);

        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setEvents(data.events);
                setTotal(data.total);
            });
    }, [page, search]);
    
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">
                    Eventos
                </h1>
                <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm w-72 flex items-center gap-3">
                    <Search className="size-3 text-emerald-300" />
                    <input
                        className="bg-transparent flex-1 outline-none h-auto border-none p-0 text-sm focus:ring-0"
                        type="text"
                        placeholder="Buscar participante..."
                        onChange={handleSearchEvents}
                        value={search}
                    />
                </div>
            </div>
            <Table>
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader>
                            <span>
                                Código
                            </span>
                        </TableHeader>
                        <TableHeader>
                            <span>
                                Evento
                            </span>
                        </TableHeader>
                        <TableHeader>
                            <span>
                                Participantes
                            </span>
                        </TableHeader>
                    </tr>
                </thead>
                <tbody>
                    { events.length > 0 && events.map((event) => {
                        return (
                            <TableRow key={event.id} style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => { navigate(`/attendees/${event.id}`) }}>
                                <TableCell>
                                    { event.slug }
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-zinc-50 font-semibold">
                                            { event.title }
                                        </span>
                                        <span className="text-zinc-400">
                                            { event.details }
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <span>{ event.attendeesAmount }</span>
                                        { event.maximumAttendees &&
                                            <span className="text-zinc-400">/{ event.maximumAttendees }</span>
                                        }
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    }) }
                    { events.length === 0 && 
                        <tr className="py-3 px-4 text-sm border-b border-white/10">
                            <TableCell colSpan={3} style={{ textAlign: "center" }}>
                                <span className="text-zinc-400 italic text-center">
                                    Nenhum evento encontrado
                                </span>
                            </TableCell>
                        </tr>
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={1}>
                            Mostrando {events.length} de {total} itens
                        </TableCell>
                        <TableCell colSpan={2} className="text-right">
                            <div className="inline-flex gap-8 items-center">
                                <span>Página { page } de { Math.ceil(total / 10) }</span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={() => { changePage(1) }} disabled={page === 1}>
                                        <ChevronsLeft className="size-4"/>
                                    </IconButton>
                                    <IconButton onClick={() => {changePage(page - 1)}} disabled={page === 1}>
                                        <ChevronLeft className="size-4"/>
                                    </IconButton>
                                    <IconButton onClick={() => {changePage(page + 1)}} disabled={total > 0 ? page === Math.ceil(total / 10) : true} >
                                        <ChevronRight className="size-4"/>
                                    </IconButton>
                                    <IconButton onClick={() => { changePage(Math.ceil(total / 10)) }} disabled={total > 0 ? page === Math.ceil(total / 10) : true}>
                                        <ChevronsRight className="size-4"/>
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
}