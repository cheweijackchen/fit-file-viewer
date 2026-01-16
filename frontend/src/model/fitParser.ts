import type FitParser from 'fit-file-parser'

export type ParsedFit = Awaited<ReturnType<InstanceType<typeof FitParser>['parseAsync']>>
