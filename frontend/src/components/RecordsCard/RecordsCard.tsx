import { Accordion, Group, NumberInput, Title, Text, Switch, Flex, NumberFormatter } from '@mantine/core'
import dayjs from 'dayjs'
import { DataTable, type DataTableColumn } from 'mantine-datatable'
import { useEffect, useState } from 'react'
import { convertFitDataLength, convertFitDataSpeed } from '@/lib/converter'
import { type ParsedRecord } from '@/model/fitParser'
import { ColumnTitleWithUnit } from './components/ColumnTitleWithUnit'

interface Props {
  records: ParsedRecord[];
}

const PAGE_SIZES = [10, 15, 20, 50]

export function RecordsCard({ records }: Props) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [displayedRecords, setDisplayedRecords] = useState(records.slice(0, pageSize))
  const [isRawData, setIsRawData] = useState(false)

  useEffect(() => {
    const from = (page - 1) * pageSize
    const to = from + pageSize
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayedRecords(records.slice(from, to))
  }, [page, pageSize, records])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1)
  }, [pageSize])

  const columns: DataTableColumn<ParsedRecord>[] = [
    {
      accessor: 'timestamp',
      title: (
        <ColumnTitleWithUnit
          title="Timestamp"
          hiddenUnit={isRawData}
          align="left"
        />
      ),
      noWrap: true,
      render: record => isRawData
        ? dayjs(record.timestamp).format()
        : dayjs(record.timestamp).format('YYYY/MM/DD HH:mm:ss')
    },
    {
      accessor: 'position_lat',
      title: (
        <ColumnTitleWithUnit
          title="Position Lat."
          unit="°"
          hiddenUnit={isRawData}
        />
      ),
      textAlign: isRawData ? 'left' : 'right',
      render: record => (isRawData
        ? record.position_lat
        : record.position_lat?.toFixed(5)) ?? '-'
    },
    {
      accessor: 'position_long',
      title: (
        <ColumnTitleWithUnit
          title="Position Long."
          unit="°"
          hiddenUnit={isRawData}
        />
      ),
      textAlign: isRawData ? 'left' : 'right',
      render: record => (isRawData
        ? record.position_long
        : record.position_long?.toFixed(5)) ?? '-'
    },
    {
      accessor: 'heart_rate',
      textAlign: 'center',
      title: (
        <ColumnTitleWithUnit
          title="Heart Rate"
          unit="bpm"
          hiddenUnit={isRawData}
        />)
    },
    {
      accessor: 'distance',
      title: (
        <ColumnTitleWithUnit
          title="Distance"
          unit="m"
          hiddenUnit={isRawData}
        />
      ),
      textAlign: isRawData ? 'left' : 'center',
      render: record => {
        const distance = (typeof record.distance === 'number')
          ? convertFitDataLength(record.distance, 'm')
          : null
        if (distance !== null) {
          return isRawData
            ? (
              <NumberFormatter
                thousandSeparator
                value={record.distance}
              />)
            : (
              <NumberFormatter
                thousandSeparator
                value={Math.round(distance)}
              />)
        } else {
          return '-'
        }
      }
    },
    {
      accessor: 'activity_type',
      title: (
        <ColumnTitleWithUnit
          title="Activity Type"
          hiddenUnit={isRawData}
        />
      ),
      textAlign: 'center',
      render: record => record.activity_type ?? '-'
    },
    {
      accessor: 'altitude',
      title: (
        <ColumnTitleWithUnit
          title="Altitude"
          unit="m"
          hiddenUnit={isRawData}
        />
      ),
      textAlign: 'center',
      render: record => {
        const altitude = (typeof record.altitude === 'number')
          ? convertFitDataLength(record.altitude, 'm')
          : null
        if (altitude !== null) {
          return isRawData
            ? (
              <NumberFormatter
                thousandSeparator
                value={record.altitude}
              />)
            : (
              <NumberFormatter
                thousandSeparator
                value={Math.round(altitude)}
              />)
        } else {
          return '-'
        }
      }
    },
    {
      accessor: 'enhanced_altitude',
      title: (
        <ColumnTitleWithUnit
          title="Enhanced Altitude"
          unit="m"
          hiddenUnit={isRawData}
        />
      ),
      textAlign: 'center',
      render: record => {
        const altitude = (typeof record.enhanced_altitude === 'number')
          ? convertFitDataLength(record.enhanced_altitude, 'm')
          : null
        if (altitude !== null) {
          return isRawData
            ? (
              <NumberFormatter
                thousandSeparator
                value={record.enhanced_altitude}
              />)
            : (
              <NumberFormatter
                thousandSeparator
                value={Math.round(altitude)}
              />)
        } else {
          return '-'
        }
      }
    },
    {
      accessor: 'enhanced_speed',
      title: (
        <ColumnTitleWithUnit
          title="Enhanced Speed"
          unit="min/km"
          hiddenUnit={isRawData}
        />
      ),
      textAlign: 'center',
      render: record => {
        const speed = (typeof record.enhanced_speed === 'number')
          ? convertFitDataSpeed(record.enhanced_speed, 'min/km').toFixed(2)
          : null
        return speed ?? '-'
      }
    },
    {
      accessor: 'cadence',
      title: (
        <ColumnTitleWithUnit
          title="Cadence"
          unit="rpm"
          hiddenUnit={isRawData}
        />
      ),
      textAlign: 'right'
    },
    {
      accessor: 'fractional_cadence',
      title: (
        <ColumnTitleWithUnit
          title="Fractional Cadence"
          unit="rpm"
          hiddenUnit={isRawData}
        />
      ),
      textAlign: 'center'
    },
    {
      accessor: 'power',
      title: (
        <ColumnTitleWithUnit
          title="Power"
          unit="w"
          hiddenUnit={isRawData}
        />
      ),
      textAlign: 'center'
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
          paddingRight: 'var(--mantine-spacing-sm)',
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
      defaultValue="records"
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
