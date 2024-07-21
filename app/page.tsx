import Box from "@mui/material/Box";
import * as React from "react";
import { Container} from "@mui/material";
import SlideShow from "@/app/component/SlideShow";
import FeaturesWrapper from "@/app/component/FeaturesWrapper";

export default async function Home() {

  return (
      <>
          <Container>
              <Box sx={{
                  mt: 10,
                  height:{xs: 270, sm:370, md: 420, lg: 570}
              }}>
                  <SlideShow></SlideShow>
              </Box>
              <FeaturesWrapper/>
          </Container>
      </>
  );
}
