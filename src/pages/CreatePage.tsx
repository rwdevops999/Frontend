import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  createTheme,
  FormGroup,
  styled,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "./CreatePage.css";
import { object, string } from "yup";
import { FaFileExport } from "react-icons/fa6";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Tutorial } from "../entities/Tutorial";
import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader/Loader";
import ErrorBanner from "../components/Error/ErrorBanner";
import {
  buildState,
  buildTutopediaForViewAllTutorials,
} from "../builders/Builders";
import { useConfig } from "../configuration/useConfig";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ROUTE_TUTORIALS,
  TUTOPEDIA_CONTENT_CREATE_PAGE,
  TUTOPEDIA_CONTENT_CREATE_PAGE_BUTTONS,
  TUTOPEDIA_CONTENT_CREATE_PAGE_CANCEL_BUTTON,
  TUTOPEDIA_CONTENT_CREATE_PAGE_CREATE_BUTTON,
  TUTOPEDIA_CONTENT_CREATE_PAGE_ERROR,
  TUTOPEDIA_CONTENT_CREATE_PAGE_FORM,
  TUTOPEDIA_CONTENT_CREATE_PAGE_FORM_FILE_INPUT,
  TUTOPEDIA_CONTENT_CREATE_PAGE_LOADER,
  TUTOPEDIA_CONTENT_CREATE_PAGE_UPDATE_BUTTON,
} from "../data/layout/layout";
import { log } from "../utils/LogUtil";
import useDebugContext from "../hooks/useDebugContext";
import { useTutopediaState } from "../hooks/states/useTutopediaState";

