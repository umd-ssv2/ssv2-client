import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Fab,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import {
  AddRounded as AddIcon,
  CloudDownloadOutlined as DownloadIcon,
  CloudUploadRounded as UploadIcon,
} from "@material-ui/icons";
import "./assignment-list.scss";

const UploadDialog = ({ open, onClose }) => {
  const [fileUploaded, setFileUploaded] = useState("");

  return (
    <Dialog
      open={open}
      onClose={() => {
        setFileUploaded(false);
        onClose();
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>New Submission</DialogTitle>
      <DialogContent>
        <DialogContentText>Upload a new file for submission</DialogContentText>
        <Paper
          elevation={0}
          className="upload-paper"
          component="label"
          htmlFor="upload-file"
        >
          {fileUploaded != "" ? (
            <Typography variant="body1">
              File Selected: <br />
              {fileUploaded}
              <br />
              <br />
              Click to <span id="browse">browse</span> for new file
            </Typography>
          ) : (
            <>
              <UploadIcon className="upload-icon" />
              <Typography variant="body1">
                Drag and drop archive here <br /> or click to{" "}
                <span id="browse">browse</span> files
              </Typography>
            </>
          )}
        </Paper>
        <input
          type="file"
          id="upload-file"
          style={{ display: "none" }}
          onChange={(e) => setFileUploaded(e.target.files[0].name)}
          // accept="zip,application/zip"
        />
      </DialogContent>
    </Dialog>
  );
};

const Assignment = (props) => {
  let [modalOpen, setModalOpen] = useState(false);
  let { term, course, proj } = props.match.params;
  let { student } = props;
  let sem = "",
    year = "",
    title = "";
  let termPattern = /^(summer|spring|winter|fall)([0-9]{4})$/i;
  let match = term.match(termPattern);
  let submissions = [];
  if (match) {
    sem = match[1];
    year = match[2];
    // console.log(year, sem, course, proj);
    try {
      let list = student.courses[year][sem];
      let allProjects = list.find((x) => x.id === course).projects;
      let aProject = allProjects.find((x) => x.projid == proj);
      title = aProject.title;
      submissions = aProject.submissions;
      if (submissions.length > 0) {
        submissions = submissions
          .filter((x) => x.dirid == student.dirid)
          .sort((a, b) => a.ts < b.ts)
          .map((x, n) => {
            return { ...x, index: n };
          });
      }
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Fab
        size="large"
        className="assignment-upload-fab"
        aria-label="upload"
        onClick={toggleModal}
      >
        <AddIcon style={{ fontSize: "2rem" }} />
      </Fab>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Submission #</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.length > 0
              ? submissions.map((x, n) => {
                  return (
                    <TableRow key={n} className="submission-row">
                      <TableCell className="index-cell">{x.index}</TableCell>
                      <TableCell>{`${x.ts.toLocaleDateString()} ${x.ts.toLocaleTimeString()}`}</TableCell>
                      <TableCell>n/a </TableCell>
                      <TableCell style={{ paddingLeft: "2rem" }}>
                        <DownloadIcon
                          fontSize="default"
                          className="download-icon"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      {submissions.length === 0 ? (
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: "1rem" }}
        >
          You have no submissions
        </Typography>
      ) : null}
      <UploadDialog open={modalOpen} onClose={toggleModal} />
    </>
  );
};

export default Assignment;
