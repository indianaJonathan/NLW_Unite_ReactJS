import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";

export function AttendeeList () {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">
                    Participantes
                </h1>
                <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm w-72 flex items-center gap-3">
                    <Search className="size-3 text-emerald-300" />
                    <input className="bg-transparent flex-1 outline-none h-auto border-none p-0 text-sm" type="text" placeholder="Buscar participante..."/>
                </div>
            </div>
            <div className="border border-white/10 rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr style={{ width: 48 }} className="border-b border-white/10">
                            <th className="py-3 px-4 text-sm font-semibold text-left">
                                <input className="size-4 bg-black/20 rounded border border-white/10" type="checkbox" name="" id="" />
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">
                                <span>
                                    Código
                                </span>
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">
                                <span>
                                    Participante
                                </span>
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">
                                <span>
                                    Data de inscrição
                                </span>
                            </th>
                            <th className="py-3 px-4 text-sm font-semibold text-left">
                                <span>
                                    Data do check-in
                                </span>
                            </th>
                            <th style={{ width: 64 }} className="py-3 px-4 text-sm font-semibold text-left">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { Array.from({ length: 8 }).map((_, index) => {
                            return (
                                <tr key={crypto.randomUUID()} className="border-b border-white/10 hover:bg-white/5">
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <input className="size-4 bg-black/20 rounded border border-white/10" type="checkbox" name="" id="" />
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <span>
                                            12312
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-white">
                                                Participante {index + 1}
                                            </span>
                                            <span>
                                                participante1@mail.com
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <span>
                                            7 dias atrás
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <span>
                                            3 dias atrás
                                        </span>
                                    </td>
                                    <td>
                                        <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                                            <MoreHorizontal className="size-4"/>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300">
                                Mostrando 10 de 228 itens
                            </td>
                            <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300 text-right">
                                <div className="inline-flex gap-8 items-center">
                                    <span>Página 1 de 23</span>
                                    <div className="flex gap-1.5">
                                        <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                                            <ChevronsLeft className="size-4"/>
                                        </button>
                                        <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                                            <ChevronLeft className="size-4"/>
                                        </button>
                                        <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                                            <ChevronRight className="size-4"/>
                                        </button>
                                        <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                                            <ChevronsRight className="size-4"/>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}