const CreatePage = () => {
  const navigate = useNavigate();
  const { config } = useConfig();
  let { state } = useLocation();
  const { debug } = useDebugContext();

  log(debug, "CreatePage", "In, State", state, true);

  let data = state.tutopedia.application.data;

  let tutorialId: number | undefined = undefined;
  let isUpdateMode: boolean = false;

  if (data && data.updateMode) {
    tutorialId = data.searchId;
    isUpdateMode = data.updateMode;
  }

  let count = state.tutopedia.count;
  if (count >= 0) {
    count++;
  }
  log(debug, "CreatePage", "Count", count);

  const [tutorial, setTutorial] = useState<Tutorial[]>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const goBack = () => {
    setError(undefined);
  };

  if (tutorialId) {
    useEffect(() => {
      async function getData() {
        setLoading(true);
        await axios
          .get("/find/" + tutorialId)
          .then((response) => {
            if (response.data) {
              log(debug, "CreatePage", "Found tutorial", response.data, true);
              setTutorial(response.data);
              setLoading(false);
            }
          })
          .catch(function (error) {
            log(debug, "CreatePage", "Find tutorial, Error", error.message);
            setLoading(false);
            setError(error.message);
          });
      }

      getData();
    }, [tutorialId]);
  }

  const file = useRef<any>(null);

  const { header } = useTutopediaState(state);

  const navigateToHome = (buttonName: string) => {
    log(debug, "CreatePage", `Back to home with ${buttonName}`);
    const tutopedia = buildTutopediaForViewAllTutorials(
      count,
      "Return from the create page",
      buttonName,
      `/${ROUTE_TUTORIALS}`,
      true,
      header ? header.bucket : "<<<undefined>>>"
    );

    navigate(tutopedia.routeURL!, buildState(tutopedia));
  };

  const renderCreatePage = (): any => {
    if (isLoading) {
      return (
        <Box data-title={TUTOPEDIA_CONTENT_CREATE_PAGE_LOADER}>
          <Loader />
        </Box>
      );
    }

    if (error) {
      return (
        <Box data-title={TUTOPEDIA_CONTENT_CREATE_PAGE_ERROR}>
          <ErrorBanner message={error} goBack={goBack} />
        </Box>
      );
    }

    const initialValues = {
      title: "",
      description: "",
      filename: "",
    };

    const setFileLabel = (value: string): void => {
      let fileLabel = document.getElementById("fileLabel");
      if (fileLabel) {
        fileLabel.innerHTML = value;
      }
    };

    const handleFileSelect = (evt: any) => {
      let selectedFile: any = evt.target.files?.item(0);
      if (selectedFile) {
        file.current = selectedFile;
        setFileLabel(selectedFile.name);
      }
    };

    let displayScreen = !isUpdateMode;
    if (tutorial) {
      displayScreen = true;

      initialValues.title = tutorial[0].title!;
      initialValues.description = tutorial[0].description!;
      initialValues.filename = tutorial[0].filename!;

      document
        .getElementById("hiddenInput")
        ?.addEventListener("change", handleFileSelect, false);
    } else {
      displayScreen = true;
    }

    const theme = createTheme({
      palette: {
        background: {
          paper: "#fff",
        },
        text: {
          primary: "#173A5E",
          secondary: "#0D3B69",
        },
        action: {
          active: "#001E3C",
        },
      },
    });

    const slotProps = {
      input: {
        color: "primary",
        sx: {
          borderBottom: "solid 1px #0D3B69",
        },
      },
    };

    const VisuallyHiddenInput = styled("input")({
      clip: "rect(0 0 0 0)",
      clipPath: "inset(50%)",
      height: 1,
      overflow: "hidden",
      position: "absolute",
      bottom: 0,
      left: 0,
      whiteSpace: "nowrap",
      width: 1,
    });

    const handleSubmitForm = async (values: any) => {
      if (isUpdateMode) {
        if (config.environment === "TST" && tutorialId) {
          await fetch("http://localhost:8081/api/update/" + tutorialId, {
            method: "PUT",
            body: JSON.stringify({
              title: values.title,
              description: values.description,
              published: "false",
              tutorialFile: values.filename,
            }),
          })
            .then(() => {
              navigateToHome(TUTOPEDIA_CONTENT_CREATE_PAGE_UPDATE_BUTTON);
            })
            .catch((error) => {
              console.log("[CreatePage: UPDATE] ERROR: " + error.message);
            });
        } else {
          let data: FormData = new FormData();
          data.append("title", values.title);
          data.append("description", values.description);
          if (file.current) {
            data.append("tutorialFile", file.current);
          }

          await fetch("http://localhost:8081/api/update/" + tutorialId, {
            method: "PUT",
            body: data,
          }).then(() => {
            if (config.environment != "TST") {
              toast.loading("Updating tutorial" + tutorialId);
            }
            navigateToHome(TUTOPEDIA_CONTENT_CREATE_PAGE_UPDATE_BUTTON);
          });
        }
      } else {
        let data: FormData = new FormData();
        data.append("title", values.title);
        data.append("description", values.description);
        data.append("published", "false");
        data.append("tutorialFile", file.current);

        if (config.environment === "TST") {
          await fetch("http://localhost:8081/api/create", {
            method: "POST",
            body: JSON.stringify({
              title: values.title,
              description: values.description,
              published: "false",
              tutorialFile: values.filename,
            }),
          }).then(() => {
            navigateToHome(TUTOPEDIA_CONTENT_CREATE_PAGE_CREATE_BUTTON);
          });
        } else {
          await fetch("http://localhost:8081/api/create", {
            method: "POST",
            body: data,
          }).then(() => {
            if (config.environment != "TST") {
              toast.loading("Creating tutorial");
            }
            navigateToHome(TUTOPEDIA_CONTENT_CREATE_PAGE_CREATE_BUTTON);
          });
        }
      }
    };

    if (displayScreen) {
      return (
        <ThemeProvider theme={theme}>
          <Box
            data-title={TUTOPEDIA_CONTENT_CREATE_PAGE_FORM}
            overflow={"hidden"}
            sx={{
              width: "100%",
              height: "700px",
              maxHeight: "700px",
            }}
            marginTop={1}
          >
            <Formik
              enableReinitialize
              validationSchema={object({
                title: string()
                  .required("Title is required")
                  .max(255, "Maximal title length is 255 characters"),
                description: string()
                  .required("Description is required")
                  .max(255, "Maximal description length is 255 characters"),
                filename: string().when(
                  "isUpdateMode",
                  ([isUpdateMode], schema) => {
                    return isUpdateMode
                      ? schema.max(
                          255,
                          "Maximal filename length is 255 characters"
                        )
                      : schema
                          .required("File is required")
                          .max(
                            255,
                            "Maximal filename length is 255 characters"
                          );
                  }
                ),
              })}
              initialValues={initialValues}
              validator={() => ({})}
              onSubmit={(values) => {
                handleSubmitForm(values);
              }}
            >
              {({ values, validateField, isSubmitting }) => (
                <>
                  <Form>
                    <Box marginBottom={2}>
                      <FormGroup>
                        <Field
                          name="title"
                          as={TextField}
                          label="Title"
                          variant="standard"
                          slotProps={slotProps}
                        />
                      </FormGroup>
                      <ErrorMessage name="title">
                        {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                      </ErrorMessage>
                    </Box>

                    <Box marginBottom={2}>
                      <FormGroup>
                        <Field
                          name="description"
                          as={TextField}
                          value={values.description || ""}
                          multiline
                          rows={3}
                          label="Description"
                          variant="standard"
                          slotProps={slotProps}
                        />
                        <ErrorMessage name="description">
                          {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        </ErrorMessage>
                      </FormGroup>
                    </Box>

                    <Box marginBottom={2}>
                      <FormGroup>
                        <span>
                          <FaFileExport /> Attachment: &nbsp;
                          <b style={{ color: "purple" }}>
                            <label id="fileLabel">{values.filename}</label>
                          </b>
                        </span>
                        <Box>
                          <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload files
                            <VisuallyHiddenInput
                              data-title={
                                TUTOPEDIA_CONTENT_CREATE_PAGE_FORM_FILE_INPUT
                              }
                              id="hiddenInput"
                              type="file"
                              onChange={(event) => {
                                let selectedFile: any =
                                  event.target.files?.item(0);
                                if (selectedFile) {
                                  file.current = selectedFile;
                                  values.filename =
                                    event.target.files?.item(0)?.name!;
                                  validateField("filename");
                                }
                              }}
                            />
                          </Button>
                          <ErrorMessage name="filename">
                            {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                          </ErrorMessage>
                        </Box>
                      </FormGroup>
                    </Box>

                    <Box
                      data-title={TUTOPEDIA_CONTENT_CREATE_PAGE_BUTTONS}
                      sx={{ textAlign: "center" }}
                      justifyContent="space-between"
                    >
                      <Button
                        data-title={
                          isUpdateMode
                            ? TUTOPEDIA_CONTENT_CREATE_PAGE_UPDATE_BUTTON
                            : TUTOPEDIA_CONTENT_CREATE_PAGE_CREATE_BUTTON
                        }
                        id="createBtn"
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isUpdateMode ? "UPDATE" : "CREATE"}
                      </Button>
                      <Button
                        data-title={TUTOPEDIA_CONTENT_CREATE_PAGE_CANCEL_BUTTON}
                        variant="contained"
                        onClick={() => {
                          navigateToHome(
                            TUTOPEDIA_CONTENT_CREATE_PAGE_CANCEL_BUTTON
                          );
                        }}
                      >
                        CANCEL
                      </Button>
                    </Box>
                  </Form>
                  {/* {debug && (
                    <Box
                      hidden
                      data-title="TUTORIALS_CREATE_PAGE_DEBUG"
                      overflow={"hidden"}
                      sx={{
                        width: "100%",
                        height: "300px",
                        maxHeight: "300px",
                      }}
                      marginTop={1}
                    >
                      <ShowFormikState
                        message="props"
                        props={{ values, errors }}
                      />
                    </Box>
                  )} */}
                </>
              )}
            </Formik>
          </Box>
        </ThemeProvider>
      );
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ marginTop: "20px" }}>
        {isUpdateMode ? "Update Tutorial" : "Create Tutorial"}
      </Typography>
      <header data-title={TUTOPEDIA_CONTENT_CREATE_PAGE}>
        {renderCreatePage()}
      </header>
    </>
  );
};

export default CreatePage;
