import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

type AttendeeType = {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    checkedInAt?: Date;
}

export function AttendeeList () {
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

    const [attendees, setAttendees] = useState<AttendeeType[]>([]);
    const [total, setTotal] = useState<number>(0);

    function setCurrentSearch (search: string) {
        const url = new URL(window.location.toString());
        url.searchParams.set('search', search);
        window.history.pushState({}, "", url);

        setSearch(search);
        setCurrentPage(1);
    }

    function handleSearchAttendees (e: ChangeEvent<HTMLInputElement>) {
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
        setCurrentPage(desiredPage);
    }

    useEffect(() => {
        const url = new URL('http://localhost:3333/events/596f38bd-e31f-4a6e-8d47-b35019bf3c97/attendees');
        url.searchParams.set('pageIndex', `${page - 1}`);
        if (search.length > 0) url.searchParams.set('query', `${search}`);

        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setAttendees(data.attendees);
                setTotal(data.total);
            });
    }, [page, search]);
    
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">
                    Participantes
                </h1>
                <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm w-72 flex items-center gap-3">
                    <Search className="size-3 text-emerald-300" />
                    <input
                        className="bg-transparent flex-1 outline-none h-auto border-none p-0 text-sm focus:ring-0"
                        type="text"
                        placeholder="Buscar participante..."
                        onChange={handleSearchAttendees}
                        value={search}
                    />
                </div>
            </div>
            <Table>
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader  style={{ width: 48 }}>
                            <input className="size-4 bg-black/20 rounded border border-white/10" type="checkbox" name="" id="" />
                        </TableHeader>
                        <TableHeader>
                            <span>
                                Código
                            </span>
                        </TableHeader>
                        <TableHeader>
                            <span>
                                Participante
                            </span>
                        </TableHeader>
                        <TableHeader>
                            <span>
                                Data de inscrição
                            </span>
                        </TableHeader>
                        <TableHeader>
                            <span>
                                Data do check-in
                            </span>
                        </TableHeader>
                        <TableHeader style={{ width: 64 }}>
                        </TableHeader>
                    </tr>
                </thead>
                <tbody>
                    { attendees.map((attendee) => {
                        return (
                            <TableRow key={crypto.randomUUID()}>
                                <TableCell>
                                    <input className="size-4 bg-black/20 rounded border border-white/10" type="checkbox" name="" id="" />
                                </TableCell>
                                <TableCell>
                                    <span>
                                        { attendee.id }
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white truncate">
                                            { attendee.name }
                                        </span>
                                        <span>
                                            { attendee.email }
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span>
                                        { dayjs(attendee.createdAt).fromNow() }
                                    </span>
                                </TableCell>
                                <TableCell>
                                        { attendee.checkedInAt ? 
                                            <span>
                                                { dayjs(attendee.checkedInAt).fromNow() }
                                            </span> 
                                        : 
                                            <span className="text-zinc-500">
                                                Não fez check-in
                                            </span> 
                                        }
                                </TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4"/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                            Mostrando {attendees.length} de {total} itens
                        </TableCell>
                        <TableCell colSpan={3} className="text-right">
                            <div className="inline-flex gap-8 items-center">
                                <span>Página { page } de { Math.ceil(total / 10) }</span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={() => { changePage(1) }} disabled={page === 1}>
                                        <ChevronsLeft className="size-4"/>
                                    </IconButton>
                                    <IconButton onClick={() => {changePage(page - 1)}} disabled={page === 1}>
                                        <ChevronLeft className="size-4"/>
                                    </IconButton>
                                    <IconButton onClick={() => {changePage(page + 1)}} disabled={page === Math.ceil(total / 10)}>
                                        <ChevronRight className="size-4"/>
                                    </IconButton>
                                    <IconButton onClick={() => { changePage(Math.ceil(total / 10)) }} disabled={page === Math.ceil(total / 10)}>
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