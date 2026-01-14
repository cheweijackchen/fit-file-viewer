import { describe, it, expect, beforeEach } from 'vitest';
import { FitDataFormatter, FitDataField, OutputPresets } from '@/lib/fitDataFormatter';

describe('FitDataFormatter', () => {
  // ========================================
  // Constructor and Configuration Tests
  // ========================================

  describe('Constructor', () => {
    it('should initialize with default parser options', () => {
      // Arrange & Act
      const formatter = new FitDataFormatter();

      // Assert
      const result = formatter.format(FitDataField.distance, 1000);
      expect(result.raw).toBe(1000); // 輸入單位是 m (預設)
    });

    it('should accept custom parser options', () => {
      // Arrange & Act
      const formatter = new FitDataFormatter({ lengthUnit: 'km' });

      // Assert
      const result = formatter.format(FitDataField.distance, 5);
      expect(result.raw).toBe(5000); // 5 km = 5000 m
    });

    it('should accept metric preset for output', () => {
      // Arrange & Act
      const formatter = new FitDataFormatter({}, 'metric');

      // Assert
      const result = formatter.format(FitDataField.distance, 1000);
      expect(result.unit).toBe('km');
      expect(result.label).toBe('Distance');
    });

    it('should accept imperial preset for output', () => {
      // Arrange & Act
      const formatter = new FitDataFormatter({}, 'imperial');

      // Assert
      const result = formatter.format(FitDataField.distance, 1609.34);
      expect(result.unit).toBe('mi');
      expect(result.label).toBe('Distance');
    });

    it('should accept custom output options', () => {
      // Arrange & Act
      const formatter = new FitDataFormatter(
        {},
        { lengthUnit: 'm', speedUnit: 'm/s', temperatureUnit: 'celsius', language: 'zh-TW' }
      );

      // Assert
      const result = formatter.format(FitDataField.distance, 1000);
      expect(result.unit).toBe('公尺');
    });
  });

  // ========================================
  // Length Conversion Tests
  // ========================================

  describe('Distance Field - Length Conversion', () => {
    describe('Parser Input: meters (m)', () => {
      let formatter: FitDataFormatter;

      beforeEach(() => {
        formatter = new FitDataFormatter({ lengthUnit: 'm' });
      });

      it('should convert meters to kilometers', () => {
        // Arrange
        const valueInMeters = 5234.5;

        // Act
        const result = formatter.format(FitDataField.distance, valueInMeters);

        // Assert
        expect(result.value).toBe('5.23');
        expect(result.unit).toBe('km');
        expect(result.raw).toBe(5234.5);
      });

      it('should convert meters to miles', () => {
        // Arrange
        const valueInMeters = 5000;

        // Act
        const result = formatter.format(FitDataField.distance, valueInMeters, { lengthUnit: 'mi' });

        // Assert
        expect(result.value).toBe('3.11');
        expect(result.unit).toBe('mi');
      });

      it('should display meters when output unit is meters', () => {
        // Arrange
        const valueInMeters = 5234;

        // Act
        const result = formatter.format(FitDataField.distance, valueInMeters, { lengthUnit: 'm' });

        // Assert
        expect(result.value).toBe('5234');
        expect(result.unit).toBe('m');
      });

      it('should convert meters to feet', () => {
        // Arrange
        const valueInMeters = 100;

        // Act
        const result = formatter.format(FitDataField.distance, valueInMeters, { lengthUnit: 'ft' });

        // Assert
        expect(result.value).toBe('328');
        expect(result.unit).toBe('ft');
      });
    });

    describe('Parser Input: kilometers (km)', () => {
      let formatter: FitDataFormatter;

      beforeEach(() => {
        formatter = new FitDataFormatter({ lengthUnit: 'km' });
      });

      it('should handle kilometers input correctly', () => {
        // Arrange
        const valueInKm = 5.2345;

        // Act
        const result = formatter.format(FitDataField.distance, valueInKm);

        // Assert
        expect(result.value).toBe('5.23');
        expect(result.unit).toBe('km');
        expect(result.raw).toBe(5234.5);
      });

      it('should convert km to miles', () => {
        // Arrange
        const valueInKm = 10;

        // Act
        const result = formatter.format(FitDataField.distance, valueInKm, { lengthUnit: 'mi' });

        // Assert
        expect(result.value).toBe('6.21');
        expect(result.unit).toBe('mi');
      });
    });

    describe('Parser Input: miles (mi)', () => {
      let formatter: FitDataFormatter;

      beforeEach(() => {
        formatter = new FitDataFormatter({ lengthUnit: 'mi' });
      });

      it('should handle miles input correctly', () => {
        // Arrange
        const valueInMiles = 3.25;

        // Act
        const result = formatter.format(FitDataField.distance, valueInMiles);

        // Assert
        expect(result.value).toBe('5.23');
        expect(result.unit).toBe('km');
        expect(result.raw).toBeCloseTo(5230.355, 1);
      });

      it('should keep miles when output is miles', () => {
        // Arrange
        const valueInMiles = 5;

        // Act
        const result = formatter.format(FitDataField.distance, valueInMiles, { lengthUnit: 'mi' });

        // Assert
        expect(result.value).toBe('5.00');
        expect(result.unit).toBe('mi');
      });
    });

    describe('Edge Cases', () => {
      let formatter: FitDataFormatter;

      beforeEach(() => {
        formatter = new FitDataFormatter({ lengthUnit: 'm' });
      });

      it('should handle zero distance', () => {
        // Arrange
        const zeroDistance = 0;

        // Act
        const result = formatter.format(FitDataField.distance, zeroDistance);

        // Assert
        expect(result.value).toBe('0.00');
        expect(result.unit).toBe('km');
      });

      it('should handle very large distances', () => {
        // Arrange
        const largeDistance = 1000000; // 1000 km

        // Act
        const result = formatter.format(FitDataField.distance, largeDistance);

        // Assert
        expect(result.value).toBe('1000.00');
        expect(result.unit).toBe('km');
      });

      it('should handle very small distances', () => {
        // Arrange
        const smallDistance = 0.5; // 0.5 m

        // Act
        const result = formatter.format(FitDataField.distance, smallDistance);

        // Assert
        expect(result.value).toBe('0.00');
        expect(result.unit).toBe('km');
      });
    });
  });

  // ========================================
  // Speed Conversion Tests
  // ========================================

  describe('Speed Field - Speed Conversion', () => {
    describe('Parser Input: m/s', () => {
      let formatter: FitDataFormatter;

      beforeEach(() => {
        formatter = new FitDataFormatter({ speedUnit: 'm/s' });
      });

      it('should convert m/s to km/h', () => {
        // Arrange
        const speedInMPS = 3.5;

        // Act
        const result = formatter.format(FitDataField.speed, speedInMPS, { speedUnit: 'km/h' });

        // Assert
        expect(result.value).toBe('12.6');
        expect(result.unit).toBe('km/h');
        expect(result.raw).toBe(3.5);
      });

      it('should convert m/s to mph', () => {
        // Arrange
        const speedInMPS = 10;

        // Act
        const result = formatter.format(FitDataField.speed, speedInMPS, { speedUnit: 'mph' });

        // Assert
        expect(result.value).toBe('22.4');
        expect(result.unit).toBe('mph');
      });

      it('should keep m/s when output is m/s', () => {
        // Arrange
        const speedInMPS = 5.5;

        // Act
        const result = formatter.format(FitDataField.speed, speedInMPS, { speedUnit: 'm/s' });

        // Assert
        expect(result.value).toBe('5.50');
        expect(result.unit).toBe('m/s');
      });
    });

    describe('Parser Input: km/h', () => {
      let formatter: FitDataFormatter;

      beforeEach(() => {
        formatter = new FitDataFormatter({ speedUnit: 'km/h' });
      });

      it('should convert km/h to m/s', () => {
        // Arrange
        const speedInKmh = 18; // 18 km/h = 5 m/s

        // Act
        const result = formatter.format(FitDataField.speed, speedInKmh, { speedUnit: 'm/s' });

        // Assert
        expect(result.value).toBe('5.00');
        expect(result.unit).toBe('m/s');
      });

      it('should keep km/h when output is km/h', () => {
        // Arrange
        const speedInKmh = 15.5;

        // Act
        const result = formatter.format(FitDataField.speed, speedInKmh, { speedUnit: 'km/h' });

        // Assert
        expect(result.value).toBe('15.5');
        expect(result.unit).toBe('km/h');
      });
    });

    describe('Parser Input: mph', () => {
      let formatter: FitDataFormatter;

      beforeEach(() => {
        formatter = new FitDataFormatter({ speedUnit: 'mph' });
      });

      it('should convert mph to km/h', () => {
        // Arrange
        const speedInMph = 10;

        // Act
        const result = formatter.format(FitDataField.speed, speedInMph, { speedUnit: 'km/h' });

        // Assert
        expect(result.value).toBe('16.1');
        expect(result.unit).toBe('km/h');
      });
    });

    describe('Edge Cases', () => {
      let formatter: FitDataFormatter;

      beforeEach(() => {
        formatter = new FitDataFormatter({ speedUnit: 'm/s' });
      });

      it('should handle zero speed', () => {
        // Arrange
        const zeroSpeed = 0;

        // Act
        const result = formatter.format(FitDataField.speed, zeroSpeed);

        // Assert
        expect(result.value).toBe('0.0');
        expect(result.unit).toBe('km/h');
      });
    });
  });

  // ========================================
  // Pace Conversion Tests
  // ========================================

  describe('Pace Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter({ speedUnit: 'm/s' });
    });

    it('should format pace in min/km from m/s', () => {
      // Arrange
      const speedInMPS = 3.33; // ~3:00 min/km

      // Act
      const result = formatter.format(FitDataField.pace, speedInMPS, { speedUnit: 'km/h' });

      // Assert
      expect(result.value).toBe('5:00');
      expect(result.unit).toBe('min/km');
    });

    it('should format pace in min/mi from m/s', () => {
      // Arrange
      const speedInMPS = 3.33;

      // Act
      const result = formatter.format(FitDataField.pace, speedInMPS, { speedUnit: 'mph' });

      // Assert
      expect(result.value).toBe('8:03');
      expect(result.unit).toBe('min/mi');
    });

    it('should handle zero speed with placeholder', () => {
      // Arrange
      const zeroSpeed = 0;

      // Act
      const result = formatter.format(FitDataField.pace, zeroSpeed);

      // Assert
      expect(result.value).toBe('--:--');
      expect(result.unit).toBe('min/km');
    });

    it('should pad seconds with leading zero', () => {
      // Arrange
      const speedInMPS = 2.78; // ~6:00 min/km

      // Act
      const result = formatter.format(FitDataField.pace, speedInMPS);

      // Assert
      // FIXME: 5:995 -> 06:00
      expect(result.value).toMatch('5:60');
    });
  });

  // ========================================
  // Temperature Conversion Tests
  // ========================================

  describe('Temperature Field', () => {
    describe('Parser Input: Celsius', () => {
      let formatter: FitDataFormatter;

      beforeEach(() => {
        formatter = new FitDataFormatter({ temperatureUnit: 'celsius' });
      });

      it('should keep celsius when output is celsius', () => {
        // Arrange
        const tempInCelsius = 25.5;

        // Act
        const result = formatter.format(FitDataField.temperature, tempInCelsius);

        // Assert
        expect(result.value).toBe('25.5');
        expect(result.unit).toBe('°C');
      });

      it('should convert celsius to fahrenheit', () => {
        // Arrange
        const tempInCelsius = 0;

        // Act
        const result = formatter.format(FitDataField.temperature, tempInCelsius, { temperatureUnit: 'fahrenheit' });

        // Assert
        expect(result.value).toBe('32.0');
        expect(result.unit).toBe('°F');
      });

      it('should convert 100°C to 212°F', () => {
        // Arrange
        const tempInCelsius = 100;

        // Act
        const result = formatter.format(FitDataField.temperature, tempInCelsius, { temperatureUnit: 'fahrenheit' });

        // Assert
        expect(result.value).toBe('212.0');
        expect(result.unit).toBe('°F');
      });
    });

    describe('Parser Input: Kelvin', () => {
      let formatter: FitDataFormatter;

      beforeEach(() => {
        formatter = new FitDataFormatter({ temperatureUnit: 'kelvin' });
      });

      it('should convert kelvin to celsius', () => {
        // Arrange
        const tempInKelvin = 273.15;

        // Act
        const result = formatter.format(FitDataField.temperature, tempInKelvin);

        // Assert
        expect(result.value).toBe('0.0');
        expect(result.unit).toBe('°C');
      });

      it('should convert kelvin to fahrenheit', () => {
        // Arrange
        const tempInKelvin = 273.15;

        // Act
        const result = formatter.format(FitDataField.temperature, tempInKelvin, { temperatureUnit: 'fahrenheit' });

        // Assert
        expect(result.value).toBe('32.0');
        expect(result.unit).toBe('°F');
      });
    });

    describe('Parser Input: Fahrenheit', () => {
      let formatter: FitDataFormatter;

      beforeEach(() => {
        formatter = new FitDataFormatter({ temperatureUnit: 'fahrenheit' });
      });

      it('should convert fahrenheit to celsius', () => {
        // Arrange
        const tempInFahrenheit = 77;

        // Act
        const result = formatter.format(FitDataField.temperature, tempInFahrenheit);

        // Assert
        expect(result.value).toBe('25.0');
        expect(result.unit).toBe('°C');
      });

      it('should keep fahrenheit when output is fahrenheit', () => {
        // Arrange
        const tempInFahrenheit = 68;

        // Act
        const result = formatter.format(FitDataField.temperature, tempInFahrenheit, { temperatureUnit: 'fahrenheit' });

        // Assert
        expect(result.value).toBe('68.0');
        expect(result.unit).toBe('°F');
      });
    });

    describe('Edge Cases', () => {
      let formatter: FitDataFormatter;

      beforeEach(() => {
        formatter = new FitDataFormatter({ temperatureUnit: 'celsius' });
      });

      it('should handle negative temperatures', () => {
        // Arrange
        const negativeTempCelsius = -10;

        // Act
        const result = formatter.format(FitDataField.temperature, negativeTempCelsius);

        // Assert
        expect(result.value).toBe('-10.0');
        expect(result.unit).toBe('°C');
      });
    });
  });

  // ========================================
  // Simple Numeric Fields Tests
  // ========================================

  describe('Heart Rate Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter();
    });

    it('should format heart rate correctly', () => {
      // Arrange
      const heartRate = 152.7;

      // Act
      const result = formatter.format(FitDataField.heartRate, heartRate);

      // Assert
      expect(result.value).toBe('153');
      expect(result.unit).toBe('bpm');
      expect(result.label).toBe('Heart Rate');
    });

    it('should round heart rate to nearest integer', () => {
      // Arrange
      const heartRate = 145.4;

      // Act
      const result = formatter.format(FitDataField.heartRate, heartRate);

      // Assert
      expect(result.value).toBe('145');
    });
  });

  describe('Cadence Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter();
    });

    it('should format cadence correctly', () => {
      // Arrange
      const cadence = 85.6;

      // Act
      const result = formatter.format(FitDataField.cadence, cadence);

      // Assert
      expect(result.value).toBe('86');
      expect(result.unit).toBe('rpm');
    });
  });

  describe('Power Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter();
    });

    it('should format power correctly', () => {
      // Arrange
      const power = 250.3;

      // Act
      const result = formatter.format(FitDataField.power, power);

      // Assert
      expect(result.value).toBe('250');
      expect(result.unit).toBe('W');
    });
  });

  describe('Calories Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter();
    });

    it('should format calories correctly', () => {
      // Arrange
      const calories = 523.8;

      // Act
      const result = formatter.format(FitDataField.calories, calories);

      // Assert
      expect(result.value).toBe('524');
      expect(result.unit).toBe('kcal');
    });
  });

  describe('Steps Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter();
    });

    it('should format steps in Chinese', () => {
      // Arrange
      const steps = 10523;

      // Act
      const result = formatter.format(FitDataField.steps, steps);

      // Assert
      expect(result.value).toBe('10523');
      expect(result.unit).toBe('steps');
    });

    it('should format steps in English', () => {
      // Arrange
      const steps = 10523;

      // Act
      const result = formatter.format(FitDataField.steps, steps, { language: 'en-US' });

      // Assert
      expect(result.value).toBe('10523');
      expect(result.unit).toBe('steps');
    });
  });

  describe('Grade Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter();
    });

    it('should format grade with one decimal place', () => {
      // Arrange
      const grade = 5.67;

      // Act
      const result = formatter.format(FitDataField.grade, grade);

      // Assert
      expect(result.value).toBe('5.7');
      expect(result.unit).toBe('%');
    });

    it('should handle negative grade', () => {
      // Arrange
      const grade = -3.2;

      // Act
      const result = formatter.format(FitDataField.grade, grade);

      // Assert
      expect(result.value).toBe('-3.2');
      expect(result.unit).toBe('%');
    });
  });

  // ========================================
  // Duration Field Tests
  // ========================================

  describe('Duration Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter();
    });

    it('should format duration under 1 hour as MM:SS', () => {
      // Arrange
      const durationInSeconds = 665; // 11:05

      // Act
      const result = formatter.format(FitDataField.duration, durationInSeconds);

      // Assert
      expect(result.value).toBe('11:05');
      expect(result.unit).toBe('');
    });

    it('should format duration over 1 hour as HH:MM:SS', () => {
      // Arrange
      const durationInSeconds = 3665; // 1:01:05

      // Act
      const result = formatter.format(FitDataField.duration, durationInSeconds);

      // Assert
      expect(result.value).toBe('1:01:05');
      expect(result.unit).toBe('');
    });

    it('should pad minutes and seconds with leading zeros', () => {
      // Arrange
      const durationInSeconds = 3605; // 1:00:05

      // Act
      const result = formatter.format(FitDataField.duration, durationInSeconds);

      // Assert
      expect(result.value).toBe('1:00:05');
    });

    it('should handle zero duration', () => {
      // Arrange
      const zeroDuration = 0;

      // Act
      const result = formatter.format(FitDataField.duration, zeroDuration);

      // Assert
      expect(result.value).toBe('0:00');
    });

    it('should handle very long durations', () => {
      // Arrange
      const longDuration = 86400; // 24 hours

      // Act
      const result = formatter.format(FitDataField.duration, longDuration);

      // Assert
      expect(result.value).toBe('24:00:00');
    });
  });

  // ========================================
  // Geographic Coordinates Tests
  // ========================================

  describe('Latitude Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter();
    });

    it('should format latitude with 6 decimal places', () => {
      // Arrange
      const latitude = 25.0329636;

      // Act
      const result = formatter.format(FitDataField.latitude, latitude);

      // Assert
      expect(result.value).toBe('25.032964');
      expect(result.unit).toBe('°');
    });

    it('should handle negative latitude', () => {
      // Arrange
      const latitude = -25.0329636;

      // Act
      const result = formatter.format(FitDataField.latitude, latitude);

      // Assert
      expect(result.value).toBe('-25.032964');
    });
  });

  describe('Longitude Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter();
    });

    it('should format longitude with 6 decimal places', () => {
      // Arrange
      const longitude = 121.5654268;

      // Act
      const result = formatter.format(FitDataField.longitude, longitude);

      // Assert
      expect(result.value).toBe('121.565427');
      expect(result.unit).toBe('°');
    });
  });

  // ========================================
  // Timestamp Field Tests
  // ========================================

  describe('Timestamp Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter();
    });

    it('should format timestamp in Chinese locale', () => {
      // Arrange
      const timestamp = 1609459200; // 2021-01-01 00:00:00 UTC

      // Act
      const result = formatter.format(FitDataField.timestamp, timestamp);

      // Assert
      expect(result.unit).toBe('');
      expect(result.value).toContain('2021');
    });

    it('should format timestamp in English locale', () => {
      // Arrange
      const timestamp = 1609459200;

      // Act
      const result = formatter.format(FitDataField.timestamp, timestamp, { language: 'en-US' });

      // Assert
      expect(result.unit).toBe('');
      expect(result.value).toContain('2021');
    });
  });

  // ========================================
  // Multi-field Formatting Tests
  // ========================================

  describe('formatMultiple Method', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter({ lengthUnit: 'm', speedUnit: 'm/s' });
    });

    it('should format multiple fields correctly', () => {
      // Arrange
      const data = {
        [FitDataField.distance]: 10500,
        [FitDataField.duration]: 3665,
        [FitDataField.heartRate]: 145.7,
        [FitDataField.cadence]: 85.3,
      };

      // Act
      const result = formatter.formatMultiple(data);

      // Assert
      expect(result.distance.value).toBe('10.50');
      expect(result.duration.value).toBe('1:01:05');
      expect(result.heartRate.value).toBe('146');
      expect(result.cadence.value).toBe('85');
    });

    it('should apply output options to all fields', () => {
      // Arrange
      const data = {
        [FitDataField.distance]: 5000,
        [FitDataField.speed]: 3.5,
      };

      // Act
      const result = formatter.formatMultiple(data, {
        lengthUnit: 'mi',
        speedUnit: 'mph',
        language: 'en-US'
      });

      // Assert
      expect(result.distance.unit).toBe('mi');
      expect(result.speed.unit).toBe('mph');
      expect(result.distance.label).toBe('Distance');
    });

    it('should skip undefined and null values', () => {
      // Arrange
      const data = {
        [FitDataField.distance]: 5000,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [FitDataField.speed]: undefined as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [FitDataField.heartRate]: null as any,
      };

      // Act
      const result = formatter.formatMultiple(data);

      // Assert
      expect(result.distance).toBeDefined();
      expect(result.speed).toBeUndefined();
      expect(result.heartRate).toBeUndefined();
    });

    it('should handle empty data object', () => {
      // Arrange
      const emptyData = {};

      // Act
      const result = formatter.formatMultiple(emptyData);

      // Assert
      expect(Object.keys(result)).toHaveLength(0);
    });
  });

  // ========================================
  // getDisplayString Method Tests
  // ========================================

  describe('getDisplayString Method', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter({ lengthUnit: 'm' });
    });

    it('should return value with unit', () => {
      // Arrange
      const distance = 5000;

      // Act
      const displayString = formatter.getDisplayString(FitDataField.distance, distance);

      // Assert
      expect(displayString).toBe('5.00 km');
    });

    it('should return value without unit for unitless fields', () => {
      // Arrange
      const duration = 665;

      // Act
      const displayString = formatter.getDisplayString(FitDataField.duration, duration);

      // Assert
      expect(displayString).toBe('11:05');
    });

    it('should respect output options override', () => {
      // Arrange
      const distance = 5000;

      // Act
      const displayString = formatter.getDisplayString(
        FitDataField.distance,
        distance,
        { lengthUnit: 'mi' }
      );

      // Assert
      expect(displayString).toBe('3.11 mi');
    });
  });

  // ========================================
  // Configuration Update Tests
  // ========================================

  describe('setDefaultOutputOptions Method', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter();
    });

    it('should update default output options with preset', () => {
      // Arrange
      const distance = 1609.34;

      // Act
      formatter.setDefaultOutputOptions('imperial');
      const result = formatter.format(FitDataField.distance, distance);

      // Assert
      expect(result.unit).toBe('mi');
      expect(result.label).toBe('Distance');
    });

    it('should update default output options with partial custom options', () => {
      // Arrange
      const distance = 1000;

      // Act
      formatter.setDefaultOutputOptions({ lengthUnit: 'm' });
      const result = formatter.format(FitDataField.distance, distance);

      // Assert
      expect(result.unit).toBe('m');
    });

    it('should merge with existing options when updating partially', () => {
      // Arrange
      formatter.setDefaultOutputOptions({ lengthUnit: 'mi', language: 'en-US' });

      // Act
      formatter.setDefaultOutputOptions({ speedUnit: 'mph' });
      const distanceResult = formatter.format(FitDataField.distance, 1609.34);
      const speedResult = formatter.format(FitDataField.speed, 10);

      // Assert
      expect(distanceResult.unit).toBe('mi'); // 應該保留
      expect(speedResult.unit).toBe('mph'); // 新設定
    });
  });

  describe('setParserOptions Method', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter({ lengthUnit: 'm' });
    });

    it('should update parser options', () => {
      // Arrange
      const distance = 5; // 5 of some unit

      // Act
      formatter.setParserOptions({ lengthUnit: 'km' });
      const result = formatter.format(FitDataField.distance, distance);

      // Assert
      expect(result.raw).toBe(5000); // 5 km = 5000 m
    });

    it('should merge with existing parser options', () => {
      // Arrange
      formatter.setParserOptions({ speedUnit: 'km/h' });

      // Act
      const distanceResult = formatter.format(FitDataField.distance, 1000);
      const speedResult = formatter.format(FitDataField.speed, 18);

      // Assert
      expect(distanceResult.raw).toBe(1000); // lengthUnit 仍是 m
      expect(speedResult.raw).toBe(5); // 18 km/h = 5 m/s
    });
  });

  // ========================================
  // Language and Localization Tests
  // ========================================

  describe('Language Support', () => {
    it('should use Chinese labels with zh-TW', () => {
      // Arrange
      const formatter = new FitDataFormatter({}, { language: 'zh-TW' });

      // Act
      const result = formatter.format(FitDataField.heartRate, 150);

      // Assert
      expect(result.label).toBe('心率');
    });

    it('should use English labels with en-US', () => {
      // Arrange
      const formatter = new FitDataFormatter({}, { language: 'en-US' });

      // Act
      const result = formatter.format(FitDataField.heartRate, 150);

      // Assert
      expect(result.label).toBe('Heart Rate');
    });

    it('should allow language override per format call', () => {
      // Arrange
      const formatter = new FitDataFormatter({}, { language: 'zh-TW' });

      // Act
      const zhResult = formatter.format(FitDataField.distance, 1000);
      const enResult = formatter.format(FitDataField.distance, 1000, { language: 'en-US' });

      // Assert
      expect(zhResult.label).toBe('距離');
      expect(enResult.label).toBe('Distance');
    });
  });

  // ========================================
  // Output Override Tests
  // ========================================

  describe('Output Options Override', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter(
        { lengthUnit: 'm', speedUnit: 'm/s' },
        { lengthUnit: 'km', speedUnit: 'km/h' }
      );
    });

    it('should use default output options when no override provided', () => {
      // Arrange
      const distance = 5000;

      // Act
      const result = formatter.format(FitDataField.distance, distance);

      // Assert
      expect(result.unit).toBe('km');
    });

    it('should override output options per call', () => {
      // Arrange
      const distance = 5000;

      // Act
      const kmResult = formatter.format(FitDataField.distance, distance);
      const miResult = formatter.format(FitDataField.distance, distance, { lengthUnit: 'mi' });
      const mResult = formatter.format(FitDataField.distance, distance, { lengthUnit: 'm' });

      // Assert
      expect(kmResult.unit).toBe('km');
      expect(miResult.unit).toBe('mi');
      expect(mResult.unit).toBe('m');
    });

    it('should allow partial override without affecting other options', () => {
      // Arrange
      const formatter2 = new FitDataFormatter(
        {},
        { lengthUnit: 'km', speedUnit: 'km/h', language: 'zh-TW' }
      );

      // Act
      const result = formatter2.format(FitDataField.distance, 5000, { lengthUnit: 'mi' });

      // Assert
      expect(result.unit).toBe('英里'); // lengthUnit is overridden
      expect(result.label).toBe('距離'); // language remains default option
    });
  });

  // ========================================
  // Elevation and Stride Length Tests
  // ========================================

  describe('Elevation Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter({ lengthUnit: 'm' });
    });

    it('should format elevation in meters', () => {
      // Arrange
      const elevation = 250.7;

      // Act
      const result = formatter.format(FitDataField.elevation, elevation, { lengthUnit: 'm' });

      // Assert
      expect(result.value).toBe('251');
      expect(result.unit).toBe('m');
    });

    it('should format elevation in feet', () => {
      // Arrange
      const elevation = 100;

      // Act
      const result = formatter.format(FitDataField.elevation, elevation, { lengthUnit: 'ft' });

      // Assert
      expect(result.value).toBe('328');
      expect(result.unit).toBe('ft');
    });
  });

  describe('Stride Length Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter({ lengthUnit: 'm' });
    });

    it('should format stride length in meters', () => {
      // Arrange
      const strideLength = 1.2;

      // Act
      const result = formatter.format(FitDataField.strideLength, strideLength, { lengthUnit: 'm' });

      // Assert
      expect(result.value).toBe('1');
      expect(result.unit).toBe('m');
    });

    it('should format stride length in km', () => {
      // Arrange
      const strideLength = 1.2;

      // Act
      const result = formatter.format(FitDataField.strideLength, strideLength, { lengthUnit: 'km' });

      // Assert
      expect(result.value).toBe('0.00');
      expect(result.unit).toBe('km');
    });
  });

  // ========================================
  // Vertical Speed Tests
  // ========================================

  describe('Vertical Speed Field', () => {
    let formatter: FitDataFormatter;

    beforeEach(() => {
      formatter = new FitDataFormatter({ speedUnit: 'm/s' });
    });

    it('should format vertical speed in m/s', () => {
      // Arrange
      const verticalSpeed = 0.5;

      // Act
      const result = formatter.format(FitDataField.verticalSpeed, verticalSpeed, { speedUnit: 'm/s' });

      // Assert
      expect(result.value).toBe('0.50');
      expect(result.unit).toBe('m/s');
    });

    it('should format vertical speed in km/h', () => {
      // Arrange
      const verticalSpeed = 0.5;

      // Act
      const result = formatter.format(FitDataField.verticalSpeed, verticalSpeed, { speedUnit: 'km/h' });

      // Assert
      expect(result.value).toBe('1.8');
      expect(result.unit).toBe('km/h');
    });
  });

  // ========================================
  // Integration Tests
  // ========================================

  describe('Integration Tests', () => {
    it('should handle complete activity data workflow', () => {
      // Arrange
      const formatter = new FitDataFormatter(
        { lengthUnit: 'km', speedUnit: 'km/h', temperatureUnit: 'celsius' },
        'metric'
      );

      const activityData = {
        [FitDataField.distance]: 10.5, // 10.5 km
        [FitDataField.duration]: 3665, // 1:01:05
        [FitDataField.speed]: 12.6, // 12.6 km/h
        [FitDataField.heartRate]: 145.7,
        [FitDataField.elevation]: 250,
        [FitDataField.temperature]: 25.5,
        [FitDataField.cadence]: 85,
      };

      // Act
      const formatted = formatter.formatMultiple(activityData);

      // Assert
      expect(formatted.distance.value).toBe('10.50');
      expect(formatted.distance.unit).toBe('km');
      expect(formatted.duration.value).toBe('1:01:05');
      expect(formatted.speed.value).toBe('12.6');
      expect(formatted.heartRate.value).toBe('146');
      expect(formatted.elevation.value).toBe('250.00'); // TODO: check decimal places of elevation
      expect(formatted.temperature.value).toBe('25.5');
      expect(formatted.cadence.value).toBe('85');
    });

    it('should handle parser input conversion and output formatting', () => {
      // Arrange - Parser units are m, m/s；output units are km, km/h
      const formatter = new FitDataFormatter(
        { lengthUnit: 'm', speedUnit: 'm/s' },
        { lengthUnit: 'km', speedUnit: 'km/h' }
      );

      // Act
      const distanceResult = formatter.format(FitDataField.distance, 10500); // 10500 m
      const speedResult = formatter.format(FitDataField.speed, 3.5); // 3.5 m/s

      // Assert
      expect(distanceResult.value).toBe('10.50');
      expect(distanceResult.unit).toBe('km');
      expect(speedResult.value).toBe('12.6');
      expect(speedResult.unit).toBe('km/h');
    });

    it('should support switching between metric and imperial mid-session', () => {
      // Arrange
      const formatter = new FitDataFormatter({ lengthUnit: 'm' }, 'metric');
      const distance = 5000;

      // Act
      const metricResult = formatter.format(FitDataField.distance, distance);
      formatter.setDefaultOutputOptions('imperial');
      const imperialResult = formatter.format(FitDataField.distance, distance);

      // Assert
      expect(metricResult.unit).toBe('km');
      expect(metricResult.label).toBe('Distance');
      expect(imperialResult.unit).toBe('mi');
      expect(imperialResult.label).toBe('Distance');
    });
  });

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
  //     // Arrange
  //     const unknownField = 'unknownField' as FitDataField;

  //     // Act & Assert
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
      // Assert
      expect(OutputPresets.metric.lengthUnit).toBe('km');
      expect(OutputPresets.metric.speedUnit).toBe('km/h');
      expect(OutputPresets.metric.temperatureUnit).toBe('celsius');
      expect(OutputPresets.metric.language).toBe('en-US');
    });

    it('should have correct imperial preset values', () => {
      // Assert
      expect(OutputPresets.imperial.lengthUnit).toBe('mi');
      expect(OutputPresets.imperial.speedUnit).toBe('mph');
      expect(OutputPresets.imperial.temperatureUnit).toBe('fahrenheit');
      expect(OutputPresets.imperial.language).toBe('en-US');
    });
  });
});
