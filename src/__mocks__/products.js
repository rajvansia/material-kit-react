import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description: 'Primary Care',
    media: '6 cliford rd , Wayne, PA',
    title: 'Dr. Frank Hill',
    totalDownloads: '594-799-433'
  },
  {
    id: uuid(),
    createdAt: '31/03/2019',
    description: 'Suregon',
    media: '6 cliford rd , Wayne, PA',
    title: 'Dr. Dinesh Shah',
    totalDownloads: '625-799-433'
  },
  {
    id: uuid(),
    createdAt: '03/04/2019',
    description: 'Anestisalogist',
    media: '6 cliford rd , Wayne, PA',
    title: 'Dr. Doug Fine',
    totalDownloads: '857-799-433'
  }
];
