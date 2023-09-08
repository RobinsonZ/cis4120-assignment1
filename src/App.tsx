/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Divider,
  Slider,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { PropsWithChildren, useState } from "react";
import NearMeIcon from "@mui/icons-material/NearMe";

// copied entirely from https://stackoverflow.com/a/44134328/13644774
// (tiny tweaks to make typechecker happy)
function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// copied entirely from https://stackoverflow.com/a/16469279/13644774
function colorForTemp(temp: number) {
  // convert to celsius because the example uses celsius
  temp = ((temp - 32) * 5) / 9;

  // Map the temperature to a 0-1 range
  let a = (temp + 30) / 60;
  a = a < 0 ? 0 : a > 1 ? 1 : a;

  // Scrunch the green/cyan range in the middle
  const sign = a < 0.5 ? -1 : 1;
  a = (sign * Math.pow(2 * Math.abs(a - 0.5), 0.35)) / 2 + 0.5;

  // Linear interpolation between the cold and hot
  const h0 = 259;
  const h1 = 12;
  const h = h0 * (1 - a) + h1 * a;

  return hslToHex(h, 75, 60);
}

function StyledTemp(props: PropsWithChildren<{ temp: number }>) {
  const { temp, children } = props;

  return (
    <b style={{ color: colorForTemp(temp) }}>{children || <>{temp}&deg;</>}</b>
  );
}

function Recommendation(props: { temp: number }) {
  const { temp } = props;

  if (temp <= 40) {
    return (
      <>
        a <br />
        <StyledTemp temp={temp}>heavy jacket</StyledTemp>
      </>
    );
  }
  if (temp <= 50) {
    return (
      <>
        a <br />
        <StyledTemp temp={temp}>jacket</StyledTemp>
      </>
    );
  }
  if (temp <= 60) {
    return (
      <>
        a <br />
        <StyledTemp temp={temp}>light jacket</StyledTemp>
      </>
    );
  }
  if (temp <= 70) {
    return (
      <>
        a <br />
        <StyledTemp temp={temp}>long-sleeve shirt</StyledTemp>
      </>
    );
  }
  if (temp <= 80) {
    return (
      <>
        a <br />
        <StyledTemp temp={temp}>short-sleeve shirt</StyledTemp>
      </>
    );
  }
  return (
    <>
      <StyledTemp temp={temp}>shorts</StyledTemp>
    </>
  );
}

function App() {
  const [lowTemp, setLowTemp] = useState(32);
  const [highTemp, setHighTemp] = useState(53);

  const theme = createTheme({
    typography: {
      h1: {
        fontFamily: ['"Playfair Display"', "serif"].join(","),
        fontSize: "3rem",
        lineHeight: 1.4,
        marginBottom: "0.75rem",
      },
      h2: {
        fontFamily: ['"Playfair Display"', "serif"].join(","),
        fontSize: "1.25rem",
      },
      body1: {
        fontSize: "1.25rem",
        marginBottom: "0.75rem",
        lineHeight: "normal",
      },
      body2: {
        fontSize: "0.875rem",
        fontFamily: ['"Roboto Mono"', "monospace"].join(","),
        lineHeight: 1.625,
        fontWeight: 400,
      },
    },
    palette: {
      primary: {
        main: colorForTemp(lowTemp),
      },
    },
  });
  const showLayers = lowTemp <= 70 && Math.abs(highTemp - lowTemp) > 20;

  const startTime = new Date(2023, 9, 8, 8, 0);
  const times = [startTime];
  for (let i = 1; i <= 5; i++) {
    const newDate = new Date(startTime);
    newDate.setHours(8 + i * 2);
    times.push(newDate);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs" fixed sx={{ py: 3.12, px: 2.25 }}>
        <Typography variant="h1" marginBottom="0.75rem">
          You need <Recommendation temp={lowTemp} />
          {showLayers && (
            <>
              ,<br /> and <b>layers</b>
            </>
          )}
          .
        </Typography>
        <Typography>
          It feels like <StyledTemp temp={lowTemp} /> right now,
          <br />
          increasing to <StyledTemp temp={highTemp} /> by 2 PM.
        </Typography>
        <Typography>
          No precipitation is expected.
          <br />
          Wind 10 mph out of the southeast.
        </Typography>
        <LineChart
          xAxis={[
            {
              data: times,
              scaleType: "time",
              min: startTime,
              tickMinStep: 3600 * 1000 * 2,
            },
          ]}
          series={[
            {
              data: [
                lowTemp,
                lowTemp + (highTemp - lowTemp) / 2,
                highTemp,
                lowTemp + (highTemp - lowTemp) / 2,
                lowTemp + 5,
                lowTemp + 4,
              ],
              color: theme.palette.primary.main,
            },
          ]}
          // width={338}
          height={160}
          margin={{
            top: 10,
            bottom: 25,
            left: 25,
            right: 25,
          }}
          sx={{ mb: "0.75rem" }}
        />
        <Card
          sx={{
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            // display: "inline-block",
            // width: 338,
            mb: "0.75rem",
          }}
          elevation={2}
        >
          <CardActionArea>
            <CardContent>
              <Typography variant="h2" component="div" gutterBottom>
                Portland, Oregon
                <NearMeIcon
                  fontSize="small"
                  sx={{ translate: "3px 3px", opacity: 0.8 }}
                />
              </Typography>
              <Typography variant="body2" gutterBottom>
                Sunset: 6:28 PM
                <br />
                Humidity: 45&#37;
                <br />
                UV Index: 2<br />
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.625rem" }}>
                TAP FOR MORE
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card>
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.25,
                mb: 1,
                fontFamily: "Roboto",
                marginBottom: 0,
              }}
            >
              Yesterday, we said you should wear a <b>heavy jacket</b>. Was this
              good advice?
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Yes</Button>
            <Button size="small">No</Button>
          </CardActions>
        </Card>
        <Divider sx={{ mt: 2, fontFamily: "Roboto" }}>
          Temperature control (for demo)
        </Divider>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={[lowTemp, highTemp]}
          onChange={(_event: Event, newValue: number | number[]) => {
            const [low, high] = newValue as number[];
            setLowTemp(low);
            setHighTemp(high);
          }}
          valueLabelDisplay="auto"
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
