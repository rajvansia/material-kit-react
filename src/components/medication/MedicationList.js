import { useState } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';

const MedicationList = (meds) => {
  const [selectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const medications = Object.values(meds.meds);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Medication Name
                </TableCell>
                <TableCell>
                  Active Status
                </TableCell>
                <TableCell>
                  Date Prescribed
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medications.map((med) => (
                <TableRow
                  hover
                  key={med.id}
                  selected={selectedCustomerIds.indexOf(med.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {med.medicationCodeableConcept.text}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {med.status}
                  </TableCell>
                  <TableCell>
                    {moment(med.authoredOn).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={medications.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

// CustomerListResults.propTypes = {
//   customers: PropTypes.array.isRequired
// };

export default MedicationList;
