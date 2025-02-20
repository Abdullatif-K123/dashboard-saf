import { Box, Card, Fade, Grid, SxProps } from "@mui/material";
import { Stack } from "@mui/system";
import modelQueries from "API/model/queries";
import Error from "components/feedback/Error";
import NoData from "components/feedback/NoData";
import RepeatELement from "components/layout/RepeatElement";
import LabelValue from "components/typography/LabelValue";
import { LoadingProvider } from "context/loadingContext";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import InfiniteScroll from "lib/infiniteScroll";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Bus } from "./Bus";
import BusActions from "features/Model/View/BusActions";

const sx = {
  container: {
    py: 1,
    px: 2,
  },
} as const satisfies SxProps;
type Props = {};
const ModelsGrid: FC<Props> = ({}) => {
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();
  const { t } = useTranslation(undefined, { keyPrefix: "model" });
  const [showComponent, setShowComponent] = useState(false);
  const infiniteQuery = modelQueries.useInfiniteQuery({
    query,
    pageNumber,
  });
  useEffect(() => {
    setShowComponent(true);
  }, []);
  const isEmpty =
    infiniteQuery.isSuccess &&
    infiniteQuery.data?.pages[0].data.data.length === 0;
  return showComponent ? (
    <Fade in={true}>
      <Box>
        {infiniteQuery.isSuccess && (
          <InfiniteScroll query={infiniteQuery} minHeight={"fit-content"}>
            <Grid container spacing={1} sx={sx.container}>
              {infiniteQuery.data.pages.map((page) =>
                page.data.data.map((item) => (
                  <Grid item key={item.id} xs={12} sm={12} md={6} lg={4}>
                    <Card sx={{ p: 1, height: 320 }}>
                      <Stack direction="row" gap={1}>
                        <Stack gap={1} flex={1} sx={{ py: 2 }}>
                          <LabelValue label={t("name")}>{item.name}</LabelValue>
                          <LabelValue label={t("columns")}>
                            {item.columnCount}
                          </LabelValue>
                          <LabelValue label={t("chairCount")}>
                            {item.chairCount}
                          </LabelValue>
                          <LabelValue label={t("busCount")}>
                            {item.busCount}
                          </LabelValue>
                          <BusActions id={item.id} />
                        </Stack>
                        <Bus model={item} />
                      </Stack>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
            {isEmpty && <NoData py={1} maxWidth={1} width={400} mx="auto" />}
          </InfiniteScroll>
        )}
        {infiniteQuery.isInitialLoading && (
          <LoadingProvider value={true}>
            <RepeatELement
              repeat={3}
              container={<Grid container spacing={1} sx={sx.container} />}
            >
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Card sx={{ p: 1, height: 320 }}>
                  <Stack direction="row" gap={1}>
                    <Stack gap={1} flex={1} sx={{ py: 2 }}>
                      <LabelValue
                        skeletonProps={{ widthRange: { min: 40, max: 50 } }}
                        label={t("name")}
                      />
                      <LabelValue
                        skeletonProps={{ widthRange: { min: 25, max: 30 } }}
                        label={t("columns")}
                      />
                      <LabelValue
                        skeletonProps={{ widthRange: { min: 25, max: 30 } }}
                        label={t("chairCount")}
                      />
                      <LabelValue
                        skeletonProps={{ widthRange: { min: 25, max: 30 } }}
                        label={t("busCount")}
                      />
                    </Stack>
                    <Bus skeleton />
                  </Stack>
                </Card>
              </Grid>
            </RepeatELement>
          </LoadingProvider>
        )}
        {infiniteQuery.isError && (
          <Error error={infiniteQuery.error} retry={infiniteQuery.refetch} />
        )}
      </Box>
    </Fade>
  ) : (
    <></>
  );
};

export default ModelsGrid;
