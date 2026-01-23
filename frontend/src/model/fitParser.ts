import type FitParser from 'fit-file-parser'

export type ParsedFit = Awaited<ReturnType<InstanceType<typeof FitParser>['parseAsync']>>
export type ParsedRecord = NonNullable<ParsedFit['records']>[number] & {
  timestamp: Date;
}
