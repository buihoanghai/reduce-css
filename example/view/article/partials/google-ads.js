import React from "react";

const googleAds = ({ data = {} }) => (
  <div className="mt3 pv2">
    <div className="mr-auto ml-auto w-min-content">
      <amp-ad type="a9" width="300" height="250"
              data-aax_size="300x250"
              data-aax_pubname="test123"
              data-aax_src="302">
      </amp-ad>
      <amp-ad width="300" height="250"
              type="a8"
              data-aid="170223075073"
              data-wid="001"
              data-eno="01"
              data-mid="s00000016751001031000"
              data-mat="2TCGYR-17GNXU-3L92-64Z8X"
              data-type="static">
      </amp-ad>
      <amp-ad type="a9" width="300" height="250"
              data-aax_size="300x250"
              data-aax_pubname="test123"
              data-aax_src="302">
      </amp-ad>
    </div>
  </div>
);

export default googleAds