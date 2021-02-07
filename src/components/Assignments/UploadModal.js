import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  IconButton,
  DialogContent,
  DialogTitle,
  Paper,
  DialogContentText,
  Typography,
  Button,
  CircularProgress,
  Box,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  CloudUploadRounded as UploadIcon,
  ClearRounded as ExitIcon,
} from "@material-ui/icons";
import global from "./../../global";

const UploadModal = ({
  open,
  onClose,
  onNewSub,
  term,
  course,
  projid,
  subid,
}) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [snackOpen, setSnack] = useState(false);

  function upload(fileList) {
    // console.log("files:", fileList[0]);
    const config = {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`${percentCompleted}%`);
        setProgress(percentCompleted);
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let data = new FormData();
    data.append("file", fileList[0]);

    console.log("Sending upload request");
    axios
      .post(
        `${global.serverURL}/${term}/${course}/project/${projid}/submission?dirid=${global.dirid}&subid=${subid}`,
        data,
        config
      ) // TODO: Add :term/:course/:projid/submission
      .then((res) => {
        if (res.status == 200) {
          console.log("Upload Success!");
          onNewSub(projid, res.data);
          close();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function typeCheck(files) {
    console.log(files);
    // Check if environment is darwin: application/zip
    // Check if windows: application/x-zip-compressed
    // Check process.platform
    if (
      files[0].type === "application/zip" ||
      files[0].type === "application/x-zip-compressed"
    ) {
      console.log("true");
      setError("");
      setSnack(false);
      return true;
    } else {
      setError("Must select a .zip file!");
      setSnack(true);
      return false;
    }
  }

  function close() {
    setFiles([]);
    setProgress(0);
    setError("");
    setSnack(false);
    onClose();
  }

  const snackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(false);
  };

  return (
    <Dialog open={open} onClose={() => close()} fullWidth maxWidth="xs">
      <IconButton className="upload-exit" onClick={close}>
        <ExitIcon fontSize="small" />
      </IconButton>
      <DialogTitle>New Submission</DialogTitle>
      <DialogContent className="upload-content">
        <DialogContentText>Upload a new file for submission</DialogContentText>
        <Paper
          elevation={0}
          className="upload-paper"
          component="label"
          htmlFor="upload-file"
        >
          {files.length > 0 ? (
            <div>
              File Selected: <br />
              <p className="upload-result" title={files[0].name}>
                {files[0].name}
              </p>
              Click to <span id="browse">browse</span> for new file
            </div>
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
        <Button
          className="upload-button"
          fullWidth
          disabled={files.length > 0 ? false : true}
          onClick={() => upload(files)}
          size="large"
        >
          {progress === 0 ? (
            "Upload"
          ) : (
            <Box position="relative" display="inline-flex">
              <CircularProgress variant="static" value={progress} />
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="inherit"
                >{`${progress}%`}</Typography>
              </Box>
            </Box>
          )}
        </Button>

        <input
          type="file"
          id="upload-file"
          style={{ display: "none" }}
          onChange={(e) => {
            console.log("change");
            // console.log(e.target.files);
            if (e.target.files.length > 0) {
              if (typeCheck(e.target.files)) {
                setFiles(e.target.files);
              }
            }
          }}
          accept="application/x-zip-compressed,application/zip"
        />
      </DialogContent>
      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={snackClose}>
        <Alert
          variant="filled"
          elevation={6}
          onClose={snackClose}
          severity="error"
        >
          {error}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default UploadModal;
