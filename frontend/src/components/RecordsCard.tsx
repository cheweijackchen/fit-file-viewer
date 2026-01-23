import { Accordion, Group, NumberInput, Title, Text, Switch, Flex, NumberFormatter } from '@mantine/core'
import dayjs from 'dayjs'
import { DataTable, type DataTableColumn } from 'mantine-datatable'
import { useEffect, useState } from 'react'
import { convertFitDataLength } from '@/lib/converter'
import { type ParsedRecord } from '@/model/fitParser'

interface Props {
  records: ParsedRecord[];
}

const PAGE_SIZES = [10, 15, 20, 50]

export function RecordsCard({ records }: Props) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [displayedRecords, setDisplayedRecords] = useState(records.slice(0, pageSize))
  const [isRawData, setIsRawData] = useState(false)

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

  const columns: DataTableColumn<ParsedRecord>[] = [
    {
      accessor: 'timestamp',
      noWrap: true,
      render: record => isRawData
        ? dayjs(record.timestamp).format()
        : dayjs(record.timestamp).format('YYYY/MM/DD HH:mm:ss')
    },
    {
      accessor: 'position_lat',
      textAlign: isRawData ? 'left' : 'right',
      render: record => (isRawData
        ? record.position_lat
        : record.position_lat?.toFixed(5)) ?? '-'
    },
    {
      accessor: 'position_long',
      textAlign: isRawData ? 'left' : 'right',
      render: record => (isRawData
        ? record.position_long
        : record.position_long?.toFixed(5)) ?? '-'
    },
    {
      accessor: 'heart_rate',
      textAlign: 'right'
    },
    {
      accessor: 'distance',
      textAlign: isRawData ? 'left' : 'right',
      render: record => {
        const distance = (typeof record.distance === 'number')
          ? convertFitDataLength(record.distance, 'm')
          : null
        if (distance !== null) {
          return isRawData
            ? <NumberFormatter
              thousandSeparator
              value={record.distance}
            />
            : <NumberFormatter
              thousandSeparator
              value={Math.round(distance)}
            />
        } else {
          return '-'
        }
      }
    },
    {
      accessor: 'activity_type',
      textAlign: 'center',
      render: record => record.activity_type ?? '-'
    },
    {
      accessor: 'enhanced_altitude'
    },
    {
      accessor: 'enhanced_speed'
    },
    {
      accessor: 'cadence',
      textAlign: 'right'
    },
    {
      accessor: 'fractional_cadence',
      textAlign: 'right'
    },
    {
      accessor: 'power',
      textAlign: 'right'
    },
  ]

  const rawDataSwitch = (
    <Switch
      mb="md"
      label="Show raw data"
      classNames={{
        body: 'flex-row-reverse'
      }}
      styles={{
        label: {
          paddingRight: 'var(--mantine-spacing-sm',
          paddingLeft: 0
        }
      }}
      checked={isRawData}
      onChange={(event) => setIsRawData(event.currentTarget.checked)}
    />
  )

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
          <Title
            size="h5"
            order={3}
          >Records</Title>
        </Accordion.Control>
        <Accordion.Panel
          styles={{
            content: {
              paddingLeft: 'var(--mantine-spacing-xl)',
              paddingRight: 'var(--mantine-spacing-xl)'
            }
          }}
        >
          <Flex justify="end">
            {rawDataSwitch}
          </Flex>
          <DataTable
            highlightOnHover
            backgroundColor="transparent"
            columns={columns}
            records={displayedRecords}
            totalRecords={records.length}
            recordsPerPage={pageSize}
            page={page}
            recordsPerPageOptions={PAGE_SIZES}
            paginationWrapBreakpoint="lg"
            onRecordsPerPageChange={setPageSize}
            onPageChange={setPage}
            // custom "Jump to page" control using renderPagination callback
            renderPagination={({ state, actions, Controls }) => (
              <>
                <Controls.Text />
                <Controls.PageSizeSelector />
                <Group gap="xs">
                  <Text size={state.paginationSize}>Go to page</Text>
                  <NumberInput
                    hideControls
                    // custom input height to match pagination button height
                    styles={{ wrapper: { '--input-height-sm': '26px' } }}
                    w={60}
                    size={state.paginationSize}
                    min={1}
                    max={Math.ceil(records.length / pageSize)}
                    value={page}
                    onChange={(p) => (typeof p === 'number') && actions.setPage(p)}
                  />
                </Group>
                <Controls.Pagination />
              </>
            )}
          ></DataTable>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
