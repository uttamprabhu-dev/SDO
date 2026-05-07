import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { fetchCases } from '@/redux/actions/caseActions';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

type Field = { value: string | null; displayValue: string | null } | null | undefined;
const val = (field: Field) => field?.displayValue ?? field?.value ?? '—';

export default function Case() {
    const dispatch = useDispatch<AppDispatch>();
    const { cases, totalCount, loading, error } = useSelector((state: RootState) => state.cases);

    useEffect(() => {
        if (cases.length === 0) {
            dispatch(fetchCases());
        }
        console.log('Total Count: ' + totalCount + ' cases: ' + cases);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Cases</h1>
                {!loading && !error && (
                    <Badge variant="secondary">{totalCount} total</Badge>
                )}
            </div>

            {loading && (
                <div className="flex items-center gap-2 text-gray-500">
                    <Spinner className="size-5" />
                    <span>Loading cases…</span>
                </div>
            )}

            {error && (
                <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Case Number</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Origin</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cases.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                                    No cases found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            cases.map((c) => (
                                <TableRow key={c.Id}>
                                    <TableCell className="font-medium">{val(c.CaseNumber)}</TableCell>
                                    <TableCell>{val(c.Status)}</TableCell>
                                    <TableCell>{val(c.Priority)}</TableCell>
                                    <TableCell>{val(c.Origin)}</TableCell>
                                    <TableCell>{val(c.Subject)}</TableCell>
                                    <TableCell>{val(c.Description)}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
