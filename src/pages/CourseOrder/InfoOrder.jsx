import React from "react";

const InfoOrder = () => {
  return (
    <div className="itemorder infoorder">
      <h3 className="title --t3">Thông tin đơn hàng</h3>
      <div className="boxorder">
        <div className="boxorder__col">
          <label className="label">Tên khoá học</label>
          <div className="boxorder__col-course">
            <div className="img">
              <img
                src="https://cfdcircle.vn/files/thumbnails/JUVoVxn36lQtCl20hHoEPMo8JJENBX5qXfI1U13k.jpg"
                alt
              />
            </div>
            <div className="info">
              <p className="name">
                <strong>Frontend Master</strong>
              </p>
              <p>Trần Nghĩa</p>
            </div>
          </div>
        </div>
        <div className="boxorder__col">
          <label className="label">Tạm tính</label>
          <p>14,700,000đ</p>
        </div>
        <div className="boxorder__col">
          <label className="label">Giảm giá</label>
          <p>0đ</p>
        </div>
        <div className="boxorder__col">
          <label className="label">thành tiền</label>
          <p>
            <strong>14,700,000đ</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoOrder;
