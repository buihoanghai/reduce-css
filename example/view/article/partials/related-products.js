import React from "react";

const relatedProducts = ({ data = {} }) => (
  <div className="mt3">
    <h2 className="f4 mt0 mb2">Sản Phẩm Liên Quan</h2>
    <div className="ph2 pt1 pb3 shadow-4 flex flex-wrap">
      <div className="w-100 w-50-m w-100-l flex flex-wrap mt3">
        <div className="mr-auto ml-auto ba b--light-pink">
          <amp-img width="250" height="250" src="/assets/img/image4.jpeg"></amp-img>
          <div className="pa3">
            <div className="dark-gray mt2 f5 b">Dau gac</div>
            <div className="mt1 f6">50.000</div>
            <div className="pv2 tc bg-hot-pink white br2 mt3">Thêm vào giỏ</div>
            <a className="pv2 tc bg-hot-pink white br2 mt3 db link" href={"/san-pham/dau-gac"}>Xem chi tiết</a>
          </div>
        </div>
      </div>
      <div className="w-100 w-50-m w-100-l flex flex-wrap mt3">
        <div className="mr-auto ml-auto ba b--light-pink">
          <amp-img width="250" height="250" src="/assets/img/image1.jpeg"></amp-img>
          <div className="pa3">
            <div className="dark-gray mt2 f5 b">Dau gac 200ml</div>
            <div className="mt1 f6">50.000</div>
            <div className="pv2 tc bg-hot-pink white br2 mt3">Thêm vào giỏ</div>
            <a className="pv2 tc bg-hot-pink white br2 mt3 db link" href={"/san-pham/dau-gac-200-ml"}>Xem chi tiết</a>
          </div>
        </div>
      </div>
      <div className="w-100 w-50-m w-100-l flex flex-wrap mt3">
        <div className="mr-auto ml-auto ba b--light-pink">
          <amp-img width="250" height="250" src="/assets/img/image2.jpeg"></amp-img>
          <div className="pa3">
            <div className="dark-gray mt2 f5 b">Dau gac 500ml</div>
            <div className="mt1 f6">50.000</div>
            <div className="pv2 tc bg-hot-pink white br2 mt3">Thêm vào giỏ</div>
            <a className="pv2 tc bg-hot-pink white br2 mt3 db link" href={"/san-pham/dau-gac-500-ml"}>Xem chi tiết</a>
          </div>
        </div>
      </div>
      <div className="w-100 w-50-m w-100-l flex flex-wrap mt3">
        <div className="mr-auto ml-auto ba b--light-pink">
          <amp-img width="250" height="250" src="/assets/img/image3.jpeg"></amp-img>
          <div className="pa3">
            <div className="dark-gray mt2 f5 b">Dau gac 1lit</div>
            <div className="mt1 f6">50.000</div>
            <div className="pv2 tc bg-hot-pink white br2 mt3">Thêm vào giỏ</div>
            <a className="pv2 tc bg-hot-pink white br2 mt3 db link" href={"/san-pham/dau-gac-1-lit"}>Xem chi tiết</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default relatedProducts