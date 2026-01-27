import type FitParser from 'fit-file-parser'

export type OriginalParsedFit = Awaited<ReturnType<InstanceType<typeof FitParser>['parseAsync']>>
export type ParsedRecord = Omit<NonNullable<OriginalParsedFit['records']>[number], 'timestamp'> & {
  timestamp: Date; // fit-file-package has wrong type for time
}
export type ParsedFit = Awaited<ReturnType<InstanceType<typeof FitParser>['parseAsync']>> & {
  records?: ParsedRecord[];
}
