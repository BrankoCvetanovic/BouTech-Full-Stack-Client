import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { Stack, CircularProgress } from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import AddressForm from "./AddressForm";
import Info from "./Info";
import InfoMobile from "./InfoMobile";
import PaymentForm from "./PaymentForm";
import { useContext, useState, useRef } from "react";
import { CartContext } from "../components/CartContext";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
const steps = ["Shipping address", "Payment details"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [isOrderError, setIsOrderError] = useState(false);
  const [orderErrorMsg, setOrderErrorMsg] = useState("");
  const [isPending, setIsPending] = useState(false);

  const cartContext = useContext(CartContext);

  const totalPrice = cartContext?.userItems.reduce(
    (acumulator, current) => acumulator + current.price * current.amount,
    0
  );
  const total = Math.round(totalPrice! * 100) / 100;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const infoData = useRef({ data: {} });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cartContext?.userItems.length === 0) {
      return;
    }
    const fd = new FormData(event.currentTarget);
    const data = Object.fromEntries(fd.entries());
    if (fd.has("name")) {
      infoData.current.data = data;
      handleNext();
    } else {
      setIsPending(true);
      const finallData = {
        ...data,
        ...infoData.current.data,
        data: cartContext?.userItems,
      };
      try {
        const response = await axios.post(
          "https://boutech-server-cfe11ab86bbd.herokuapp.com/order",
          finallData
        );
        if (response.status !== 201) {
          setIsOrderError(true);
          setOrderErrorMsg(response.data.message);
        }
      } catch (err) {
        const error = err as Error | AxiosError;
        setIsOrderError(true);
        setOrderErrorMsg(error.message);
      }
      setIsPending(false);
      cartContext?.resetCart();
      handleNext();
    }
  };
  return (
    <Box>
      <CssBaseline />
      <Grid
        container
        sx={{
          height: { xs: "100%", sm: "100dvh" },
        }}
      >
        <Grid
          item
          xs={12}
          sm={5}
          lg={4}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 4,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              height: 150,
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info totalPrice={total.toString()} />
          </Box>
        </Grid>
        <Grid
          item
          component="form"
          onSubmit={handleSubmit}
          sm={12}
          md={7}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Link to={"/"}>
                <Button
                  startIcon={<ArrowBackRoundedIcon />}
                  sx={{ alignSelf: "start" }}
                >
                  Back
                </Button>
              </Link>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexGrow: 1,
                height: 150,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{
                  width: "100%",
                  height: 40,
                }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-child": { pl: 0 },
                      ":last-child": { pr: 0 },
                    }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                ":last-child": { pb: 2 },
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">{total.toString()}</Typography>
              </div>
              <InfoMobile totalPrice={total.toString()} />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: "flex", md: "none" } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ":first-child": { pl: 0 },
                    ":last-child": { pr: 0 },
                    "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{
                      ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">
                  {isOrderError
                    ? "There was a error"
                    : "Thank you for your order!"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {isOrderError
                    ? orderErrorMsg
                    : "Your order number is #140396."}
                </Typography>
                <Link to="/">
                  <Button
                    variant="contained"
                    sx={{
                      alignSelf: "start",
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Home
                  </Button>
                </Link>
              </Stack>
            ) : (
              <>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    justifyContent:
                      activeStep !== 0 ? "space-between" : "flex-end",
                    alignItems: "end",
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                    mb: "60px",
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{
                        display: { xs: "none", sm: "flex" },
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{
                        display: { xs: "flex", sm: "none" },
                      }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep === 1 ? (
                    <Button
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                      type="submit"
                      sx={{
                        width: { xs: "100%", sm: "fit-content" },
                      }}
                    >
                      {isPending ? (
                        <CircularProgress color="inherit" />
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      type="submit"
                      endIcon={<ChevronRightRoundedIcon />}
                      sx={{
                        width: { xs: "100%", sm: "fit-content" },
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
