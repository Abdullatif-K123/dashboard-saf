import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import homeQueries from "API/home/queries";
import SomethingWentWrong from "components/feedback/SomethingWentWrong";
import { LoadingProvider } from "context/loadingContext";
import { FC } from "react";
import Branches from "./Branches";
import Counts from "./Counts";
import Customers from "./Customers";
import Owners from "./Owners";
import { TourStats } from "./TourStats";
import Tours from "./Tours";
export type HomeProps = {};
export const Home: FC<HomeProps> = ({}) => {
  const query = homeQueries.useHome();
  return (
    <>
      {(query.isSuccess || query.isInitialLoading) && (
        <LoadingProvider value={query.isInitialLoading}>
          <Stack gap={3}>
            <Stack>
              <Counts data={query.data} />
            </Stack>
            <TourStats initialChart={query.data?.toursBranchChart ?? []} />
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                lg={6}
                display={"flex"}
                flexDirection={"column"}
              >
                <Tours
                  data={{
                    finished: query.data?.recentFinishedTours ?? [],
                    ongoing: query.data?.recentOngoingTours ?? [],
                    upcoming: query.data?.recentUpComingTours ?? [],
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                display={"flex"}
                flexDirection={"column"}
              >
                <Branches data={query.data?.recentBranches ?? []} />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                display={"flex"}
                flexDirection={"column"}
              >
                <Owners data={query.data?.recentOwners ?? []} />
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                display={"flex"}
                flexDirection={"column"}
              >
                <Customers data={query.data?.recentCustomers ?? []} />
              </Grid>
            </Grid>
          </Stack>
        </LoadingProvider>
      )}
      {query.isError && <SomethingWentWrong />}
    </>
  );
};
export default Home;
