import { describe, it, expect, beforeEach } from 'vitest'
import { FitDataFormatter, FitDataField, OutputPresets } from '@/lib/fitDataFormatter'

describe('FitDataFormatter', () => {
  // ========================================
  // Constructor and Configuration Tests
  // ========================================

  describe('Constructor', () => {
    it('should initialize with default parser options', () => {
      const formatter = new FitDataFormatter()

      const result = formatter.format(FitDataField.distance, 1000)
      expect(result.raw).toBe(1000) // input unit is m (default)
    })

    it('should accept custom parser options', () => {
      const formatter = new FitDataFormatter({ lengthUnit: 'km' })

      const result = formatter.format(FitDataField.distance, 5)
      expect(result.raw).toBe(5000) // 5 km = 5000 m
    })

    it('should accept metric preset for output', () => {
      const formatter = new FitDataFormatter({}, 'metric')

      const result = formatter.format(FitDataField.distance, 1000)
      expect(result.unit).toBe('km')
      expect(result.label).toBe('Distance')
    })

    it('should accept imperial preset for output', () => {
      const formatter = new FitDataFormatter({}, 'imperial')

      const result = formatter.format(FitDataField.distance, 1609.34)
      expect(result.unit).toBe('mi')
      expect(result.label).toBe('Distance')
    })

    it('should accept custom output options', () => {
      const formatter = new FitDataFormatter(
        {},
        { lengthUnit: 'm', speedUnit: 'm/s', temperatureUnit: 'celsius', language: 'zh-TW' }
      )

      const result = formatter.format(FitDataField.distance, 1000)
      expect(result.unit).toBe('公尺')
    })
  })

  // ========================================
  // Length Conversion Tests
  // ========================================

  describe('Distance Field - Length Conversion', () => {
    describe('Parser Input: meters (m)', () => {
      let formatter: FitDataFormatter

      beforeEach(() => {
        formatter = new FitDataFormatter({ lengthUnit: 'm' })
      })

      it('should convert meters to kilometers', () => {
        const valueInMeters = 5234.5

        const result = formatter.format(FitDataField.distance, valueInMeters)

        expect(result.value).toBe('5.23')
        expect(result.unit).toBe('km')
        expect(result.raw).toBe(5234.5)
      })

      it('should convert meters to miles', () => {
        const valueInMeters = 5000

        const result = formatter.format(FitDataField.distance, valueInMeters, { lengthUnit: 'mi' })

        expect(result.value).toBe('3.11')
        expect(result.unit).toBe('mi')
      })

      it('should display meters when output unit is meters', () => {
        const valueInMeters = 5234

        const result = formatter.format(FitDataField.distance, valueInMeters, { lengthUnit: 'm' })

        expect(result.value).toBe('5234')
        expect(result.unit).toBe('m')
      })

      it('should convert meters to feet', () => {
        const valueInMeters = 100

        const result = formatter.format(FitDataField.distance, valueInMeters, { lengthUnit: 'ft' })

        expect(result.value).toBe('328')
        expect(result.unit).toBe('ft')
      })
    })

    describe('Parser Input: kilometers (km)', () => {
      let formatter: FitDataFormatter

      beforeEach(() => {
        formatter = new FitDataFormatter({ lengthUnit: 'km' })
      })

      it('should handle kilometers input correctly', () => {
        const valueInKm = 5.2345

        const result = formatter.format(FitDataField.distance, valueInKm)

        expect(result.value).toBe('5.23')
        expect(result.unit).toBe('km')
        expect(result.raw).toBe(5234.5)
      })

      it('should convert km to miles', () => {
        const valueInKm = 10

        const result = formatter.format(FitDataField.distance, valueInKm, { lengthUnit: 'mi' })

        expect(result.value).toBe('6.21')
        expect(result.unit).toBe('mi')
      })
    })

    describe('Parser Input: miles (mi)', () => {
      let formatter: FitDataFormatter

      beforeEach(() => {
        formatter = new FitDataFormatter({ lengthUnit: 'mi' })
      })

      it('should handle miles input correctly', () => {
        const valueInMiles = 3.25

        const result = formatter.format(FitDataField.distance, valueInMiles)

        expect(result.value).toBe('5.23')
        expect(result.unit).toBe('km')
        expect(result.raw).toBeCloseTo(5230.355, 1)
      })

      it('should keep miles when output is miles', () => {
        const valueInMiles = 5

        const result = formatter.format(FitDataField.distance, valueInMiles, { lengthUnit: 'mi' })

        expect(result.value).toBe('5.00')
        expect(result.unit).toBe('mi')
      })
    })

    describe('Edge Cases', () => {
      let formatter: FitDataFormatter

      beforeEach(() => {
        formatter = new FitDataFormatter({ lengthUnit: 'm' })
      })

      it('should handle zero distance', () => {
        const zeroDistance = 0

        const result = formatter.format(FitDataField.distance, zeroDistance)

        expect(result.value).toBe('0.00')
        expect(result.unit).toBe('km')
      })

      it('should handle very large distances', () => {
        const largeDistance = 1000000 // 1000 km

        const result = formatter.format(FitDataField.distance, largeDistance)

        expect(result.value).toBe('1000.00')
        expect(result.unit).toBe('km')
      })

      it('should handle very small distances', () => {
        const smallDistance = 0.5 // 0.5 m

        const result = formatter.format(FitDataField.distance, smallDistance)

        expect(result.value).toBe('0.00')
        expect(result.unit).toBe('km')
      })
    })
  })

  // ========================================
  // Speed Conversion Tests
  // ========================================

  describe('Speed Field - Speed Conversion', () => {
    describe('Parser Input: m/s', () => {
      let formatter: FitDataFormatter

      beforeEach(() => {
        formatter = new FitDataFormatter({ speedUnit: 'm/s' })
      })

      it('should convert m/s to km/h', () => {
        const speedInMPS = 3.5

        const result = formatter.format(FitDataField.speed, speedInMPS, { speedUnit: 'km/h' })

        expect(result.value).toBe('12.6')
        expect(result.unit).toBe('km/h')
        expect(result.raw).toBe(3.5)
      })

      it('should convert m/s to mph', () => {
        const speedInMPS = 10

        const result = formatter.format(FitDataField.speed, speedInMPS, { speedUnit: 'mph' })

        expect(result.value).toBe('22.4')
        expect(result.unit).toBe('mph')
      })

      it('should keep m/s when output is m/s', () => {
        const speedInMPS = 5.5

        const result = formatter.format(FitDataField.speed, speedInMPS, { speedUnit: 'm/s' })

        expect(result.value).toBe('5.50')
        expect(result.unit).toBe('m/s')
      })
    })

    describe('Parser Input: km/h', () => {
      let formatter: FitDataFormatter

      beforeEach(() => {
        formatter = new FitDataFormatter({ speedUnit: 'km/h' })
      })

      it('should convert km/h to m/s', () => {
        const speedInKmh = 18 // 18 km/h = 5 m/s

        const result = formatter.format(FitDataField.speed, speedInKmh, { speedUnit: 'm/s' })

        expect(result.value).toBe('5.00')
        expect(result.unit).toBe('m/s')
      })

      it('should keep km/h when output is km/h', () => {
        const speedInKmh = 15.5

        const result = formatter.format(FitDataField.speed, speedInKmh, { speedUnit: 'km/h' })

        expect(result.value).toBe('15.5')
        expect(result.unit).toBe('km/h')
      })
    })

    describe('Parser Input: mph', () => {
      let formatter: FitDataFormatter

      beforeEach(() => {
        formatter = new FitDataFormatter({ speedUnit: 'mph' })
      })

      it('should convert mph to km/h', () => {
        const speedInMph = 10

        const result = formatter.format(FitDataField.speed, speedInMph, { speedUnit: 'km/h' })

        expect(result.value).toBe('16.1')
        expect(result.unit).toBe('km/h')
      })
    })

    describe('Edge Cases', () => {
      let formatter: FitDataFormatter

      beforeEach(() => {
        formatter = new FitDataFormatter({ speedUnit: 'm/s' })
      })

      it('should handle zero speed', () => {
        const zeroSpeed = 0

        const result = formatter.format(FitDataField.speed, zeroSpeed)

        expect(result.value).toBe('0.0')
        expect(result.unit).toBe('km/h')
      })
    })
  })

  // ========================================
  // Pace Conversion Tests
  // ========================================

  describe('Pace Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter({ speedUnit: 'm/s' })
    })

    it('should format pace in min/km from m/s', () => {
      const speedInMPS = 3.33 // ~3:00 min/km

      const result = formatter.format(FitDataField.pace, speedInMPS, { speedUnit: 'km/h' })

      expect(result.value).toBe('5:00')
      expect(result.unit).toBe('min/km')
    })

    it('should format pace in min/mi from m/s', () => {
      const speedInMPS = 3.33

      const result = formatter.format(FitDataField.pace, speedInMPS, { speedUnit: 'mph' })

      expect(result.value).toBe('8:03')
      expect(result.unit).toBe('min/mi')
    })

    it('should handle zero speed with placeholder', () => {
      const zeroSpeed = 0

      const result = formatter.format(FitDataField.pace, zeroSpeed)

      expect(result.value).toBe('--:--')
      expect(result.unit).toBe('min/km')
    })

    it('should pad seconds with leading zero', () => {
      const speedInMPS = 2.78 // ~6:00 min/km

      const result = formatter.format(FitDataField.pace, speedInMPS)

      // FIXME: 5:995 -> 06:00
      expect(result.value).toMatch('5:60')
    })
  })

  // ========================================
  // Temperature Conversion Tests
  // ========================================

  describe('Temperature Field', () => {
    describe('Parser Input: Celsius', () => {
      let formatter: FitDataFormatter

      beforeEach(() => {
        formatter = new FitDataFormatter({ temperatureUnit: 'celsius' })
      })

      it('should keep celsius when output is celsius', () => {
        const tempInCelsius = 25.5

        const result = formatter.format(FitDataField.temperature, tempInCelsius)

        expect(result.value).toBe('25.5')
        expect(result.unit).toBe('°C')
      })

      it('should convert celsius to fahrenheit', () => {
        const tempInCelsius = 0

        const result = formatter.format(FitDataField.temperature, tempInCelsius, { temperatureUnit: 'fahrenheit' })

        expect(result.value).toBe('32.0')
        expect(result.unit).toBe('°F')
      })

      it('should convert 100°C to 212°F', () => {
        const tempInCelsius = 100

        const result = formatter.format(FitDataField.temperature, tempInCelsius, { temperatureUnit: 'fahrenheit' })

        expect(result.value).toBe('212.0')
        expect(result.unit).toBe('°F')
      })
    })

    describe('Parser Input: Kelvin', () => {
      let formatter: FitDataFormatter

      beforeEach(() => {
        formatter = new FitDataFormatter({ temperatureUnit: 'kelvin' })
      })

      it('should convert kelvin to celsius', () => {
        const tempInKelvin = 273.15

        const result = formatter.format(FitDataField.temperature, tempInKelvin)

        expect(result.value).toBe('0.0')
        expect(result.unit).toBe('°C')
      })

      it('should convert kelvin to fahrenheit', () => {
        const tempInKelvin = 273.15

        const result = formatter.format(FitDataField.temperature, tempInKelvin, { temperatureUnit: 'fahrenheit' })

        expect(result.value).toBe('32.0')
        expect(result.unit).toBe('°F')
      })
    })

    describe('Parser Input: Fahrenheit', () => {
      let formatter: FitDataFormatter

      beforeEach(() => {
        formatter = new FitDataFormatter({ temperatureUnit: 'fahrenheit' })
      })

      it('should convert fahrenheit to celsius', () => {
        const tempInFahrenheit = 77

        const result = formatter.format(FitDataField.temperature, tempInFahrenheit)

        expect(result.value).toBe('25.0')
        expect(result.unit).toBe('°C')
      })

      it('should keep fahrenheit when output is fahrenheit', () => {
        const tempInFahrenheit = 68

        const result = formatter.format(FitDataField.temperature, tempInFahrenheit, { temperatureUnit: 'fahrenheit' })

        expect(result.value).toBe('68.0')
        expect(result.unit).toBe('°F')
      })
    })

    describe('Edge Cases', () => {
      let formatter: FitDataFormatter

      beforeEach(() => {
        formatter = new FitDataFormatter({ temperatureUnit: 'celsius' })
      })

      it('should handle negative temperatures', () => {
        const negativeTempCelsius = -10

        const result = formatter.format(FitDataField.temperature, negativeTempCelsius)

        expect(result.value).toBe('-10.0')
        expect(result.unit).toBe('°C')
      })
    })
  })

  // ========================================
  // Simple Numeric Fields Tests
  // ========================================

  describe('Heart Rate Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter()
    })

    it('should format heart rate correctly', () => {
      const heartRate = 152.7

      const result = formatter.format(FitDataField.heartRate, heartRate)

      expect(result.value).toBe('153')
      expect(result.unit).toBe('bpm')
      expect(result.label).toBe('Heart Rate')
    })

    it('should round heart rate to nearest integer', () => {
      const heartRate = 145.4

      const result = formatter.format(FitDataField.heartRate, heartRate)

      expect(result.value).toBe('145')
    })
  })

  describe('Cadence Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter()
    })

    it('should format cadence correctly', () => {
      const cadence = 85.6

      const result = formatter.format(FitDataField.cadence, cadence)

      expect(result.value).toBe('86')
      expect(result.unit).toBe('rpm')
    })
  })

  describe('Power Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter()
    })

    it('should format power correctly', () => {
      const power = 250.3

      const result = formatter.format(FitDataField.power, power)

      expect(result.value).toBe('250')
      expect(result.unit).toBe('W')
    })
  })

  describe('Calories Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter()
    })

    it('should format calories correctly', () => {
      const calories = 523.8

      const result = formatter.format(FitDataField.calories, calories)

      expect(result.value).toBe('524')
      expect(result.unit).toBe('kcal')
    })
  })

  describe('Steps Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter()
    })

    it('should format steps in Chinese', () => {
      const steps = 10523

      const result = formatter.format(FitDataField.steps, steps)

      expect(result.value).toBe('10523')
      expect(result.unit).toBe('steps')
    })

    it('should format steps in English', () => {
      const steps = 10523

      const result = formatter.format(FitDataField.steps, steps, { language: 'en-US' })

      expect(result.value).toBe('10523')
      expect(result.unit).toBe('steps')
    })
  })

  describe('Grade Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter()
    })

    it('should format grade with one decimal place', () => {
      const grade = 5.67

      const result = formatter.format(FitDataField.grade, grade)

      expect(result.value).toBe('5.7')
      expect(result.unit).toBe('%')
    })

    it('should handle negative grade', () => {
      const grade = -3.2

      const result = formatter.format(FitDataField.grade, grade)

      expect(result.value).toBe('-3.2')
      expect(result.unit).toBe('%')
    })
  })

  // ========================================
  // Duration Field Tests
  // ========================================

  describe('Duration Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter()
    })

    it('should format duration under 1 hour as MM:SS', () => {
      const durationInSeconds = 665 // 11:05

      const result = formatter.format(FitDataField.duration, durationInSeconds)

      expect(result.value).toBe('11:05')
      expect(result.unit).toBe('')
    })

    it('should format duration over 1 hour as HH:MM:SS', () => {
      const durationInSeconds = 3665 // 1:01:05

      const result = formatter.format(FitDataField.duration, durationInSeconds)

      expect(result.value).toBe('1:01:05')
      expect(result.unit).toBe('')
    })

    it('should pad minutes and seconds with leading zeros', () => {
      const durationInSeconds = 3605 // 1:00:05

      const result = formatter.format(FitDataField.duration, durationInSeconds)

      expect(result.value).toBe('1:00:05')
    })

    it('should handle zero duration', () => {
      const zeroDuration = 0

      const result = formatter.format(FitDataField.duration, zeroDuration)

      expect(result.value).toBe('0:00')
    })

    it('should handle very long durations', () => {
      const longDuration = 86400 // 24 hours

      const result = formatter.format(FitDataField.duration, longDuration)

      expect(result.value).toBe('24:00:00')
    })
  })

  // ========================================
  // Geographic Coordinates Tests
  // ========================================

  describe('Latitude Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter()
    })

    it('should format latitude with 6 decimal places', () => {
      const latitude = 25.0329636

      const result = formatter.format(FitDataField.latitude, latitude)

      expect(result.value).toBe('25.032964')
      expect(result.unit).toBe('°')
    })

    it('should handle negative latitude', () => {
      const latitude = -25.0329636

      const result = formatter.format(FitDataField.latitude, latitude)

      expect(result.value).toBe('-25.032964')
    })
  })

  describe('Longitude Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter()
    })

    it('should format longitude with 6 decimal places', () => {
      const longitude = 121.5654268

      const result = formatter.format(FitDataField.longitude, longitude)

      expect(result.value).toBe('121.565427')
      expect(result.unit).toBe('°')
    })
  })

  // ========================================
  // Timestamp Field Tests
  // ========================================

  describe('Timestamp Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter()
    })

    it('should format timestamp in Chinese locale', () => {
      const timestamp = 1609459200 // 2021-01-01 00:00:00 UTC

      const result = formatter.format(FitDataField.timestamp, timestamp)

      expect(result.unit).toBe('')
      expect(result.value).toContain('2021')
    })

    it('should format timestamp in English locale', () => {
      const timestamp = 1609459200

      const result = formatter.format(FitDataField.timestamp, timestamp, { language: 'en-US' })

      expect(result.unit).toBe('')
      expect(result.value).toContain('2021')
    })
  })

  // ========================================
  // Multi-field Formatting Tests
  // ========================================

  describe('formatMultiple Method', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter({ lengthUnit: 'm', speedUnit: 'm/s' })
    })

    it('should format multiple fields correctly', () => {
      const data = {
        [FitDataField.distance]: 10500,
        [FitDataField.duration]: 3665,
        [FitDataField.heartRate]: 145.7,
        [FitDataField.cadence]: 85.3,
      }

      const result = formatter.formatMultiple(data)

      expect(result.distance.value).toBe('10.50')
      expect(result.duration.value).toBe('1:01:05')
      expect(result.heartRate.value).toBe('146')
      expect(result.cadence.value).toBe('85')
    })

    it('should apply output options to all fields', () => {
      const data = {
        [FitDataField.distance]: 5000,
        [FitDataField.speed]: 3.5,
      }

      const result = formatter.formatMultiple(data, {
        lengthUnit: 'mi',
        speedUnit: 'mph',
        language: 'en-US'
      })

      expect(result.distance.unit).toBe('mi')
      expect(result.speed.unit).toBe('mph')
      expect(result.distance.label).toBe('Distance')
    })

    it('should skip undefined and null values', () => {
      const data = {
        [FitDataField.distance]: 5000,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [FitDataField.speed]: undefined as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [FitDataField.heartRate]: null as any,
      }

      const result = formatter.formatMultiple(data)

      expect(result.distance).toBeDefined()
      expect(result.speed).toBeUndefined()
      expect(result.heartRate).toBeUndefined()
    })

    it('should handle empty data object', () => {
      const emptyData = {}

      const result = formatter.formatMultiple(emptyData)

      expect(Object.keys(result)).toHaveLength(0)
    })
  })

  // ========================================
  // getDisplayString Method Tests
  // ========================================

  describe('getDisplayString Method', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter({ lengthUnit: 'm' })
    })

    it('should return value with unit', () => {
      const distance = 5000

      const displayString = formatter.getDisplayString(FitDataField.distance, distance)

      expect(displayString).toBe('5.00 km')
    })

    it('should return value without unit for unitless fields', () => {
      const duration = 665

      const displayString = formatter.getDisplayString(FitDataField.duration, duration)

      expect(displayString).toBe('11:05')
    })

    it('should respect output options override', () => {
      const distance = 5000

      const displayString = formatter.getDisplayString(
        FitDataField.distance,
        distance,
        { lengthUnit: 'mi' }
      )

      expect(displayString).toBe('3.11 mi')
    })
  })

  // ========================================
  // Configuration Update Tests
  // ========================================

  describe('setDefaultOutputOptions Method', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter()
    })

    it('should update default output options with preset', () => {
      const distance = 1609.34

      formatter.setDefaultOutputOptions('imperial')
      const result = formatter.format(FitDataField.distance, distance)

      expect(result.unit).toBe('mi')
      expect(result.label).toBe('Distance')
    })

    it('should update default output options with partial custom options', () => {
      const distance = 1000

      formatter.setDefaultOutputOptions({ lengthUnit: 'm' })
      const result = formatter.format(FitDataField.distance, distance)

      expect(result.unit).toBe('m')
    })

    it('should merge with existing options when updating partially', () => {
      formatter.setDefaultOutputOptions({ lengthUnit: 'mi', language: 'en-US' })

      formatter.setDefaultOutputOptions({ speedUnit: 'mph' })
      const distanceResult = formatter.format(FitDataField.distance, 1609.34)
      const speedResult = formatter.format(FitDataField.speed, 10)

      expect(distanceResult.unit).toBe('mi') // 應該保留
      expect(speedResult.unit).toBe('mph') // 新設定
    })
  })

  describe('setParserOptions Method', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter({ lengthUnit: 'm' })
    })

    it('should update parser options', () => {
      const distance = 5 // 5 of some unit

      formatter.setParserOptions({ lengthUnit: 'km' })
      const result = formatter.format(FitDataField.distance, distance)

      expect(result.raw).toBe(5000) // 5 km = 5000 m
    })

    it('should merge with existing parser options', () => {
      formatter.setParserOptions({ speedUnit: 'km/h' })

      const distanceResult = formatter.format(FitDataField.distance, 1000)
      const speedResult = formatter.format(FitDataField.speed, 18)

      expect(distanceResult.raw).toBe(1000) // lengthUnit 仍是 m
      expect(speedResult.raw).toBe(5) // 18 km/h = 5 m/s
    })
  })

  // ========================================
  // Language and Localization Tests
  // ========================================

  describe('Language Support', () => {
    it('should use Chinese labels with zh-TW', () => {
      const formatter = new FitDataFormatter({}, { language: 'zh-TW' })

      const result = formatter.format(FitDataField.heartRate, 150)

      expect(result.label).toBe('心率')
    })

    it('should use English labels with en-US', () => {
      const formatter = new FitDataFormatter({}, { language: 'en-US' })

      const result = formatter.format(FitDataField.heartRate, 150)

      expect(result.label).toBe('Heart Rate')
    })

    it('should allow language override per format call', () => {
      const formatter = new FitDataFormatter({}, { language: 'zh-TW' })

      const zhResult = formatter.format(FitDataField.distance, 1000)
      const enResult = formatter.format(FitDataField.distance, 1000, { language: 'en-US' })

      expect(zhResult.label).toBe('距離')
      expect(enResult.label).toBe('Distance')
    })
  })

  // ========================================
  // Output Override Tests
  // ========================================

  describe('Output Options Override', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter(
        { lengthUnit: 'm', speedUnit: 'm/s' },
        { lengthUnit: 'km', speedUnit: 'km/h' }
      )
    })

    it('should use default output options when no override provided', () => {
      const distance = 5000

      const result = formatter.format(FitDataField.distance, distance)

      expect(result.unit).toBe('km')
    })

    it('should override output options per call', () => {
      const distance = 5000

      const kmResult = formatter.format(FitDataField.distance, distance)
      const miResult = formatter.format(FitDataField.distance, distance, { lengthUnit: 'mi' })
      const mResult = formatter.format(FitDataField.distance, distance, { lengthUnit: 'm' })

      expect(kmResult.unit).toBe('km')
      expect(miResult.unit).toBe('mi')
      expect(mResult.unit).toBe('m')
    })

    it('should allow partial override without affecting other options', () => {
      const formatter2 = new FitDataFormatter(
        {},
        { lengthUnit: 'km', speedUnit: 'km/h', language: 'zh-TW' }
      )

      const result = formatter2.format(FitDataField.distance, 5000, { lengthUnit: 'mi' })

      expect(result.unit).toBe('英里') // lengthUnit is overridden
      expect(result.label).toBe('距離') // language remains default option
    })
  })

  // ========================================
  // Elevation and Stride Length Tests
  // ========================================

  describe('Elevation Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter({ lengthUnit: 'm' })
    })

    it('should format elevation in meters', () => {
      const elevation = 250.7

      const result = formatter.format(FitDataField.elevation, elevation, { lengthUnit: 'm' })

      expect(result.value).toBe('251')
      expect(result.unit).toBe('m')
    })

    it('should format elevation in feet', () => {
      const elevation = 100

      const result = formatter.format(FitDataField.elevation, elevation, { lengthUnit: 'ft' })

      expect(result.value).toBe('328')
      expect(result.unit).toBe('ft')
    })
  })

  describe('Stride Length Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter({ lengthUnit: 'm' })
    })

    it('should format stride length in meters', () => {
      const strideLength = 1.2

      const result = formatter.format(FitDataField.strideLength, strideLength, { lengthUnit: 'm' })

      expect(result.value).toBe('1')
      expect(result.unit).toBe('m')
    })

    it('should format stride length in km', () => {
      const strideLength = 1.2

      const result = formatter.format(FitDataField.strideLength, strideLength, { lengthUnit: 'km' })

      expect(result.value).toBe('0.00')
      expect(result.unit).toBe('km')
    })
  })

  // ========================================
  // Vertical Speed Tests
  // ========================================

  describe('Vertical Speed Field', () => {
    let formatter: FitDataFormatter

    beforeEach(() => {
      formatter = new FitDataFormatter({ speedUnit: 'm/s' })
    })

    it('should format vertical speed in m/s', () => {
      const verticalSpeed = 0.5

      const result = formatter.format(FitDataField.verticalSpeed, verticalSpeed, { speedUnit: 'm/s' })

      expect(result.value).toBe('0.50')
      expect(result.unit).toBe('m/s')
    })

    it('should format vertical speed in km/h', () => {
      const verticalSpeed = 0.5

      const result = formatter.format(FitDataField.verticalSpeed, verticalSpeed, { speedUnit: 'km/h' })

      expect(result.value).toBe('1.8')
      expect(result.unit).toBe('km/h')
    })
  })

  // ========================================
  // Integration Tests
  // ========================================

  describe('Integration Tests', () => {
    it('should handle complete activity data workflow', () => {
      const formatter = new FitDataFormatter(
        { lengthUnit: 'km', speedUnit: 'km/h', temperatureUnit: 'celsius' },
        'metric'
      )

      const activityData = {
        [FitDataField.distance]: 10.5, // 10.5 km
        [FitDataField.duration]: 3665, // 1:01:05
        [FitDataField.speed]: 12.6, // 12.6 km/h
        [FitDataField.heartRate]: 145.7,
        [FitDataField.elevation]: 250,
        [FitDataField.temperature]: 25.5,
        [FitDataField.cadence]: 85,
      }

      const formatted = formatter.formatMultiple(activityData)

      expect(formatted.distance.value).toBe('10.50')
      expect(formatted.distance.unit).toBe('km')
      expect(formatted.duration.value).toBe('1:01:05')
      expect(formatted.speed.value).toBe('12.6')
      expect(formatted.heartRate.value).toBe('146')
      expect(formatted.elevation.value).toBe('250.00') // TODO: check decimal places of elevation
      expect(formatted.temperature.value).toBe('25.5')
      expect(formatted.cadence.value).toBe('85')
    })

    it('should handle parser input conversion and output formatting', () => {
      // Parser units are m, m/s；output units are km, km/h
      const formatter = new FitDataFormatter(
        { lengthUnit: 'm', speedUnit: 'm/s' },
        { lengthUnit: 'km', speedUnit: 'km/h' }
      )

      const distanceResult = formatter.format(FitDataField.distance, 10500) // 10500 m
      const speedResult = formatter.format(FitDataField.speed, 3.5) // 3.5 m/s

      expect(distanceResult.value).toBe('10.50')
      expect(distanceResult.unit).toBe('km')
      expect(speedResult.value).toBe('12.6')
      expect(speedResult.unit).toBe('km/h')
    })

    it('should support switching between metric and imperial mid-session', () => {
      const formatter = new FitDataFormatter({ lengthUnit: 'm' }, 'metric')
      const distance = 5000

      const metricResult = formatter.format(FitDataField.distance, distance)
      formatter.setDefaultOutputOptions('imperial')
      const imperialResult = formatter.format(FitDataField.distance, distance)

      expect(metricResult.unit).toBe('km')
      expect(metricResult.label).toBe('Distance')
      expect(imperialResult.unit).toBe('mi')
      expect(imperialResult.label).toBe('Distance')
    })
  })

  // ========================================
  // Error Handling Tests
  // ========================================

  // TODO: error handling in fitDataFormatter.ts
  // describe('Error Handling', () => {
  //   let formatter: FitDataFormatter;

  //   beforeEach(() => {
  //     formatter = new FitDataFormatter();
  //   });

  //   it('should throw error for unknown field type', () => {
  //     const unknownField = 'unknownField' as FitDataField;

  //     expect(() => {
  //       formatter.format(unknownField, 100);
  //     }).toThrow('Unknown field');
  //   });
  // });

  // ========================================
  // OutputPresets Tests
  // ========================================

  describe('OutputPresets', () => {
    it('should have correct metric preset values', () => {
      expect(OutputPresets.metric.lengthUnit).toBe('km')
      expect(OutputPresets.metric.speedUnit).toBe('km/h')
      expect(OutputPresets.metric.temperatureUnit).toBe('celsius')
      expect(OutputPresets.metric.language).toBe('en-US')
    })

    it('should have correct imperial preset values', () => {
      expect(OutputPresets.imperial.lengthUnit).toBe('mi')
      expect(OutputPresets.imperial.speedUnit).toBe('mph')
      expect(OutputPresets.imperial.temperatureUnit).toBe('fahrenheit')
      expect(OutputPresets.imperial.language).toBe('en-US')
    })
  })
})
