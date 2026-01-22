import { Accordion } from '@mantine/core'
import { DataTable } from 'mantine-datatable'
import { useEffect, useState } from 'react';
import { type ParsedRecord } from '@/model/fitParser'

interface Props {
  records: ParsedRecord[];
}

const PAGE_SIZES = [10, 15, 20, 50]

export function RecordsCard({ records }: Props) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [displayedRecords, setDisplayedRecords] = useState(records.slice(0, pageSize))

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayedRecords(records.slice(from, to));
  }, [page, pageSize, records])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [pageSize]);

  const columns = [
    // {
    //   accessor: 'timestamp'
    // },
    {
      accessor: 'position_lat'
    },
    {
      accessor: 'position_long'
    },
    {
      accessor: 'heart_rate'
    },
    {
      accessor: 'distance'
    },
    {
      accessor: 'activity_type'
    },
    {
      accessor: 'enhanced_altitude'
    },
    {
      accessor: 'enhanced_speed'
    },
    {
      accessor: 'cadence'
    },
    {
      accessor: 'fractional_cadence'
    },
    {
      accessor: 'power'
    },
  ]

  return (
    <Accordion
      chevronPosition="right"
      variant="contained"
      radius="md"
    >
      <Accordion.Item
        key="records"
        value="records"
      >
        <Accordion.Control
          px="xl"
        >
          Records
        </Accordion.Control>
        <Accordion.Panel>
          <DataTable
            columns={columns}
            records={displayedRecords}
            totalRecords={records.length}
            recordsPerPage={pageSize}
            page={page}
            recordsPerPageOptions={PAGE_SIZES}
            onPageChange={(p) => setPage(p)}
            onRecordsPerPageChange={setPageSize}
          ></DataTable>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
