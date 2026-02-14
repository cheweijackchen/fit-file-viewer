const LanguageOption = {
  zh: 'zh-TW',
  en: 'en-US'
} as const

type LanguageOption = typeof LanguageOption[keyof typeof LanguageOption]

interface FitParserOptions {
  lengthUnit?: 'm' | 'km' | 'mi';
  temperatureUnit?: 'celsius' | 'kelvin' | 'fahrenheit';
  speedUnit?: 'm/s' | 'km/h' | 'mph';
}

interface OutputUnitOptions {
  lengthUnit?: 'm' | 'km' | 'mi' | 'ft';
  temperatureUnit?: 'celsius' | 'fahrenheit';
  speedUnit?: 'm/s' | 'km/h' | 'mph' | 'min/km';
  language?: LanguageOption;
}

const OutputPresets = {
  metric: {
    lengthUnit: 'km',
    temperatureUnit: 'celsius',
    speedUnit: 'min/km',
    language: LanguageOption.en,
  } as OutputUnitOptions,
  imperial: {
    lengthUnit: 'mi',
    temperatureUnit: 'fahrenheit',
    speedUnit: 'mph',
    language: LanguageOption.en,
  } as OutputUnitOptions,
} as const

const FitDataField = {
  distance: 'distance',
  speed: 'speed',
  pace: 'pace',
  heartRate: 'heartRate',
  cadence: 'cadence',
  power: 'power',
  elevation: 'elevation',
  temperature: 'temperature',
  calories: 'calories',
  duration: 'duration',
  timestamp: 'timestamp',
  latitude: 'latitude',
  longitude: 'longitude',
  grade: 'grade',
  verticalSpeed: 'verticalSpeed',
  strideLength: 'strideLength',
  steps: 'steps',
} as const

type FitDataField = typeof FitDataField[keyof typeof FitDataField]

interface FormattedValue {
  value: string;
  unit: string;
  raw: number;
  label: string;
}

class FitDataFormatter {
  private parserOptions: Required<FitParserOptions>
  private defaultOutputOptions: Required<OutputUnitOptions>

  private readonly labels: Record<FitDataField, { zh: string; en: string; }> = {
    distance: { zh: '距離', en: 'Distance' },
    speed: { zh: '速度', en: 'Speed' },
    pace: { zh: '配速', en: 'Pace' },
    heartRate: { zh: '心率', en: 'Heart Rate' },
    cadence: { zh: '步頻', en: 'Cadence' },
    power: { zh: '功率', en: 'Power' },
    elevation: { zh: '海拔', en: 'Elevation' },
    temperature: { zh: '溫度', en: 'Temperature' },
    calories: { zh: '卡路里', en: 'Calories' },
    duration: { zh: '時間', en: 'Duration' },
    timestamp: { zh: '時間戳記', en: 'Timestamp' },
    latitude: { zh: '緯度', en: 'Latitude' },
    longitude: { zh: '經度', en: 'Longitude' },
    grade: { zh: '坡度', en: 'Grade' },
    verticalSpeed: { zh: '垂直速度', en: 'Vertical Speed' },
    strideLength: { zh: '步幅', en: 'Stride Length' },
    steps: { zh: '步數', en: 'Steps' },
  }

  constructor(
    parserOptions: FitParserOptions = {},
    outputOptions: OutputUnitOptions | 'metric' | 'imperial' = 'metric'
  ) {
    this.parserOptions = {
      lengthUnit: parserOptions.lengthUnit || 'm',
      temperatureUnit: parserOptions.temperatureUnit || 'celsius',
      speedUnit: parserOptions.speedUnit || 'm/s',
    }

    if (typeof outputOptions === 'string') {
      this.defaultOutputOptions = OutputPresets[outputOptions] as Required<OutputUnitOptions>
    } else {
      this.defaultOutputOptions = {
        lengthUnit: outputOptions.lengthUnit || 'km',
        temperatureUnit: outputOptions.temperatureUnit || 'celsius',
        speedUnit: outputOptions.speedUnit || 'min/km',
        language: outputOptions.language || LanguageOption.en,
      }
    }
  }

  private convertLengthToMeters(value: number): number {
    switch (this.parserOptions.lengthUnit) {
      case 'm': return value
      case 'km': return value * 1000
      case 'mi': return value * 1609.34
    }
  }

