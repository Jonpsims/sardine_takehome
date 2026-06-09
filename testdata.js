const sampleData = {
  "customer": {
    "companyName": "Acme Bank",
    "salesforceOpportunityId": "006XX000001",
    "salesforceAccountId": "001XX000002",
    "contactName": "Jane Smith",
    "avgTransactionValue": "$250"
  },
  "updatedAt": "2026-06-01T10:00:00Z",
  "savedBy": "jane@acmebank.com",
  "engagementPhase": 2,
  "industries": ["neobank-consumer", "embedded-finance"],
  "selectedUseCases": ["UC-01", "UC-09"],
  "customUseCases": [
    {
      "id": "CUSTOM-001",
      "name": "Agentic Dispute Resolution",
      "promoted": false,
      "promotedId": null
    }
  ],
  "ucStatus": {
    "UC-01": "design-complete",
    "UC-09": "work-in-progress",
    "CUSTOM-001": "needs-confirmation"
  },
  "ucDesignPriority": {
    "UC-01": "p0",
    "UC-09": "p1"
  },
  "useCasePhases": {
    "UC-01": 1,
    "UC-09": "2"
  },
  "novelUcStatus": {
    "CUSTOM-001": "needs-confirmation"
  },
  "products": {
    "fraud-sdk-web": true,
    "ekyc": true,
    "aml-tm": false
  },
  "flowsRepository": [
    {
      "id": "flow-001",
      "name": "Consumer KYC Onboarding",
      "category": "user-lifecycle",
      "flowType": "kyc",
      "status": "confirmed",
      "confirmed": true,
      "useCaseIds": ["UC-01"],
      "checkpoints": ["customer", "onboarding"],
      "endpoints": ["/v1/customers"],
      "apiEndpoint": "/v1/customers",
      "integrationNotes": "Uses eKYC only, no doc upload",
      "workflowName": "kyc-standard"
    },
    {
      "id": "flow-002",
      "name": "ACH Funding",
      "category": "money-in",
      "flowType": "transaction",
      "status": "draft",
      "confirmed": false,
      "useCaseId": "UC-09",
      "checkpoints": ["ach", "payment"],
      "endpoints": ["/v1/customers"]
    }
  ],
  "fdeItems": [
    {
      "id": "fde-001",
      "label": "API Integration Engineering",
      "cluster": "integration",
      "size": "L",
      "baseHours": 40,
      "bufferPct": 30,
      "status": "confirmed",
      "isCustom": false,
      "triggerSource": "canvas-generate",
      "roles": ["Solutions Architect", "Integration Engineer"],
      "rate": "$215",
      "rateType": "standard",
      "complexityFactors": [],
      "frequency": "one-time"
    },
    {
      "id": "fde-002",
      "label": "Custom AML Rules",
      "cluster": "rules-ml",
      "size": "XL",
      "baseHours": 80,
      "bufferPct": 50,
      "status": "proposed",
      "isCustom": false,
      "triggerSource": "ps-coach",
      "roles": ["Rules / ML Engineer"],
      "rate": "$225",
      "rateType": "standard",
      "complexityFactors": ["data-migration", "legacy-system"],
      "frequency": "one-time"
    }
  ]
}

module.exports = { sampleData }