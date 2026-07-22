export interface Application {
  id: string
  companyName: string
  jobTitle: string
  jobUrl?: string
  source: string
  status:
    | 'Saved'
    | 'Applied'
    | 'Assessment'
    | 'Interview'
    | 'Rejected'
    | 'Offer'
  applicationDate: string
  notes?: string
}
