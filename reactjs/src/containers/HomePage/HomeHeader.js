import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
    return (
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <i className="fas fa-bars"></i>
            <div className="header-logo"></div>
          </div>
          <div className="center-content">
            <div className="child-content">
              <div>
                <b>Chuyên khoa</b>
              </div>
              <div className="sub-tittle">Tìm bác sĩ theo chuyên khoa</div>
            </div>

            <div className="child-content">
              <div>
                <b>Cơ sở y tế</b>
              </div>
              <div className="sub-tittle">Chọn bệnh viện phòng khám</div>
            </div>

            <div className="child-content">
              <div>
                <b>Bác sĩ</b>
              </div>
              <div className="sub-tittle">Chọn bác sĩ giỏi</div>
            </div>

            <div className="child-content">
              <div>
                <b>Gói khám</b>
              </div>
              <div className="sub-tittle">Khám sức khỏe tổng quát</div>
            </div>
          </div>

          <div className="right-content">
            <div className="support">
              <i className="fas fa-question-circle"></i>
              Hỗ trợ
            </div>
            <div className="flag">VN</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
