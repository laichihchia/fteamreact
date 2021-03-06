import React, { useState } from 'react';
import './CreditForm.scss';
const CreditForm = (props) => {
  const { creditForm, setCreditForm } = props;
  // credit form obj useState setting
  const creditFormHandler = (e) => {
    setCreditForm({ ...creditForm, [e.target.name]: e.target.value });
  };
  const keyPressHandler = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  // 卡片翻轉設定
  const [rotateDeg, setRotateDeg] = useState(0);
  const rotateToZero = () => {
    setRotateDeg(0);
  };
  const rotateToBack = () => {
    setRotateDeg(180);
  };
  return (
    <div className="w-100 h-100 d-flex flex-column">
      <div className=" w-100 h-10 d-flex step-page-title-wrap justify-content-center align-items-center">
        <span className="d-block">Card Details</span>
      </div>
      <div className=" w-100 h-90 d-flex flex-column justify-content-around">
        <div className=" w-100 h-20">
          <div className=" w-100 h-35 d-flex justify-content-start align-items-center text-gray">
            <span>Select Card Type</span>
          </div>
          <div className=" w-100 h-65 d-flex justify-content-between">
            <div className="w-33 d-flex justify-content-center align-items-center">
              <svg
                className=" w-50 h-50"
                xmlns="http://www.w3.org/2000/svg"
                height="812"
                viewBox="0.5 0.5 999 323.684"
                width="2500"
              >
                <path
                  d="M651.185.5c-70.933 0-134.322 36.766-134.322 104.694 0 77.9 112.423 83.28 112.423 122.415 0 16.478-18.884 31.229-51.137 31.229-45.773 0-79.984-20.611-79.984-20.611l-14.638 68.547s39.41 17.41 91.734 17.41c77.552 0 138.576-38.572 138.576-107.66 0-82.316-112.89-87.537-112.89-123.86 0-12.91 15.501-27.053 47.662-27.053 36.286 0 65.892 14.99 65.892 14.99l14.326-66.204S696.614.5 651.185.5zM2.218 5.497L.5 15.49s29.842 5.461 56.719 16.356c34.606 12.492 37.072 19.765 42.9 42.353l63.51 244.832h85.138L379.927 5.497h-84.942L210.707 218.67l-34.39-180.696c-3.154-20.68-19.13-32.477-38.685-32.477H2.218zm411.865 0L347.449 319.03h80.999l66.4-313.534h-80.765zm451.759 0c-19.532 0-29.88 10.457-37.474 28.73L709.699 319.03h84.942l16.434-47.468h103.483l9.994 47.468H999.5L934.115 5.497h-68.273zm11.047 84.707l25.178 117.653h-67.454z"
                  fill="rgb(207, 207, 207)"
                />
              </svg>
            </div>
            <div className="w-33 d-flex justify-content-center align-items-center">
              <svg
                className=" w-50 h-50"
                fill="rgb(207, 207, 207)"
                width="32px"
                height="32px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.972 15.35v-1.794c2.289 0 2.139 0.011 2.139 0.011 0.406 0.072 0.739 0.406 0.739 0.889 0 0.489-0.333 0.806-0.739 0.878-0.067 0.022-0.183 0.017-2.139 0.017zM26.35 16.472c-0.156-0.039-0.183-0.028-2.378-0.028v1.944c2.2 0 2.222 0.011 2.378-0.028 0.417-0.083 0.75-0.444 0.75-0.944 0-0.483-0.333-0.861-0.75-0.944zM32 6.222v19.556c0 1.472-1.194 2.667-2.667 2.667h-26.667c-1.472 0-2.667-1.194-2.667-2.667v-19.556c0-1.472 1.194-2.667 2.667-2.667h26.667c1.472 0 2.667 1.194 2.667 2.667zM10.111 12.461h-3.167c0 3.728 0.594 6.094-1.989 6.094-1.083 0-2.156-0.317-3.178-0.822v1.556c1.667 0.461 3.778 0.461 3.778 0.461 5.439 0 4.556-2.65 4.556-7.289zM20.028 12.711c-3.522-0.889-9.167-0.828-9.167 3.295 0 4.283 6.011 4.089 9.167 3.289v-1.572c-2.645 1.372-5.972 1.222-5.972-1.722s3.322-3.089 5.972-1.733zM30.222 17.694c0-1.028-0.917-1.694-2.111-1.778v-0.044c1.083-0.15 1.683-0.861 1.683-1.678 0-1.056-0.872-1.667-2.056-1.722 0 0 0.35-0.017-6.683-0.017v7.083h6.817c1.35 0.006 2.35-0.717 2.35-1.844z" />
              </svg>
            </div>
            <div className="w-33 d-flex justify-content-center align-items-center">
              <svg
                className=" w-50 h-50"
                fill="rgb(207,207,207)"
                width="24px"
                height="24px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M26.828 24.572c0 0.378-0.255 0.65-0.622 0.65-0.378 0-0.622-0.289-0.622-0.65s0.244-0.65 0.622-0.65c0.367 0 0.622 0.289 0.622 0.65zM9.561 23.922c-0.395 0-0.622 0.289-0.622 0.65s0.228 0.65 0.622 0.65c0.361 0 0.605-0.272 0.605-0.65-0.006-0.361-0.244-0.65-0.605-0.65zM16.089 23.906c-0.3 0-0.484 0.194-0.528 0.483h1.061c-0.050-0.317-0.244-0.483-0.533-0.483zM22.078 23.922c-0.378 0-0.605 0.289-0.605 0.65s0.228 0.65 0.605 0.65c0.378 0 0.622-0.272 0.622-0.65 0-0.361-0.245-0.65-0.622-0.65zM27.961 25.372c0 0.017 0.017 0.028 0.017 0.061 0 0.017-0.017 0.028-0.017 0.061-0.017 0.017-0.017 0.028-0.028 0.044-0.017 0.017-0.028 0.028-0.061 0.028-0.017 0.017-0.028 0.017-0.061 0.017-0.017 0-0.028 0-0.061-0.017-0.017 0-0.028-0.017-0.044-0.028-0.017-0.017-0.028-0.028-0.028-0.044-0.017-0.028-0.017-0.044-0.017-0.061 0-0.028 0-0.044 0.017-0.061 0-0.028 0.017-0.044 0.028-0.061 0.017-0.017 0.028-0.017 0.044-0.028 0.028-0.017 0.044-0.017 0.061-0.017 0.028 0 0.044 0 0.061 0.017 0.028 0.016 0.044 0.016 0.061 0.028s0.011 0.033 0.028 0.061zM27.839 25.45c0.028 0 0.028-0.017 0.044-0.017 0.017-0.017 0.017-0.028 0.017-0.044s0-0.028-0.017-0.044c-0.016 0-0.028-0.017-0.061-0.017h-0.089v0.194h0.044v-0.078h0.017l0.061 0.078h0.044zM32 6.278v19.556c0 1.472-1.194 2.667-2.667 2.667h-26.667c-1.472 0-2.667-1.194-2.667-2.667v-19.556c0-1.472 1.194-2.667 2.667-2.667h26.667c1.472 0 2.667 1.194 2.667 2.667zM3.556 14.033c0 4.25 3.45 7.694 7.694 7.694 1.511 0 2.994-0.456 4.25-1.283-4.050-3.294-4.022-9.511 0-12.806-1.256-0.833-2.739-1.283-4.25-1.283-4.244-0.005-7.694 3.444-7.694 7.678zM16 20.078c3.917-3.056 3.9-9.011 0-12.083-3.9 3.072-3.917 9.033 0 12.083zM8.094 24.317c0-0.483-0.317-0.8-0.817-0.817-0.256 0-0.528 0.078-0.711 0.361-0.133-0.228-0.361-0.361-0.678-0.361-0.211 0-0.422 0.078-0.589 0.3v-0.244h-0.455v2.039h0.455c0-1.050-0.139-1.678 0.5-1.678 0.567 0 0.456 0.567 0.456 1.678h0.439c0-1.017-0.139-1.678 0.5-1.678 0.567 0 0.455 0.556 0.455 1.678h0.456v-1.278zM10.589 23.556h-0.439v0.244c-0.15-0.183-0.361-0.3-0.65-0.3-0.572 0-1.011 0.456-1.011 1.072 0 0.622 0.439 1.072 1.011 1.072 0.289 0 0.5-0.106 0.65-0.3v0.256h0.439zM12.839 24.978c0-0.833-1.272-0.456-1.272-0.845 0-0.317 0.661-0.266 1.028-0.061l0.183-0.361c-0.522-0.339-1.678-0.333-1.678 0.456 0 0.794 1.272 0.461 1.272 0.833 0 0.35-0.75 0.322-1.15 0.044l-0.194 0.35c0.622 0.422 1.811 0.333 1.811-0.417zM14.806 25.494l-0.122-0.378c-0.211 0.116-0.678 0.244-0.678-0.228v-0.922h0.728v-0.411h-0.728v-0.622h-0.456v0.622h-0.422v0.406h0.422v0.928c0 0.978 0.961 0.8 1.256 0.605zM15.544 24.75h1.528c0-0.9-0.411-1.256-0.967-1.256-0.589 0-1.011 0.439-1.011 1.072 0 1.139 1.256 1.328 1.878 0.789l-0.211-0.333c-0.433 0.356-1.089 0.322-1.217-0.272zM18.828 23.556c-0.255-0.111-0.644-0.1-0.844 0.244v-0.244h-0.456v2.039h0.456v-1.15c0-0.645 0.528-0.561 0.711-0.467zM19.417 24.572c0-0.634 0.645-0.839 1.15-0.467l0.211-0.361c-0.645-0.505-1.817-0.228-1.817 0.833 0 1.1 1.244 1.322 1.817 0.833l-0.211-0.361c-0.511 0.361-1.15 0.145-1.15-0.478zM23.122 23.556h-0.456v0.244c-0.461-0.611-1.661-0.266-1.661 0.772 0 1.067 1.244 1.372 1.661 0.772v0.256h0.456zM24.994 23.556c-0.133-0.067-0.611-0.161-0.844 0.244v-0.244h-0.439v2.039h0.439v-1.15c0-0.611 0.5-0.572 0.711-0.467zM27.233 22.728h-0.439v1.072c-0.456-0.605-1.661-0.283-1.661 0.772 0 1.078 1.25 1.366 1.661 0.772v0.256h0.439zM27.656 18.556v0.256h0.044v-0.256h0.105v-0.044h-0.256v0.044zM28.022 25.433c0-0.028 0-0.061-0.016-0.089-0.017-0.017-0.028-0.044-0.044-0.061s-0.044-0.028-0.061-0.044c-0.028 0-0.061-0.017-0.089-0.017-0.017 0-0.044 0.017-0.078 0.017-0.028 0.017-0.044 0.028-0.061 0.044-0.028 0.016-0.044 0.044-0.044 0.061-0.017 0.028-0.017 0.061-0.017 0.089 0 0.017 0 0.044 0.017 0.078 0 0.017 0.017 0.044 0.044 0.061 0.016 0.017 0.028 0.028 0.061 0.044 0.028 0.016 0.061 0.016 0.078 0.016 0.028 0 0.061 0 0.089-0.016 0.017-0.017 0.044-0.028 0.061-0.044s0.028-0.044 0.044-0.061c0.016-0.033 0.016-0.061 0.016-0.078zM28.2 18.506h-0.078l-0.089 0.194-0.089-0.194h-0.078v0.3h0.044v-0.228l0.089 0.194h0.061l0.078-0.194v0.228h0.061zM28.444 14.033c0-4.234-3.45-7.683-7.694-7.683-1.511 0-2.994 0.455-4.25 1.283 4.006 3.295 4.067 9.528 0 12.806 1.256 0.833 2.75 1.283 4.25 1.283 4.244 0.006 7.694-3.439 7.694-7.689z" />
              </svg>
            </div>
          </div>
        </div>
        {/* 信用卡表單 */}
        <div className=" w-100 h-30 d-flex flex-column justify-content-between">
          <div className="w-100 h-40">
            <div className=" w-100 h-35 text-gray d-flex justify-content-between align-items-center">
              <span>Select Card Type</span>
            </div>
            {/* 卡號 */}
            <div className="w-100 h-65 text-gray d-flex justify-content-between align-items-end">
              {/* 1~4 */}
              <input
                onKeyPress={keyPressHandler}
                onChange={creditFormHandler}
                name="num1to4"
                onFocus={rotateToZero}
                defaultValue={creditForm.num1to4}
                type="text"
                className="checkout-input credit-invalid border-bottom w-20 focus-none text-gray bg-transparent"
                maxLength={4}
                autocomplete="off"
              />
              {/* 5~8 */}
              <input
                onKeyPress={keyPressHandler}
                onChange={creditFormHandler}
                name="num5to8"
                onFocus={rotateToZero}
                defaultValue={creditForm.num5to8}
                type="text"
                className="checkout-input border-bottom w-20 focus-none text-gray bg-transparent"
                maxLength={4}
                autocomplete="off"
              />
              {/* 9~12 */}
              <input
                onKeyPress={keyPressHandler}
                onChange={creditFormHandler}
                name="num9to12"
                onFocus={rotateToZero}
                defaultValue={creditForm.num9to12}
                type="text"
                className="checkout-input border-bottom w-20 focus-none text-gray bg-transparent"
                maxLength={4}
                autocomplete="off"
              />
              {/* 13~16 */}
              <input
                onKeyPress={keyPressHandler}
                onChange={creditFormHandler}
                name="num13to16"
                onFocus={rotateToZero}
                defaultValue={creditForm.num13to16}
                type="text"
                className="checkout-input border-bottom w-20 focus-none text-gray bg-transparent"
                maxLength={4}
                autocomplete="off"
              />
            </div>
          </div>
          {/* 到期日 驗證碼 */}
          <div className="w-100 h-40 d-flex justify-content-between">
            <div className="w-35 h-100">
              <div className="w-100 h-35 text-gray">
                <span>Expiry Date</span>
              </div>
              <div className="w-100 h-65 d-flex justify-content-between align-items-end text-gray">
                {/* 到期日 XX月*/}
                <input
                  onKeyPress={keyPressHandler}
                  onChange={creditFormHandler}
                  name="validMonth"
                  onFocus={rotateToZero}
                  defaultValue={creditForm.validMonth}
                  className="checkout-input w-40 border-bottom  focus-none text-gray bg-transparent"
                  type="text"
                  maxLength={2}
                  placeholder={'MM'}
                  autocomplete="off"
                />
                /{/* YY年 */}
                <input
                  onKeyPress={keyPressHandler}
                  onChange={creditFormHandler}
                  name="validYear"
                  onFocus={rotateToZero}
                  defaultValue={creditForm.validYear}
                  className="checkout-input w-40 border-bottom  focus-none text-gray bg-transparent"
                  type="text"
                  maxLength={2}
                  placeholder={'YY'}
                  autocomplete="off"
                />
              </div>
            </div>
            <div className="w-20 h-100">
              <div className="w-100 h-35 text-gray">
                <span>CVV</span>
              </div>
              <div className="w-100 h-65 d-flex justify-content-start align-items-end text-gray">
                {/* 驗證碼 */}
                <input
                  onKeyPress={keyPressHandler}
                  onChange={creditFormHandler}
                  name="CVV"
                  onFocus={rotateToBack}
                  defaultValue={creditForm.CVV}
                  className="checkout-input w-100 border-bottom  focus-none text-gray bg-transparent"
                  type="text"
                  maxLength={3}
                  autocomplete="off"
                />
              </div>
            </div>
          </div>
        </div>
        {/* 信用卡翻轉 */}
        <div className="credit-wrap-rwd h-30">
          <div className="flip-card">
            <div
              style={{ transform: `rotateY(${rotateDeg}deg)` }}
              className="flip-card-inner"
            >
              <div className="w-100 flip-card-front">
                <div className="card-info-number-wrap">
                  <div className="w-90 d-flex justify-content-between">
                    <input
                      className="w-15 bg-transparent border-0 credit-card-text"
                      type="text"
                      defaultValue={creditForm.num1to4}
                    />
                    <input
                      className="w-15 bg-transparent border-0 credit-card-text"
                      type="text"
                      defaultValue={creditForm.num5to8}
                    />
                    <input
                      className="w-15 bg-transparent border-0 credit-card-text"
                      type="text"
                      defaultValue={creditForm.num9to12}
                    />
                    <input
                      className="w-15 bg-transparent border-0 credit-card-text"
                      type="text"
                      defaultValue={creditForm.num13to16}
                    />
                    <div className="w-30 d-flex justify-content-end text-gray">
                      <input
                        className="text-center w-40 bg-transparent border-0 credit-card-text"
                        type="text"
                        defaultValue={creditForm.validMonth}
                      />

                      {creditForm.validMonth !== '' ||
                        creditForm.validYear !== ''
                        ? '/'
                        : ''}
                      <input
                        className="text-center w-40 bg-transparent border-0 credit-card-text"
                        type="text"
                        defaultValue={creditForm.validYear}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-100 flip-card-back">
                <div className="w-90 cvv-text text-end text-gray">
                  <input
                    className="text-end w-40 bg-transparent border-0 credit-card-text"
                    type="text"
                    defaultValue={creditForm.CVV}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditForm;
