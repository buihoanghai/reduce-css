import React from "react";
const popularArticle = ({ itemData = {} }) => (
  <div>
    <h2 className="f4 mt0 mb2">Bài Viết Nổi Bậc</h2>
    <div className="ph2 pt1 pb2 shadow-4 flex flex-wrap">
      <div className="w-100 w-50-m w-100-l flex flex-wrap mt1 items-center">
        <div className="w5r h5r">
          <amp-img width="1" height="1" layout="responsive" src="/assets/img/news/image1.jpeg"/>
        </div>
        <div className="pl2 w3 flex-grow-1">
          <h3 className="f7 dark-green mv0">Công dụng của dầu gấc đối với sức khỏe và sắc đẹp</h3>
          <div className="f8 gray mt1">31-12-2016 Bởi Anh Tư Cò Đất</div>
        </div>
      </div>
      <div className="w-100 w-50-m w-100-l flex flex-wrap mt1 items-center">
        <div className="w5r h5r">
          <amp-img width="1" height="1" layout="responsive" src="/assets/img/news/images2.jpeg"/>
        </div>
        <div className="pl2 w3 flex-grow-1">
          <h3 className="f7 dark-green mv0">Cách dể chống suy dinh dưỡng bằng dầu gấc</h3>
          <div className="f8 gray mt1">24-04-2017 Bởi Út Phú Yên</div>
        </div>
      </div>
      <div className="w-100 w-50-m w-100-l flex flex-wrap mt1 items-center">
        <div className="w5r h5r">
          <amp-img width="1" height="1" layout="responsive" src="/assets/img/news/image3.jpeg"/>
        </div>
        <div className="pl2 w3 flex-grow-1">
          <h3 className="f7 dark-green mv0">Trái gấc: Giúp bạn có làn da đẹp và đôi mắt sáng</h3>
          <div className="f8 gray mt1">15-02-2011 Bởi Anh Hai Ruộng</div>
        </div>
      </div>
      <div className="w-100 w-50-m w-100-l flex flex-wrap mt1 items-center">
        <div className="w5r h5r">
          <amp-img width="1" height="1" layout="responsive" src="/assets/img/news/image1.jpeg"></amp-img>
        </div>
        <div className="pl2 w3 flex-grow-1">
          <h3 className="f7 dark-green mv0">Công dụng của dầu gấc đối với sức khỏe và sắc đẹp</h3>
          <div className="f8 gray mt1">31-12-2016 Bởi Chị Ba Vườn Mía</div>
        </div>
      </div>

    </div>
  </div>
);
export default popularArticle