  private formatLength(
    valueInMeters: number,
    targetUnit: 'm' | 'km' | 'mi' | 'ft',
    language: string
  ): { value: string; unit: string; } {
    const isZhTW = language === LanguageOption.zh

    switch (targetUnit) {
      case 'm':
        return {
          value: Math.round(valueInMeters).toString(),
          unit: isZhTW ? '公尺' : 'm',
        }
      case 'km':
        return {
          value: (valueInMeters / 1000).toFixed(2),
          unit: 'km',
        }
      case 'mi':
        return {
          value: (valueInMeters / 1609.34).toFixed(2),
          unit: isZhTW ? '英里' : 'mi',
        }
      case 'ft':
        return {
          value: Math.round(valueInMeters * 3.28084).toString(),
          unit: isZhTW ? '英尺' : 'ft',
        }
    }
  }

  private convertTemperatureToCelsius(value: number): number {
    switch (this.parserOptions.temperatureUnit) {
      case 'celsius': return value
      case 'kelvin': return value - 273.15
      case 'fahrenheit': return (value - 32) * 5 / 9
    }
  }

  private formatTemperature(
    valueInCelsius: number,
    targetUnit: 'celsius' | 'fahrenheit'
  ): { value: string; unit: string; } {
    switch (targetUnit) {
      case 'celsius':
        return {
          value: valueInCelsius.toFixed(1),
          unit: '°C',
        }
      case 'fahrenheit':
        return {
          value: ((valueInCelsius * 9 / 5) + 32).toFixed(1),
          unit: '°F',
        }
    }
  }

  private convertSpeedToMPS(value: number): number {
    switch (this.parserOptions.speedUnit) {
      case 'm/s': return value
      case 'km/h': return value / 3.6
      case 'mph': return value / 2.23694
    }
  }

  private formatSpeed(
    valueInMPS: number,
    targetUnit: 'm/s' | 'km/h' | 'mph' | 'min/km'
  ): { value: string; unit: string; } {
    switch (targetUnit) {
      case 'm/s':
        return {
          value: valueInMPS.toFixed(2),
          unit: 'm/s',
        }
      case 'km/h':
        return {
          value: (valueInMPS * 3.6).toFixed(1),
          unit: 'km/h',
        }
      case 'mph':
        return {
          value: (valueInMPS * 2.23694).toFixed(1),
          unit: 'mph',
        }
      case 'min/km':
        const paceInMinutes = 1000 / (valueInMPS * 60)
        const minutes = Math.floor(paceInMinutes)
        const seconds = Math.round((paceInMinutes - minutes) * 60)
        return {
          value: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
          unit: 'min/km',
        }
    }
  }

  private formatPace(
    valueInMPS: number,
    targetUnit: 'm/s' | 'km/h' | 'mph' | 'min/km'
  ): { value: string; unit: string; } {
    if (valueInMPS === 0) {
      const unit = targetUnit === 'mph' ? 'min/mi' : 'min/km'
      return { value: '--:--', unit }
    }

    let paceInMinutes: number
    let unit: string

    switch (targetUnit) {
      case 'm/s':
      case 'km/h':
      case 'min/km':
        paceInMinutes = 1000 / (valueInMPS * 60) // min/km
        unit = 'min/km'
        break
      case 'mph':
        paceInMinutes = 1609.34 / (valueInMPS * 60) // min/mi
        unit = 'min/mi'
        break
    }

    const minutes = Math.floor(paceInMinutes)
    const seconds = Math.round((paceInMinutes - minutes) * 60)

    return {
      value: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      unit,
    }
  }

  private getFieldLabel(field: FitDataField, language: LanguageOption): string {
    const isZhTW = language === LanguageOption.zh
    return isZhTW ? this.labels[field].zh : this.labels[field].en
  }

