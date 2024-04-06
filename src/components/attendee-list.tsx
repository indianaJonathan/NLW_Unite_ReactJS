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
import { attendees as fetchedAttendees } from "../data/attendees";

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

type AttendeeType = {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    checkedInAt?: Date;
}

export function AttendeeList () {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [attendees, setAttendees] = useState<AttendeeType[]>(fetchedAttendees);
    const [filteredAttendees, setFilteredAttendees] = useState<AttendeeType[]>(attendees);

    function handleSearchAttendees (e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.currentTarget.value);
        setFilteredAttendees(attendees.filter((attendee) => attendee.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
    }

    function changePage(desiredPage: number) {
        setPage(desiredPage);
    }

    useEffect(() => {
        setAttendees(fetchedAttendees);
    }, []);
    
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">
                    Participantes
                </h1>
                <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm w-72 flex items-center gap-3">
                    <Search className="size-3 text-emerald-300" />
                    <input
                        className="bg-transparent flex-1 outline-none h-auto border-none p-0 text-sm"
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
                    { filteredAttendees.slice(((page - 1) * 10), (page * 10)).map((attendee) => {
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
                                    <span>
                                        { dayjs(attendee.checkedInAt).fromNow() }
                                    </span>
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
                            Mostrando 10 de {filteredAttendees.length} itens
                        </TableCell>
                        <TableCell colSpan={3} className="text-right">
                            <div className="inline-flex gap-8 items-center">
                                <span>Página { page } de { Math.ceil(filteredAttendees.length / 10) }</span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={() => { changePage(1) }} disabled={page === 1}>
                                        <ChevronsLeft className="size-4"/>
                                    </IconButton>
                                    <IconButton onClick={() => {changePage(page - 1)}} disabled={page === 1}>
                                        <ChevronLeft className="size-4"/>
                                    </IconButton>
                                    <IconButton onClick={() => {changePage(page + 1)}} disabled={page === Math.ceil(filteredAttendees.length / 10)}>
                                        <ChevronRight className="size-4"/>
                                    </IconButton>
                                    <IconButton onClick={() => { changePage(Math.ceil(filteredAttendees.length / 10)) }} disabled={page === Math.ceil(filteredAttendees.length / 10)}>
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