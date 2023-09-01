import React, { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Error404Modern from "../pages/error/404-modern"

import Chat from "../pages/app/chat/ChatContainer";

import Login from "../pages/auth/Login";
import EscolhaConcierge from "../pages/auth/EscolhaConcierge";

const Router = () => {
  const location = useLocation();

  const telefone = localStorage.getItem("telefone");

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path=":hospital/login" element={<Login />}></Route>
      <Route path=":hospital/" element={<EscolhaConcierge />}></Route>

      {telefone? (
        <Route path=":hospital/chat" element={<Chat />}></Route>
      ): (
        ""
      )}

      <Route path="*" element={<Error404Modern />}></Route>

      {/* <Route path="app-messages" element={<AppMessages />}></Route> */}
      {/* <Route path="app-calender" element={<Calender />}></Route> */}
      {/* <Route path="app-inbox" element={<Inbox />}></Route> */}
      {/* <Route path="app-kanban" element={<Kanban />}></Route> */}
      {/* <Route path={`${process.env.PUBLIC_URL}`} element={<Layout />}>
        <Route index element={<Homepage />}></Route>
        <Route path="crypto" element={<Crypto />}></Route>
        <Route path="analytics" element={<Analytics />}></Route>
        <Route path="invest" element={<Invest />}></Route>
        <Route path="_blank" element={<Blank />}></Route>

        <Route path="project-card" element={<ProjectCardPage />}></Route>
        <Route path="project-list" element={<ProjectListPage />}></Route>

        <Route element={<UserContextProvider />}>
          <Route path="user-list-regular" element={<UserListRegular />}></Route>
          <Route path="user-list-compact" element={<UserListCompact />}></Route>
          <Route path="user-contact-card" element={<UserContactCard />}></Route>
          <Route path="user-details-regular/:userId" element={<UserDetails />}></Route>
        </Route>

        <Route>
          <Route path="user-profile-notification" element={<UserProfileNotification />}></Route>
          <Route path="user-profile-regular" element={<UserProfileRegular />}></Route>
          <Route path="user-profile-activity" element={<UserProfileActivity />}></Route>
          <Route path="user-profile-setting" element={<UserProfileSetting />}></Route>
        </Route>

        <Route path="kyc-list-regular" element={<KycListRegular />}></Route>
        <Route path="kyc-details-regular/:kycId" element={<KycDetailsRegular />}></Route>
        <Route path="transaction-basic" element={<TransListBasic />}></Route>
        <Route path="transaction-crypto" element={<TransListCrypto />}></Route>
        <Route element={<ProductContextProvider />}>
          <Route path="product-list" element={<ProductList />}></Route>
          <Route path="product-card" element={<ProductCard />}></Route>
          <Route path="product-details/:productId" element={<ProductDetails />}></Route>
        </Route>

        <Route path="invoice-list" element={<InvoiceList />}></Route>
        <Route path="invoice-details/:invoiceId" element={<InvoiceDetails />}></Route>
        <Route path="pricing-table" element={<PricingTable />}></Route>
        <Route path="image-gallery" element={<GalleryPreview />}></Route>

        <Route path="pages">
          <Route path="terms-policy" element={<Terms />}></Route>
          <Route path="faq" element={<Faq />}></Route>
          <Route path="regular-v1" element={<Regularv1 />}></Route>
          <Route path="regular-v2" element={<Regularv2 />}></Route>
        </Route>

        <Route path="app-file-manager">
          <Route index element={<FileManager />}></Route>
          <Route path="files" element={<FileManagerFiles />}></Route>
          <Route path="starred" element={<FileManagerStarred />}></Route>
          <Route path="shared" element={<FileManagerShared />}></Route>
          <Route path="recovery" element={<FileManagerRecovery />}></Route>
          <Route path="settings" element={<FileManagerSettings />}></Route>
        </Route>

        <Route path="components">
          <Route index element={<Component />}></Route>
          <Route path="accordions" element={<Accordian />}></Route>
          <Route path="alerts" element={<Alerts />}></Route>
          <Route path="avatar" element={<Avatar />}></Route>
          <Route path="badges" element={<Badges />}></Route>
          <Route path="breadcrumbs" element={<Breadcrumbs />}></Route>
          <Route path="button-group" element={<ButtonGroup />}></Route>
          <Route path="buttons" element={<Buttons />}></Route>
          <Route path="cards" element={<Cards />}></Route>
          <Route path="carousel" element={<Carousel />}></Route>
          <Route path="dropdowns" element={<Dropdowns />}></Route>
          <Route path="form-elements" element={<FormElements />}></Route>
          <Route path="form-layouts" element={<FormLayouts />}></Route>
          <Route path="checkbox-radio" element={<CheckboxRadio />}></Route>
          <Route path="advanced-control" element={<AdvancedControls />}></Route>
          <Route path="input-group" element={<InputGroup />}></Route>
          <Route path="form-upload" element={<FormUpload />}></Route>
          <Route path="number-spinner" element={<NumberSpinner />}></Route>
          <Route path="form-validation" element={<FormValidation />}></Route>
          <Route path="datetime-picker" element={<DateTimePicker />}></Route>
          <Route path="modals" element={<Modals />}></Route>
          <Route path="pagination" element={<Pagination />}></Route>
          <Route path="popovers" element={<Popovers />}></Route>
          <Route path="progress" element={<Progress />}></Route>
          <Route path="spinner" element={<Spinner />}></Route>
          <Route path="tabs" element={<Tabs />}></Route>
          <Route path="toast" element={<Toast />}></Route>
          <Route path="tooltips" element={<Tooltips />}></Route>
          <Route path="typography" element={<Typography />}></Route>
          <Route path="noUislider" element={<NouiSlider />}></Route>
          <Route path="wizard-basic" element={<WizardForm />}></Route>
          <Route path="quill" element={<QuillPreview />}></Route>
          <Route path="tinymce" element={<TinymcePreview />}></Route>
          <Route path="util-border" element={<UtilBorder />}></Route>
          <Route path="util-colors" element={<UtilColors />}></Route>
          <Route path="util-display" element={<UtilDisplay />}></Route>
          <Route path="util-embeded" element={<UtilEmbeded />}></Route>
          <Route path="util-flex" element={<UtilFlex />}></Route>
          <Route path="util-others" element={<UtilOthers />}></Route>
          <Route path="util-sizing" element={<UtilSizing />}></Route>
          <Route path="util-spacing" element={<UtilSpacing />}></Route>
          <Route path="util-text" element={<UtilText />}></Route>

          <Route path="widgets">
            <Route path="cards" element={<CardWidgets />}></Route>
            <Route path="charts" element={<ChartWidgets />}></Route>
            <Route path="rating" element={<RatingWidgets />}></Route>
          </Route>

          <Route path="misc">
            <Route path="slick-slider" element={<SlickPage />}></Route>
            <Route path="sweet-alert" element={<SweetAlertPage />}></Route>
            <Route path="beautiful-dnd" element={<BeautifulDnd />}></Route>
            <Route path="dual-list" element={<DualListPage />}></Route>
            <Route path="map" element={<GoogleMapPage />}></Route>
            <Route path="toastify" element={<ReactToastify />}></Route>
            <Route path="jsTree" element={<JsTreePreview />}></Route>
          </Route>
        </Route>
        <Route path="charts">
          <Route path="chartjs" element={<ChartPage />}></Route>
          <Route path="knobs" element={<KnobPreview />}></Route>
        </Route>

        <Route path="table-basic" element={<BasicTable />}></Route>
        <Route path="table-datatable" element={<DataTablePage />}></Route>
        <Route path="table-special" element={<SpecialTablePage />}></Route>
        <Route path="email-template" element={<EmailTemplate />}></Route>
        <Route path="nioicon" element={<NioIconPage />}></Route>
        <Route path="svg-icons" element={<SVGIconPage />}></Route>
      </Route>
      <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar />}>
        <Route path="auth-success" element={<Success />}></Route>
        <Route path="auth-reset" element={<ForgotPassword />}></Route>
        <Route path="auth-register" element={<Register />}></Route>
         <Route path="login" element={<Login />}></Route> 

        <Route path="errors">
          <Route path="404-modern" element={<Error404Modern />}></Route>
          <Route path="404-classic" element={<Error404Classic />}></Route>
          <Route path="504-modern" element={<Error504Modern />}></Route>
          <Route path="504-classic" element={<Error504Classic />}></Route>
        </Route>
        <Route path="*" element={<Error404Modern />}></Route>

        <Route path="invoice-print/:invoiceId" element={<InvoicePrint />}></Route>
      </Route> */}
    </Routes>
  );
};
export default Router;
