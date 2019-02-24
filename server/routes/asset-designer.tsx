import * as React from "react";
import createInteractive from "./components/Interactive";
import createConnection from "./create-connection";
import AssetDesignerPage from "./pages/AssetDesignerPage";
import * as queries from "./queries";
import renderPage from "./render-page";

async function routeAssetDesigner(router, schema, projectRoot, scriptRoot) {
  const Interactive = createInteractive(projectRoot, scriptRoot);
  const connection = createConnection(schema);

  router.get("/asset-designer", async (req, res) => {
    const [err, connect] = await connection([queries.themeQuery], {
      conferenceSeriesId: "react-finland",
    });

    if (err) {
      return res.status(400).send();
    }

    const { theme } = connect(queries.themeQuery);

    res.status(200).send(
      renderPage(
        req.url,
        theme,
        <Interactive component="./AssetDesignerPage">
          <AssetDesignerPage theme={theme} />
        </Interactive>
      )
    );
  });
}

export default routeAssetDesigner;