export default [
  {
    resourceType: 'Observation',
    status: 'final',
    category: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/observation-category',
            code: 'laboratory',
            display: 'Laboratory'
          }
        ],
        text: 'Laboratory'
      }
    ],
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '718-7',
          display: 'Hemoglobin [Mass/volume] in Blood'
        }
      ],
      text: 'Hemoglobin'
    },
    subject: {
      reference: 'Patient/1357374'
    },
    issued: '2020-07-30T20:42:00.000Z',
    effectiveDateTime: '2020-07-30T20:42:00.000Z',
    performer: [
      {
        reference: 'Patient/1357374'
      }
    ],
    valueQuantity: {
      value: 13.2,
      unit: 'mg/dL',
      system: 'http://unitsofmeasure.org',
      code: 'mg/dL'
    },
    interpretation: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
            code: 'N',
            display: 'Normal'
          }
        ],
        text: 'Normal'
      }
    ],
    referenceRange: [
      {
        low: {
          value: 12.0,
          unit: 'g/dL',
          system: 'http://unitsofmeasure.org',
          code: 'g/dL'
        },
        high: {
          value: 15.5,
          unit: 'g/dL',
          system: 'http://unitsofmeasure.org',
          code: 'g/dL'
        }
      }
    ],
    note: [
      {
        authorReference: {
          reference: 'Practitioner/1477926'
        },
        time: '2020-07-30T20:42:15.000Z',
        text: 'Specimen slightly hemolyzed.'
      }
    ]
  }
];
