/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  ThemeProvider,
  Typography,
  createTheme,
  useTheme,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { PropsWithChildren } from "react";
import NearMeIcon from '@mui/icons-material/NearMe';

function StyledTemp(props: PropsWithChildren<{ temp: number }>) {
  const { temp, children } = props;

  const theme = useTheme();
  // TODO calculate color based on temp
  return (
    <b style={{ color: theme.palette.primary.main }}>
      {children || <>{temp}&deg;</>}
    </b>
  );
}

function App() {
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
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs" fixed sx={{ py: 3.12, px: 2.25 }}>
        <Typography variant="h1" marginBottom="0.75rem">
          You need a <StyledTemp temp={32}>heavy jacket</StyledTemp>, and{" "}
          <b>layers</b>.
        </Typography>
        <Typography>
          It feels like <StyledTemp temp={32} /> right now,
          <br />
          increasing to <StyledTemp temp={51} /> by 2 PM.
        </Typography>
        <Typography>
          No precipitation is expected.
          <br />
          Wind 10 mph out of the southeast.
        </Typography>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={338}
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
              Portland, Oregon<NearMeIcon fontSize="small" sx={{translate: "3px 3px", opacity: 0.8}}/>
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
          <CardContent sx={{paddingBottom: 0}}>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.25, mb: 1, fontFamily: "Roboto", marginBottom: 0}}
            >
              Yesterday, we said you should wear a <b>heavy jacket</b>. Was this
              good advice?
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Yes</Button>
            <Button size="small">
              No
            </Button>
          </CardActions>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;
