import { executeGraphQL } from '../graphqlClient';
import GET_CONTACTS_QUERY from './query/getContacts.graphql?raw';

interface ScalarField {
    value: string | null;
    displayValue: string | null;
}

interface ContactAccount {
    Id: string;
    Name: ScalarField | null;
    Industry: ScalarField | null;
    Type: ScalarField | null;
}

interface ContactOwner {
    Id: string;
    Name: ScalarField | null;
}

interface ContactNode {
    Id: string;
    Name: ScalarField | null;
    Title: ScalarField | null;
    Email: ScalarField | null;
    Phone: ScalarField | null;
    Account: ContactAccount | null;
    Owner: ContactOwner | null;
}

interface ContactConnection {
    edges: Array<{ node: ContactNode }>;
    totalCount: number;
}

interface GetContactsResponse {
    uiapi: {
        query: {
            Contact: ContactConnection;
        };
    };
}

export interface ContactResult {
    contacts: ContactNode[];
    totalCount: number;
}

export async function getContacts(): Promise<ContactResult> {
	const data = await executeGraphQL<GetContactsResponse, Record<string, never>>(
		GET_CONTACTS_QUERY
	);
	const conn = data.uiapi.query.Contact;
	return {
		contacts: conn.edges.map(e => e.node),
		totalCount: conn.totalCount,
	};
}