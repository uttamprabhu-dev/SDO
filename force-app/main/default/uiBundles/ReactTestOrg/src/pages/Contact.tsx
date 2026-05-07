import { useEffect, useState } from 'react';
import { getContacts } from '@/api/contacts/contactService';
import type { ContactResult } from '@/api/contacts/contactService';
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

type Contact = ContactResult['contacts'][number];
type Field = { value: string | null; displayValue: string | null } | null | undefined;

const val = (field: Field) => field?.displayValue ?? field?.value ?? '—';

export default function Contact() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getContacts()
            .then(({ contacts, totalCount }) => {
                setContacts(contacts);
                setTotalCount(totalCount);
            })
            .catch((err: Error) => setError(err.message ?? 'Failed to load contacts.'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
                {!loading && !error && (
                    <Badge variant="secondary">{totalCount} total</Badge>
                )}
            </div>

            {loading && (
                <div className="flex items-center gap-2 text-gray-500">
                    <Spinner className="size-5" />
                    <span>Loading contacts…</span>
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
                            <TableHead>Name</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Account</TableHead>
                            <TableHead>Industry</TableHead>
                            <TableHead>Account Type</TableHead>
                            <TableHead>Owner</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center text-gray-400 py-8">
                                    No contacts found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            contacts.map((contact) => (
                                <TableRow key={contact.Id}>
                                    <TableCell className="font-medium">{val(contact.Name)}</TableCell>
                                    <TableCell>{val(contact.Title)}</TableCell>
                                    <TableCell>
                                        {contact.Email?.value ? (
                                            <a
                                                href={`mailto:${contact.Email.value}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {contact.Email.value}
                                            </a>
                                        ) : '—'}
                                    </TableCell>
                                    <TableCell>{val(contact.Phone)}</TableCell>
                                    <TableCell>{val(contact.Account?.Name)}</TableCell>
                                    <TableCell>{val(contact.Account?.Industry)}</TableCell>
                                    <TableCell>{val(contact.Account?.Type)}</TableCell>
                                    <TableCell>{val(contact.Owner?.Name)}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
