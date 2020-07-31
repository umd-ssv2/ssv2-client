import React, { useState } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
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
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  AddRounded as AddIcon,
  CloudDownloadOutlined as DownloadIcon,
} from "@material-ui/icons";
import "./assignment-list.scss";
import UploadDialog from "./UploadModal";
import global from "../../global";

const Assignment = (props) => {
  const [snackOpen, setSnack] = useState(false);
  let [modalOpen, setModalOpen] = useState(false);
  let { project, match, onNewSub } = props;
  let { term, course, projid } = match.params;

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const downloadSubmission = (subid) => {
    window.open(
      `${global.serverURL}/${term}/${course}/project/${projid}/submission/${subid}?dirid=${global.dirid}`
    );
    // axios
    //   .get(
    //     `${global.serverURL}/${term}/${course}/project/${projid}/submission/${subid}?dirid=${global.dirid}`
    //   ) // TODO: Add :term/:course/:projid/submission
    //   .then((res) => {
    //     // setSnack(false);
    //     // fileDownload(res.data, `submission-${subid}.zip`);

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const snackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(false);
  };

  return (
    <>
      {project ? (
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
            {project.title}
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
                {project.submissions.length > 0
                  ? project.submissions
                      .sort((d1, d2) => {
                        let a = new Date(Date.parse(d1)),
                          b = new Date(Date.parse(d2));
                        return a < b ? -1 : a > b ? 1 : 0;
                      })
                      .map((x, n) => {
                        return (
                          <TableRow key={n} className="submission-row">
                            <TableCell className="index-cell">
                              {n + 1}
                            </TableCell>
                            <TableCell>{x.ts}</TableCell>
                            <TableCell>n/a </TableCell>
                            <TableCell style={{ paddingLeft: "2rem" }}>
                              <IconButton
                                onClick={() => downloadSubmission(n + 1)}
                              >
                                <DownloadIcon
                                  fontSize="default"
                                  className="download-icon"
                                />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
          {project.submissions.length === 0 ? (
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              You have no submissions
            </Typography>
          ) : null}
          <UploadDialog
            open={modalOpen}
            onClose={toggleModal}
            onNewSub={onNewSub}
            term={term}
            course={course}
            projid={projid}
            subid={project.submissions.length + 1}
          />
          <Snackbar open={snackOpen} onClose={snackClose}>
            <Alert
              variant="filled"
              elevation={6}
              onClose={snackClose}
              severity="info"
              style={{ backgroundColor: "#ffd200", color: "black" }}
            >
              Downloading Submission...
            </Alert>
          </Snackbar>
        </>
      ) : null}
    </>
  );
};

export default Assignment;
