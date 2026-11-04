import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Box,
} from "@mui/material";
import "../Table/JobTable.scss";
import RoundedButton from "../Button/RoundedButton";
import colors from "../../theme/colors";
import { formatToShortDate } from "../../utils/dateUtils";
import { addEllipsis } from "../../constants/constant";

const statusColorMap = {
  Generated: "#75BD7D",
  "In Progress": "#E4B405",
  Failed: "#E40505",
  Submitted: "#00B2A9",
  Completed: "#75BD7D",
};

const JobTable = ({ allJobs, onViewAll, isViewAllPresent }) => {
  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table
          aria-label="job list"
          sx={{
            borderSpacing: 0,
            "& th, & td": {
              borderBottom: "1px solid #CBDDF5",
              borderRight: "none",
            },
            "& tbody tr:last-child td": {
              borderBottom: "none",
            },
          }}
        >
          <TableHead className="job-table-title">
            <TableRow>
              <TableCell>
                <span className="job-table-header">Job ID</span>
              </TableCell>
              <TableCell>
                <span className="job-table-header">User Name</span>
              </TableCell>
              <TableCell>
                <span className="job-table-header">Project</span>
              </TableCell>
              <TableCell>
                <span className="job-table-header">Project Type</span>
              </TableCell>
              <TableCell>
                <span className="job-table-header">Date/Time</span>
              </TableCell>
              <TableCell>
                <span className="job-table-header">Status</span>
              </TableCell>
              <TableCell>
                <span className="job-table-header">View</span>
              </TableCell>
              <TableCell>
                <span className="job-table-header">View Job</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="job-table-body">
            {allJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <span className="job-table-body-jobId">{job.id} </span>
                </TableCell>
                <TableCell>
                  <span className="job-table-body-cell-details">
                    {addEllipsis(job.fullName)}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="job-table-body-cell-details">
                    {addEllipsis(job.projectName)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="job-table-body-cell-details">
                    {addEllipsis(job.projectType)}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="job-table-body-cell-details">
                    {formatToShortDate(job.modifiedDate)}
                  </span>
                </TableCell>

                <TableCell>
                  <b
                    className="text-montserrat-14-semi-bold"
                    style={{ color: statusColorMap[job.status] }}
                  >
                    {job.status}
                  </b>
                </TableCell>

                <TableCell align="left">
                  <Button
                    size="small"
                    target="_blank"
                    sx={{
                      textTransform: "none",
                      padding: 0,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <b
                        className="text-montserrat-14-semi-bold"
                        style={{ color: colors.primary }}
                      >
                        View
                      </b>
                      <img
                        src="assets/svg/View.svg"
                        alt="plus"
                        style={{ width: 12, height: 12 }}
                      />
                    </Box>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    target="_blank"
                    sx={{
                      textTransform: "none",
                      padding: 0,
                      minWidth: "auto",
                    }}
                  >
                    <span className="job-table-body-view-details">
                      View Details
                    </span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isViewAllPresent && (
        <Stack direction="row" marginTop={3} marginBottom={8}>
          <RoundedButton
            text="View All"
            imageSrc="assets/svg/Arrow.svg"
            variant="primary-large"
            onClick={onViewAll}
            height={48}
            width={160}
            testId="view-all-projects-button"
          />
        </Stack>
      )}
    </>
  );
};

export default JobTable;