  format(
    field: FitDataField,
    value: number,
    outputOptions?: Partial<OutputUnitOptions>
  ): FormattedValue {
    const options: Required<OutputUnitOptions> = {
      ...this.defaultOutputOptions,
      ...outputOptions,
    }

    const label = this.getFieldLabel(field, options.language)

    switch (field) {
      case 'distance': {
        const valueInMeters = this.convertLengthToMeters(value)
        const formatted = this.formatLength(valueInMeters, options.lengthUnit, options.language)
        return {
          ...formatted,
          raw: valueInMeters,
          label
        }
      }

      case 'elevation':
      case 'strideLength': {
        // FIXME: should use m, ft for strideLength
        const valueInMeters = this.convertLengthToMeters(value)
        const formatted = this.formatLength(valueInMeters, options.lengthUnit, options.language)
        return {
          ...formatted,
          raw: valueInMeters,
          label
        }
      }

      case 'temperature': {
        const valueInCelsius = this.convertTemperatureToCelsius(value)
        const formatted = this.formatTemperature(valueInCelsius, options.temperatureUnit)
        return {
          ...formatted,
          raw: valueInCelsius,
          label
        }
      }

      case 'speed': {
        const valueInMPS = this.convertSpeedToMPS(value)
        const formatted = this.formatSpeed(valueInMPS, options.speedUnit)
        return {
          ...formatted,
          raw: valueInMPS,
          label
        }
      }

      case 'pace': {
        const valueInMPS = this.convertSpeedToMPS(value)
        const formatted = this.formatPace(valueInMPS, options.speedUnit)
        return {
          ...formatted,
          raw: valueInMPS,
          label
        }
      }

      case 'verticalSpeed': {
        const valueInMPS = this.convertSpeedToMPS(value)
        const formatted = this.formatSpeed(valueInMPS, options.speedUnit)
        return {
          ...formatted,
          raw: valueInMPS,
          label
        }
      }

      case 'heartRate':
        return {
          value: Math.round(value).toString(),
          unit: 'bpm',
          raw: value,
          label,
        }

      case 'cadence':
        return {
          value: Math.round(value).toString(),
          unit: 'rpm',
          raw: value,
          label,
        }

      case 'power':
        return {
          value: Math.round(value).toString(),
          unit: 'W',
          raw: value,
          label,
        }

      case 'calories':
        return {
          value: Math.round(value).toString(),
          unit: 'kcal',
          raw: value,
          label,
        }

      case 'duration': {
        const hours = Math.floor(value / 3600)
        const minutes = Math.floor((value % 3600) / 60)
        const seconds = Math.floor(value % 60)
        const formatted = hours > 0
          ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          : `${minutes}:${seconds.toString().padStart(2, '0')}`

        return {
          value: formatted,
          unit: '',
          raw: value,
          label
        }
      }

      case 'timestamp':
        return {
          value: new Date(value * 1000).toLocaleString(options.language),
          unit: '',
          raw: value,
          label,
        }

      case 'latitude':
        return {
          value: value.toFixed(6),
          unit: '°',
          raw: value,
          label,
        }

      case 'longitude':
        return {
          value: value.toFixed(6),
          unit: '°',
          raw: value,
          label,
        }

      case 'grade':
        return {
          value: value.toFixed(1),
          unit: '%',
          raw: value,
          label,
        }

      case 'steps':
        return {
          value: Math.round(value).toString(),
          unit: options.language === LanguageOption.zh ? '步' : 'steps',
          raw: value,
          label,
        }

      default:
        throw new Error(`Unknown field: ${field}`)
    }
  }

  formatMultiple(
    data: Partial<Record<FitDataField, number>>,
    outputOptions?: Partial<OutputUnitOptions>
  ): Record<string, FormattedValue> {
    const result: Record<string, FormattedValue> = {}
    for (const [field, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        result[field] = this.format(field as FitDataField, value, outputOptions)
      }
    }
    return result
  }

  getDisplayString(
    field: FitDataField,
    value: number,
    outputOptions?: Partial<OutputUnitOptions>
  ): string {
    const formatted = this.format(field, value, outputOptions)
    return formatted.unit
      ? `${formatted.value} ${formatted.unit}`
      : formatted.value
  }

  setDefaultOutputOptions(options: Partial<OutputUnitOptions> | 'metric' | 'imperial'): void {
    if (typeof options === 'string') {
      this.defaultOutputOptions = OutputPresets[options] as Required<OutputUnitOptions>
    } else {
      this.defaultOutputOptions = {
        ...this.defaultOutputOptions,
        ...options,
      }
    }
  }

  setParserOptions(options: Partial<FitParserOptions>): void {
    this.parserOptions = {
      ...this.parserOptions,
      ...options,
    }
  }
}

export {
  FitDataFormatter,
  FitDataField,
  OutputPresets,
  type FormattedValue,
  type OutputUnitOptions,
  type FitParserOptions
}
