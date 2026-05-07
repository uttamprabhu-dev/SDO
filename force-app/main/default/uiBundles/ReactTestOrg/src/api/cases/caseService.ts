import GET_CASE_QUERY from './query/getCases.graphql?raw';
import { executeGraphQL } from '../graphqlClient';

interface SalesforceFieldValue {
    value: string;
    displayValue: string;
}

interface SalesforceOptionalFieldValue {
    value: string | null;
    displayValue: string | null;
}

export interface CaseNode {
    Id: string;
    CaseNumber: SalesforceFieldValue;
    Status: SalesforceFieldValue;
    Origin: SalesforceOptionalFieldValue | null;
    Priority: SalesforceOptionalFieldValue | null;
    Subject: SalesforceOptionalFieldValue | null;
    Description: SalesforceOptionalFieldValue | null;
}

interface CaseEdge {
    node: CaseNode;
}

interface CaseConnection {
    edges: CaseEdge[];
    totalCount: number;
}

interface GetCasesGraphQLResponse {
    uiapi: {
        query: {
            Case: CaseConnection;
        };
    };
}

export interface CasesResult {
    cases: CaseNode[];
    totalCount: number;
}

export async function getCases(): Promise<CasesResult> {
    const data = await executeGraphQL<GetCasesGraphQLResponse, Record<string, never>>(
        GET_CASE_QUERY
    );
    const conn = data.uiapi.query.Case;
    return {
        cases: conn.edges.map(e => e.node),
        totalCount: conn.totalCount,
    };
}