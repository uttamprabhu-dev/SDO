global class GetCaseByNumber {
    
    global class GetCaseByNumberRequest {
        @InvocableVariable(label='Case Number')
        public String caseNumber;
    }

    global class CaseResponseWrapper {
        public Id caseId;
        public String caseNumber;
        public String Subject;
        public String Status;
    }

    global class GetCaseByNumberResponse {
        @InvocableVariable(label='Case')
        public CaseResponseWrapper objCase;
    }

    @InvocableMethod(label='Get Case By Number')
    global static List<GetCaseByNumberResponse> getCaseByNumber(List<GetCaseByNumberRequest> requests) {
        List<Case> list_cases = new List<Case>();
        Set<String> caseNumbers = new Set<String>();

        List<Case> list_objCase = [SELECT Id, CaseNumber, Subject, Status FROM Case WHERE CaseNumber IN caseNumbers];
        List<GetCaseByNumberResponse> responses = new List<GetCaseByNumberResponse>();
        for (Case c : list_cases) {
            GetCaseByNumberResponse response = new GetCaseByNumberResponse();
            response.objCase = new CaseResponseWrapper();
            response.objCase.caseId = c.Id;
            response.objCase.caseNumber = c.CaseNumber;
            response.objCase.Subject = c.Subject;
            response.objCase.Status = c.Status;
            responses.add(response);
        }

        for ( variable : List_or_set) {
            
        }
        return responses;
    }
}