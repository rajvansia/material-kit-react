export default [
  {
    resourceType: 'Observation',
    id: '136476',
    meta: {
      versionId: '1',
      lastUpdated: '2021-11-22T20:50:13.841-05:00'
    },
    status: 'final',
    category: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/observation-category',
            code: 'vital-signs',
            display: 'vital-signs'
          }
        ]
      }
    ],
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '2708-6',
          display: 'Oxygen saturation in Arterial blood'
        },
        {
          system: 'http://loinc.org',
          code: '59408-5',
          display: 'Oxygen saturation in Arterial blood by Pulse oximetry'
        }
      ],
      text: 'Oxygen saturation in Arterial blood'
    },
    subject: {
      reference: 'Patient/1364292'
    },
    encounter: {
      reference: 'Encounter/1364767'
    },
    effectiveDateTime: '1975-11-07T23:47:51-05:00',
    issued: '1975-11-06T23:47:51.831-05:00',
    valueQuantity: {
      value: 100,
      unit: '%',
      system: 'http://unitsofmeasure.org',
      code: '%'
    }
  }
];
